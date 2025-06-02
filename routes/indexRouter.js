const { Router } = require('express');
const router = Router();
const messageController = require('../controllers/messageController');

const messages = [
    {
        text: 'Hi there!',
        user: 'Amando',
        added: new Date(),
    },
    {
        text: 'Hello World!',
        user: 'Charles',
        added: new Date(),
    },
];

router.get('/', messageController.getAllMessages);

router.get('/new', (req, res) => {
   res.render("form") 
});


router.post("/new", (req, res) => {
    const messageText = req.body.messageText;
    const messageUser = req.body.messageUser;

    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
});

router.get("/messages/:id", messageController.getMessageById);

module.exports = router;
