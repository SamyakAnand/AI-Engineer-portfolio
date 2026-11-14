const http = require('http');

http.get('http://localhost:3000', (res) => {
  console.log('Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTML length:', data.length);
    const regex = /<script[^>]*src="([^"]+)"/g;
    let match;
    const scripts = [];
    while ((match = regex.exec(data)) !== null) {
      scripts.push(match[1]);
    }
    console.log('Found scripts:', scripts.length);
    // Test each script URL
    let count = 0;
    scripts.forEach(src => {
      const url = 'http://localhost:3000' + src;
      http.get(url, (sres) => {
        count++;
        if (sres.statusCode !== 200) {
          console.error(`FAILED: ${src} -> Status ${sres.statusCode}`);
        }
        if (count === scripts.length) {
          console.log('Finished checking all script assets.');
        }
      });
    });
  });
});
