<<<<<<< HEAD
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello Aya eur en écoute sur http://localhost:3000');
});
=======
const http = require('http'); // <= cette ligne manquait

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Aya ! Bienvenue sur ton backend 🎉');
});

server.listen(3000, () => {
  console.log('Serveur en écoute sur http://localhost:3000');
});
>>>>>>> 1e50d26d42737002fe6feb596b94eddf6957d054
