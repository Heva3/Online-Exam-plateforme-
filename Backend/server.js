const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello Aya eur en écoute sur http://localhost:3000');
});