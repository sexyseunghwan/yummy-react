// server.js
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

// Next.js 설정
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// SSL 인증서 로드
const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/yummy-chocosonge.duckdns.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/yummy-chocosonge.duckdns.org/fullchain.pem')
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(443, err => {
        if (err) throw err;
        console.log('> HTTPS Ready on https://yummy-chocosonge.duckdns.org');
    });
});