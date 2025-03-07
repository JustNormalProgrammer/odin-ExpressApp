const express = require('express');
const path = require('node:path');
const db = require('./db/queries');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
    const messages = await db.getMessages();
    res.render('index', {messages: messages});
})
app.get('/new', (req, res) => {
    res.render('form');
})
app.post('/new', async (req, res) => {
    const {author, text} = req.body;
    await db.addMessage(author, text, new Date().toISOString().slice(0, 19).replace('T', ' '));
    res.redirect('/');
})
app.get('/message/:id', async (req, res) => {
    const {id} = req.params;
    const message = await db.getMessageById(id);
    res.render('message', {message:message});
})

app.listen(port, () => {
    console.log(`Connection open`);
});