const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe} = require('../controllers/usersController');
const { protect } = require('../middleware/authMiddleware');

router.post('/registerGm',protect, registerUser);
router.post('/login', loginUser);
router.get('/me',protect, getMe);

module.exports = router;