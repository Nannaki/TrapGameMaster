const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getUsers, deleteUser, getUserById, updateUser, deleteRoomFromUser,
    addRoomToUser, getUnmasterizedRoomOfUser
} = require('../controllers/usersController');
const {authMiddleware} = require('../middleware/authMiddleware')

router.post('/registerGm', registerUser);
router.put('/updateuser:id', updateUser);
router.put('/addroomtouser:id', addRoomToUser);
router.put('/deleteuserroom:id', deleteRoomFromUser);
router.delete('/delete:id', deleteUser)
router.post('/login', loginUser);
router.get('/dashboardadmin', authMiddleware)
router.get('/show',authMiddleware, getUsers)
router.get('/getOne:id', getUserById);
router.get('/getunmasterizedroomsfromuser:id', getUnmasterizedRoomOfUser)

module.exports = router;