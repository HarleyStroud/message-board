const { Router } = require('express');
const router = Router();
const messageController = require('../controllers/messageController');


router.get('/', messageController.getAllMessages);

router.get('/new', (req, res) => {
   res.render("form") 
});

router.get("/messages/:id", messageController.getMessageById);
router.post('/new', messageController.createMessage);

module.exports = router;
