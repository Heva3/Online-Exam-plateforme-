const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const {
      email,
      nom,
      prenom,
      date_naissance,
      role,
      etablissement,
      filiere,
    } = req.body;

    // You can add validation here if needed

    const user = new User({
      email,
      nom,
      prenom,
      date_naissance,
      role,
      etablissement,
      filiere,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

module.exports = {
  registerUser,
};
