import express from 'express';
import {
  register,
  login,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';

const router = express.Router();
// Inscription
router.post('/register', register);
//Connexion
router.post('/login', login);
//  Mot de passe oublié (vérifie si l'email existe)
router.post('/forgot-password', forgotPassword);
//Réinitialisation du mot de passe
router.post('/reset-password', resetPassword);
export default router;
