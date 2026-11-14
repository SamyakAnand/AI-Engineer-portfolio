const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function capture(url, outputPath, viewport = { width: 1440, height: 900 }) {
  console.log(`Capturing ${url} -> ${outputPath}...`);
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9225;

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', async () => {
        try {
          const targets = JSON.parse(data);
          const pageTarget = targets.find(t => t.type === 'page');
          const WebSocket = require(require.resolve('next/dist/compiled/ws'));
          const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

          let id = 1;
          const send = (method, params = {}) => ws.send(JSON.stringify({ id: id++, method, params }));

          ws.on('open', () => {
            send('Emulation.setDeviceMetricsOverride', {
              width: viewport.width,
              height: viewport.height,
              deviceScaleFactor: 1,
              mobile: false
            });
            send('Page.enable');
            send('Page.navigate', { url });
          });

          ws.on('message', (msg) => {
            const parsed = JSON.parse(msg);
            if (parsed.method === 'Page.loadEventFired') {
              setTimeout(() => {
                send('Page.captureScreenshot', { format: 'png' });
              }, 2500);
            }

            if (parsed.result && parsed.result.data) {
              const buffer = Buffer.from(parsed.result.data, 'base64');
              fs.writeFileSync(outputPath, buffer);
              console.log(`Saved screenshot (${buffer.length} bytes) to ${outputPath}`);
              ws.close();
              chromeProc.kill();
              resolve();
            }
          });
        } catch (e) {
          chromeProc.kill();
          reject(e);
        }
      });
    }).on('error', (e) => {
      chromeProc.kill();
      reject(e);
    });
  });
}

async function run() {
  const targetDir = path.join(__dirname, '..', 'public', 'images', 'projects');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  try {
    await capture('http://localhost:3000', path.join(targetDir, 'samyak-portfolio.png'));
  } catch (e) {
    console.error('Error capturing localhost:', e);
  }

  try {
    await capture('https://dikshaanand.vercel.app', path.join(targetDir, 'diksha-portfolio.png'));
  } catch (e) {
    console.error('Error capturing diksha portfolio:', e);
  }
}

run();
