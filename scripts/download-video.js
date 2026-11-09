const https = require('https');
const fs = require('fs');
const path = require('path');

const fileId = '1YGs3GpVCB7_1E2CFEr0z2h54dNksFkHY';
const initialUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

function download(url, depth = 0) {
  if (depth > 6) {
    console.error('Too many redirects');
    return;
  }

  https.get(url, (res) => {
    console.log(`[Status ${res.statusCode}] Content-Type: ${res.headers['content-type']}`);
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log(`Redirecting to: ${res.headers.location}`);
      return download(res.headers.location, depth + 1);
    }

    const contentType = res.headers['content-type'] || '';
    if (contentType.includes('video') || contentType.includes('application/octet-stream')) {
      const outPath = path.join(__dirname, '../public/media/videos/surprise.mp4');
      const fileStream = fs.createWriteStream(outPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        const stats = fs.statSync(outPath);
        console.log(`Successfully downloaded video to ${outPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      });
    } else {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log('Received response (first 200 chars):', body.slice(0, 200));
        // Check for confirm token
        const match = body.match(/confirm=([a-zA-Z0-9_\-]+)/);
        if (match) {
          const confirmToken = match[1];
          const confirmUrl = `https://drive.google.com/uc?export=download&confirm=${confirmToken}&id=${fileId}`;
          console.log(`Found confirm token: ${confirmToken}. Retrying with confirmation...`);
          return download(confirmUrl, depth + 1);
        } else {
          console.log('No confirmation token found. May require browser auth or iframe embed.');
        }
      });
    }
  }).on('error', (err) => {
    console.error('Download error:', err.message);
  });
}

download(initialUrl);
