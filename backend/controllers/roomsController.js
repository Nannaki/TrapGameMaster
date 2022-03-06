const asyncHandler = require('express-async-handler');
const Room = require('../models/roomsModel');

// @desc    Get rooms
// @route   GET /api/rooms
// @access  Private

const getRooms = asyncHandler( async (req, res) => {
    const rooms = await Room.find();

    res.status(200).json(rooms);
});


// @desc    Register new room
// @route   POST /api/rooms
// @access  Private

const registerRoom = asyncHandler( async (req, res) => {
    const { name, description } = req.body;
    console.log(req.body)

    if(!name) {
        res.status(400);
        throw new Error('Merci de remplir les champs marqués d\'une étoile');
    }

    //Check if room exists
    const roomExists = await Room.findOne({name});

    if(roomExists) {
        res.status(400);
        throw new Error('La salle existe déjà');
    }

    //Create room
    const room = await Room.create({
        name,
        description,
    })

    if(room) {
        res.status(201).json({
            _id: room.id,
            name: room.name,
            descritpion: room.description,
        })
    }
    else {
        res.status(400);
        throw new Error('Données invalides');
    }
});

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Private

const updateRoom = asyncHandler(async (req,res) => {
    const room = await Room.findById(req.params.id);

    if(!room) {
        res.status(400);
        throw new Error('La salle n\'a pas été trouvée');
    }

    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedRoom);
})

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private

const deleteRoom = asyncHandler(async (req,res) => {
    const room = await Room.findById(req.params.id);

    if(!room) {
        res.status(400);
        throw new Error('La salle n\'a pas été trouvée');
    }

    await room.remove();

    res.status(200).json({id: req.params.id});

})

module.exports = {
    registerRoom,
    getRooms,
    updateRoom,
    deleteRoom,
}