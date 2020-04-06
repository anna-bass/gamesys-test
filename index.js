var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
  console.log('request ', request.url);

  var filePath = '.' + request.url;
  if (filePath == './') {
    filePath = './public/index.html';
  }

  var extname = String(path.extname(filePath)).toLowerCase();
  var mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json'
  };

  var contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(content, 'utf-8');
      }
      else {
        response.writeHead(500);
        response.end('Error ' + error.code + '. Something went wrong\n');
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });

}).listen(8080);

console.log('Server running at http://localhost:8080/');