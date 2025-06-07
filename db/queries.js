const pool = require('./pool');

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages');
    return rows;
}

async function getMessageById(id) {
    console.log('DB: querying message with id', id);
    const result = await pool.query('SELECT * FROM messages WHERE id = $1', [
        id,
    ]);
    console.log('DB: query complete, result.rowCount =', result.rowCount);
    return result.rows[0];
}

async function insertMessage({username, messageText}) {
    return pool.query("INSERT INTO messages (username, message_text) VALUES ($1, $2)", [username, messageText]);
}

module.exports = {
    getAllMessages,
    getMessageById,
    insertMessage
};
