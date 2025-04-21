const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load environment variables
dotenv.config({ path: './.env' });

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout for initial connection
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  maxPoolSize: 10, // Maintain up to 10 socket connections
  retryWrites: true,
  w: 'majority'
};

const connectDB = async () => {
  try {
    // Connection with timeout handling
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log(`\n🗄️  MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    console.log(`📚 Database: ${conn.connection.name}`.blue);
    console.log(`👥 Models: ${Object.keys(mongoose.models).join(', ')}\n`.magenta);
    
    // Connection events
    mongoose.connection.on('connected', () => {
      console.log('✅ Mongoose default connection open'.green);
    });

    mongoose.connection.on('error', (err) => {
      console.error(`❌ Mongoose connection error: ${err.message}`.red);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  Mongoose connection disconnected'.yellow);
    });

    return conn;
  } catch (error) {
    console.error(`\n❌ MongoDB connection failed: ${error.message}`.red.bold);
    
    // Exit with failure code in production
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      // In development, just throw the error
      throw error;
    }
  }
};

// Graceful shutdown handlers
const shutdown = async (signal) => {
  console.log(`\n${signal} received. Closing MongoDB connection...`.yellow);
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed successfully'.green);
    process.exit(0);
  } catch (err) {
    console.error(`❌ Error closing MongoDB connection: ${err.message}`.red);
    process.exit(1);
  }
};

// Handle different shutdown signals
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

module.exports = connectDB;