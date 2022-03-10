const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getUsers, deleteUser} = require('../controllers/usersController');
const { protect } = require('../middleware/authMiddleware');

router.post('/registerGm', registerUser);
router.delete('/delete:id', deleteUser)
router.post('/login', loginUser);
router.get('/show', getUsers)
router.get('/me',protect, getMe);

module.exports = router;