const express = require('express');
const router = express.Router();
const { registerRoom, getRooms, getRoomById, updateRoom, deleteRoom } = require('../controllers/roomsController');

router.get('/show', getRooms );
router.get('/getOne:id', getRoomById)
router.post('/addroom', registerRoom);
router.put('/:id', updateRoom);
router.delete('/delete:id', deleteRoom)

module.exports = router;

