// backend/controllers/authController.js
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    // Exemple fictif
    if (email === "aya@example.com" && password === "123456") {
      res.json({ message: "Connexion réussie", user: email });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
  };
  