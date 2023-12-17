const express = require('express');
const { CreateNotes, listNotes } = require('../controllers/notesController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
router.post('/savenotes',authMiddleware, CreateNotes);
router.get('/listnotes', authMiddleware, listNotes, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});
module.exports = router;
