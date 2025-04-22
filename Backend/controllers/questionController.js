const Question = require('../models/Question');

//  Ajouter une question
exports.createQuestion = async (req, res) => {
  try {
    const { text, options, correctAnswer } = req.body;
    const question = new Question({ text, options, correctAnswer });
    await question.save();
    res.status(201).json({ message: 'Question created successfully', question });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Récupérer toutes les questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
