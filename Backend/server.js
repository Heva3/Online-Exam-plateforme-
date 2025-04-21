const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Créer le serveur HTTP en utilisant app
const server = http.createServer(app);

// Lancer le serveur
server.listen(PORT, () => {
  console.log(`✅ Serveur en écoute sur http://localhost:${PORT}`);
});
