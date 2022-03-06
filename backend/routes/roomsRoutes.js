const express = require('express');
const router = express.Router();
const { registerRoom, getRooms, updateRoom, deleteRoom } = require('../controllers/roomsController');

router.get('/show', getRooms );
router.post('/', registerRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom)

module.exports = router;

