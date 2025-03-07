const express = require('express');
const path = require('node:path');
const db = require('./db/queries');
const { error } = require('node:console');
const asyncHandler = require('express-async-handler');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', asyncHandler(async (req, res) => {
    const messages = await db.getMessages();
    res.render('index', {messages: messages});
}))
app.get('/new', (req, res) => {
    res.render('form');
})
app.post('/new', asyncHandler(async (req, res) => {
    const {author, text} = req.body;
    await db.addMessage(author, text, new Date().toISOString().slice(0, 19).replace('T', ' '));
    res.redirect('/');
}))
app.get('/message/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const message = await db.getMessageById(id);
    res.render('message', {message:message});
}))

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error!');
})

app.listen(port, () => {
    console.log(`Connection open`);
});