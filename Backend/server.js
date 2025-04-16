// server.js
const http = require('http');
const app = require('./app'); // ⬅️ importer ton app Express bien configurée

const PORT = process.env.PORT || 3000;

const server = http.createServer(app); // ⬅️ utiliser Express ici

server.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});
