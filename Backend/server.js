/* 
import express from 'express';
import connectDB from './config/db.js'; 
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allow CORS requests
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 */
/* import app from './app.js'; // Importer l'app de app.js
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

 */
/*import dotenv from 'dotenv';
dotenv.config(); */

/* import connectDB from './config/db.js';
connectDB(); */ 
import dotenv from 'dotenv';
dotenv.config(); // CHARGE LES VARIABLES D'ENVIRONNEMENT

import app from './app.js';

const PORT = process.env.PORT || 5500;

console.log(" server.js: app importé");

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
