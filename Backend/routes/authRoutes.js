const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// @route    POST /api/auth/register
// @desc     Register new user (Inscription)
// @access   Public
router.post('/register', authController.register);

// @route    POST /api/auth/login
// @desc     Login user (Connexion)
// @access   Public
router.post('/login', authController.login);

// @route    POST /api/auth/forgotPassword
// @desc     Forgot password (Mot de passe oublié)
// @access   Public
router.post('/forgotPassword', authController.forgotPassword);

// @route    PATCH /api/auth/updatePassword
// @desc     Update password (Mettre à jour le mot de passe)
// @access   Private (requires auth)
router.patch('/updatePassword', authController.protect, authController.updatePassword);

// @route    GET /api/auth/me
// @desc     Get current user info (Obtenir les infos de l'utilisateur connecté)
// @access   Private
router.get('/me', authController.protect, (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
});

module.exports = router;