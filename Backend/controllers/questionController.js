
 
// Ajouter une question
exports.createQuestion = async (req, res) => {
  try {
    const { text, options, correctAnswer } = req.body;

    //  Validation des champs requis
    if (!text || !Array.isArray(options) || options.length < 2 || !correctAnswer) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires et la question doit avoir au moins deux options.' });
    }

    //  Vérifier que la réponse correcte est bien dans les options
    if (!options.includes(correctAnswer)) {
      return res.status(400).json({ message: 'La réponse correcte doit faire partie des options.' });
    }

    const question = new Question({ text, options, correctAnswer });
    await question.save();

    res.status(201).json({
      message: 'Question créée avec succès',
      question: {
        id: question._id,
        text: question.text,
        options: question.options,
        correctAnswer: question.correctAnswer
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
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
