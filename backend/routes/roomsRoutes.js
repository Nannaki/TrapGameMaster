const express = require('express');
const router = express.Router();
const { registerRoom, getRooms, getRoomById, updateRoom, deleteRoom } = require('../controllers/roomsController');
const {authMiddleware} = require("../middleware/authMiddleware");

router.get('/show', authMiddleware, getRooms );
router.get('/getOne:id',authMiddleware, getRoomById)
router.post('/addroom',authMiddleware, registerRoom);
router.put('/updateroom:id',authMiddleware, updateRoom);
router.delete('/delete:id',authMiddleware, deleteRoom)

module.exports = router;

