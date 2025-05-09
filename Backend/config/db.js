import mongoose from 'mongoose';  // Use 'import' for ES modules
import dotenv from 'dotenv';  // You also need to import dotenv

dotenv.config();  // Load environment variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export default connectDB;  // Use 'export' instead of 'module.exports'
