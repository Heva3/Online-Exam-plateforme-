const Exam = require('../models/Exam');
const Question = require('../models/Question');

//  Créer un examen
exports.createExam = async (req, res) => {
  try {
    const { title, description, questionIds, createdBy } = req.body;
    
    // Optionnel : vérifier que toutes les questions existent
    const questions = await Question.find({ _id: { $in: questionIds } });

    const exam = new Exam({
      title,
      description,
      questions: questions.map(q => q._id),
      createdBy
    });

    await exam.save();
    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

//  Récupérer tous les examens
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('questions');
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
