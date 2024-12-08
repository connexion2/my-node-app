const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3006;

// Middleware pour parser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour recevoir les données du formulaire
app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Configuration de l'email (ici avec Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'service.onrender.bank@gmail.com',
      pass: 'ehoj whpf gcwu drvb' // Remplace ça par un mot de passe spécifique à l'application
    }
  });

  const mailOptions = {
    from: 'service.onrender.bank@gmail.com',
    to: 'service.onrender.bank@gmail.com',
    subject: 'Nouveau formulaire soumis',
    text: `Un formulaire a été soumis avec les données suivantes:\n\n${JSON.stringify(formData, null, 2)}`
  };

  // Envoyer l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Erreur lors de l\'envoi de l\'email');
    } else {
      console.log('Email envoyé: ' + info.response);
      res.status(200).send('Formulaire soumis et email envoyé');
    }
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
