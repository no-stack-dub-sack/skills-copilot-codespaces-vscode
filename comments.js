// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const comments = require('./comments');

http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  const path = urlObj.pathname;
  const query = urlObj.query;

  if (path === '/getComments') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(comments.getComments()));
  } else if (path === '/addComment') {
    comments.addComment(query.comment);
    res.end('success');
  } else {
    fs.createReadStream('./index.html').pipe(res);
  }
}).listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});