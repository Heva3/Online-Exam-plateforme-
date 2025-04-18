const http = require('http');
const app = require('./app'); // <-- Import your Express app

const PORT = process.env.PORT || 3000;

const server = http.createServer(app); // <-- Use the Express app here

server.listen(PORT, () => {
  console.log(`✅ Serveur en écoute sur http://localhost:${PORT}`);
});

