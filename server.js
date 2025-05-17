const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => res.render('index'));
app.get('/contact', (req, res) => res.render('contact', { message: null }));

app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});

app.get('/certifications', (req, res) => {
  res.render('certifications');
});

app.get('/testimonies', (req, res) => {
  res.render('testimonies');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.render('contact', { message: 'All fields are required.' });
  }

  const log = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n---\n`;
  fs.appendFileSync('database.db', log);
  res.render('contact', { message: 'Thank you for contacting us!' });
});

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
