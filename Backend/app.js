
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // adapte le chemin si nécessaire

import authRoutes from './routes/authRoutes.js';
import examRoutes from './routes/examRoutes.js';
import questionRoutes from './controllers/questionController'
import questionRoutes from './controllers/questionController.js';






import cors from 'cors';





dotenv.config();

connectDB(); // Connexion à MongoDB


const app = express();

app.use(express.json());

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


console.log(" app.js: Registering /api/auth");
app.use('/api/auth', authRoutes);

console.log(" app.js: Registering /api/exams");
app.use('/api/exams', examRoutes);

/* console.log(" app.js: Registering /api/questions");
app.use('/api/questions', questionRoutes); */

console.log("app.js: All routes registered!");

export default app;
