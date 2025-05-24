const router = require('express').Router();
const { detectEmotion } = require('../controllers/emotionController');
router.post('/', detectEmotion);
module.exports = router;
