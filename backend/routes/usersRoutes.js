const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getUsers, deleteUser, getUserById, updateUser} = require('../controllers/usersController');
const { protect } = require('../middleware/authMiddleware');

router.post('/registerGm', registerUser);
router.put('/updateuser:id', updateUser)
router.delete('/delete:id', deleteUser)
router.post('/login', loginUser);
router.get('/show', getUsers)
router.get('/getOne:id', getUserById)
router.get('/me',protect, getMe);

module.exports = router;