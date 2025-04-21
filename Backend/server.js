const http = require('http');
const app = require('./app');

// Use environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Optionally exit the process
  // process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Optionally exit the process
  // process.exit(1);
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ Serveur en écoute sur http://localhost:${PORT}`);
  
  // Optional: Log NODE_ENV
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.syscall !== 'listen') throw error;
  
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});