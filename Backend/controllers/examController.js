const Exam = require('../models/Exam');
const Question = require('../models/Question');


 
  


 
// Créer un examen
exports.createExam = async (req, res) => {
  try {
    const { title, description, questionIds, createdBy } = req.body;

    // Validation des champs requis
    if (!title || !description || !questionIds || !createdBy) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    // Vérifier que toutes les questions existent
    const questions = await Question.find({ _id: { $in: questionIds } });
    if (questions.length !== questionIds.length) {
      return res.status(404).json({ message: 'Certaines questions n\'existent pas' });
    }

    //Création de l'examen
    const exam = new Exam({
      title,
      description,
      questions: questions.map(q => q._id),
      createdBy
    });

    await exam.save();

    //  Réponse propre
    res.status(201).json({
      message: 'Examen créé avec succès',
      exam: {
        id: exam._id,
        title: exam.title,
        description: exam.description,
        questions: exam.questions,
        createdBy: exam.createdBy
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
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
