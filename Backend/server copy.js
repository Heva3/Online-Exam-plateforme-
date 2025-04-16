const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello Aya ! Bienvenue sur ton backend 🎉');
});

server.listen(3000, () => {
  console.log('Serveur en écoute sur http://localhost:3000');
});
