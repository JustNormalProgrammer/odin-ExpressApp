const pool = require('./pool');

async function getMessages(){
    const {rows} = await pool.query('SELECT * FROM messages');
    return rows;
}
async function addMessage(author, text, date){
    await pool.query('INSERT INTO messages (author, text, added) VALUES ($1, $2, $3)', [author, text, date]);
    return;
}
async function getMessageById(id){
    const {rows} = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);
    return rows[0];
}

module.exports = {
    getMessages,
    addMessage,
    getMessageById
}