const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getUsers, deleteUser, getUserById, updateUser, deleteRoomFromUser,
    addRoomToUser, getUnmasterizedRoomOfUser, getMessages
} = require('../controllers/usersController');
const {authMiddleware} = require('../middleware/authMiddleware')

router.post('/registerGm',authMiddleware, registerUser);
router.put('/updateuser:id',authMiddleware, updateUser);
router.put('/addroomtouser:id',authMiddleware, addRoomToUser);
router.put('/deleteuserroom:id',authMiddleware, deleteRoomFromUser);
router.delete('/delete:id',authMiddleware, deleteUser)
router.post('/login', loginUser);
router.get('/show', authMiddleware, getUsers)
router.get('/getOne:id', authMiddleware,getUserById);
router.get('/getunmasterizedroomsfromuser:id',authMiddleware, getUnmasterizedRoomOfUser)
router.post('/messages', authMiddleware, getMessages)

module.exports = router;