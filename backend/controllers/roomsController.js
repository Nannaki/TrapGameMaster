//Déclaration constantes et requis
const asyncHandler = require('express-async-handler');
const Room = require('../models/roomsModel');
const User = require("../models/usersModel");

// @desc    Charger les salles
// @route   GET /api/rooms
const getRooms = asyncHandler( async (req, res) => {
    const rooms = await Room.find();
    res.status(200).json(rooms);
});

// @desc    Charger une salle selon son ID
// @route   GET /api/rooms/:id
const getRoomById = asyncHandler( async (req, res) =>{
    const room = await Room.findById(req.params.id);
    if(!room) {
        res.status(400);
        throw new Error('La salle n\'a pas été trouvée');
    }
    res.status(200).json(room);
})

// @desc    Enregistrer une salle
// @route   POST /api/rooms
const registerRoom = asyncHandler( async (req, res) => {
    const { name, description, isActive } = req.body;
    if(!name) {
        res.status(400).json({message:'Merci de remplir les champs marqués d\'une étoile'});
    }

    const roomExists = await Room.findOne({name});
    if(roomExists) {
        res.status(400).json({message:'La salle existe déjà'});
    }
    const room = await Room.create({
        name,
        description,
        isActive,
    })

    if(room) {
        res.status(201).json({
            _id: room.id,
            name: room.name,
            descritpion: room.description,
        })
    }
    else {
        res.status(400).json({message:'Données invalides'});
    }
});

// @desc    Modifier une salle
// @route   PUT /api/rooms/:id
const updateRoom = asyncHandler(async (req,res) => {
    const room = await Room.findById(req.body.id);
    if(!room) {
        res.status(400).json({message:'La salle n\'a pas été trouvée'});
    }

    if(req.body.data.name === '') {
        req.body.data.name = room.name
    }

    if(req.body.data.description === '') {
        req.body.data.description = room.description;
    }

    const updatedRoom = await Room.findByIdAndUpdate(req.body.id, {
        name: req.body.data.name,
        description: req.body.data.description,
        isActive: req.body.data.isActive,
    })
        res.status(200).json(updatedRoom);
})

// @desc    Charger les 3 dernières salles enregistrées
// @route   Get /api/users/lastRecords
const getLastRecords = asyncHandler (async (req,res) => {
    const rooms = await Room.find().sort({$natural:-1}).limit(3);
    if(!rooms) {
        res.status(400).json({message:'Aucune salles trouvées'})
    }
    res.status(201).json(rooms)
})


// @desc    Supprimer une salle
// @route   DELETE /api/rooms/:id
const deleteRoom = asyncHandler(async (req,res) => {
    const room = await Room.findById(req.params.id);
    if(!room) {
        res.status(400).json({message:'La salle n\'a pas été trouvée'});
    }
    await room.remove();
    res.status(200).json({id: req.params.id});
})

//Export des fonctions
module.exports = {
    registerRoom,
    getRooms,
    getRoomById,
    getLastRecords,
    updateRoom,
    deleteRoom,
}