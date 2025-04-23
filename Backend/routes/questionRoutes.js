const express = require('express');
const router = express.Router();
const { createQuestion, getAllQuestions } = require('../controllers/questionController');

// Route pour ajouter une question
router.post('/create', createQuestion);t

// Route pour récupérer toutes les questions
router.get('/', getAllQuestions);

module.exports = router;
