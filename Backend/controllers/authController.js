const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Helper to create and send JWT token
const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role
      }
    }
  });
};

// @desc    Register new user (Inscription)
// @route   POST /api/auth/register
// @access  Public
exports.register = catchAsync(async (req, res, next) => {
  const { email, nom, prenom, date_naissance, sexe, filiere, etablissement, password, passwordConfirm } = req.body;

  // 1) Vérification des mots de passe
  if (password !== passwordConfirm) {
    return next(new AppError('Les mots de passe ne correspondent pas', 400));
  }

  // 2) Création de l'utilisateur
  const newUser = await User.create({
    email,
    nom,
    prenom,
    date_naissance,
    sexe,
    filiere,
    etablissement,
    password,
    passwordConfirm
  });

  // 3) Envoi du token JWT
  createSendToken(newUser, 201, res);
});

// @desc    Login user (Connexion)
// @route   POST /api/auth/login
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Vérification de l'email et du mot de passe
  if (!email || !password) {
    return next(new AppError('Veuillez fournir un email et un mot de passe', 400));
  }

  // 2) Vérification de l'utilisateur
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Email ou mot de passe incorrect', 401));
  }

  // 3) Envoi du token JWT
  createSendToken(user, 200, res);
});

// @desc    Protect routes (Middleware d'authentification)
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Vérification du token JWT
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Vous n\'êtes pas connecté! Veuillez vous connecter pour accéder à cette ressource.', 401));
  }

  // 2) Vérification du token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Vérification de l'existence de l'utilisateur
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('L\'utilisateur associé à ce token n\'existe plus.', 401));
  }

  // 4) Vérification du changement de mot de passe
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('Le mot de passe a été modifié récemment! Veuillez vous reconnecter.', 401));
  }

  req.user = currentUser;
  next();
});

// @desc    Restrict to roles (Middleware de restriction)
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Vous n\'avez pas la permission d\'effectuer cette action', 403)
      );
    }
    next();
  };
};

// @desc    Forgot password (Mot de passe oublié)
// @route   POST /api/auth/forgotPassword
// @access  Public
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('Aucun utilisateur avec cette adresse email', 404));
  }

  // Implémentez ici la logique de réinitialisation
  return next(new AppError('Fonctionnalité en cours de développement', 501));
});

// @desc    Update password (Mise à jour du mot de passe)
// @route   PATCH /api/auth/updatePassword
// @access  Private
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Récupération de l'utilisateur
  const user = await User.findById(req.user.id).select('+password');

  // 2) Vérification du mot de passe actuel
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Votre mot de passe actuel est incorrect', 401));
  }

  // 3) Mise à jour du mot de passe
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // 4) Connexion automatique
  createSendToken(user, 200, res);
});