const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota GET
app.get('/', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;
    res.render('index', { usuarios: results });
  });
});

// Rota POST
app.post('/add', (req, res) => {
  const { nome, email } = req.body;
  db.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email], err => {
    if (err) throw err;
    res.redirect('/');
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
