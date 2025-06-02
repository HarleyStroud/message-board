const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const getAllMessages = asyncHandler(async (req, res) => {
    const messages = await db.getAllMessages();
    console.log(
        `All Messages From Database:  ${JSON.stringify(messages, null, 2)}`
    );
    res.render('index', { title: 'Mini Messageboard', messages: messages });
});

const getMessageById = asyncHandler(async (req, res) => {
    const messageId = Number(req.params.id);

    console.log('Request param ID:', req.params.id);

    if (Number.isNaN(messageId)) {
        console.log('Invalid ID detected');
        throw new Error('Invalid message ID');
    }

    const message = await db.getMessageById(Number(messageId));
    console.log('DB call returned:', message);

    if (!message) {
        console.log('Message not found');
        throw new Error('Message not found');
    }

    console.log('Rendering message view');
    res.render('message', { message });
});

module.exports = { getMessageById, getAllMessages };
