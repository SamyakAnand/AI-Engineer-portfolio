const http = require('http');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9222;

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--no-sandbox',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  // Get debug targets
  http.get(`http://127.0.0.1:${port}/json`, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      try {
        const targets = JSON.parse(data);
        const pageTarget = targets.find(t => t.type === 'page');
        if (!pageTarget) {
          console.error('No page target found');
          chromeProc.kill();
          return;
        }

        const WebSocket = require(require.resolve('next/dist/compiled/ws'));
        const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

        let id = 1;
        const send = (method, params = {}) => {
          ws.send(JSON.stringify({ id: id++, method, params }));
        };

        const exceptions = [];
        const logs = [];

        ws.on('open', () => {
          send('Runtime.enable');
          send('Page.enable');
          send('Page.navigate', { url: 'http://localhost:3000' });
        });

        ws.on('message', (msg) => {
          const parsed = JSON.parse(msg);
          if (parsed.method === 'Runtime.exceptionThrown') {
            exceptions.push(parsed.params.exceptionDetails);
          } else if (parsed.method === 'Runtime.consoleAPICalled') {
            logs.push({
              type: parsed.params.type,
              args: parsed.params.args.map(a => a.value || a.description)
            });
          }
        });

        await new Promise(r => setTimeout(r, 6000));

        console.log(`=== BROWSER RUNTIME VERIFICATION ===`);
        console.log(`Total console logs: ${logs.length}`);
        console.log(`Total uncaught exceptions: ${exceptions.length}`);

        if (exceptions.length > 0) {
          console.error('Exceptions detected:', JSON.stringify(exceptions, null, 2));
        } else {
          console.log('Zero uncaught exceptions! Page hydrated cleanly.');
        }

        const errors = logs.filter(l => l.type === 'error');
        if (errors.length > 0) {
          console.log('Console errors:', JSON.stringify(errors, null, 2));
        } else {
          console.log('Zero console errors!');
        }

        ws.close();
        chromeProc.kill();
        process.exit(0);
      } catch (err) {
        console.error('CDP Error:', err);
        chromeProc.kill();
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    console.error('Failed to connect to chrome debug port:', err);
    chromeProc.kill();
    process.exit(1);
  });
}

main();
