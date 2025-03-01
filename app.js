const express = require('express');
const path = require('node:path');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];

app.get('/', (req, res) => {
    res.render('index', {messages: messages});
})
app.get('/new', (req, res) => {
    res.render('form');
})
app.post('/new', (req, res) => {
    const {user, text} = req.body;
    messages.push({user, text, added: new Date()});
    res.redirect('/');
})
app.get('/message/:id', (req, res) => {
    const {id} = req.params;
    console.log(id);
    res.render('message', {id: id, message: messages[id]});
})

app.listen(port, () => {
    console.log(`Connection open`);
});