//Déclaration constantes et requis
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');
const Rooms = require('../models/roomsModel');

// @desc    Enregistrer un utilisateur
// @route   POST /api/users/registerGm
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, isAdmin, rooms} = req.body;

    //Validation
    if(!name || !email || !password || isAdmin === null) {
        res.status(400).json({message:"Merci de remplir tous les champs"})
    }

    if(!name.match(/^[\p{L} ,.'-]+$/u)) {
        res.status(400).json({message:"le nom est incorrecte"})
    }

    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        res.status(400).json({message:"l'adresse email est incorrecte"})
    }

    if(password.length < 4) {
        res.status(400).json({message:"le mot de passe doit contenir au moins 4 caractères"})
    }

    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400).json({message:'L\'utilisateur existe déjà'})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin,
        rooms,
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            rooms: user.rooms,
            token: generateToken(user._id),
        })

    }else {
        res.status(400).json({message: "Données d\'utilisateur invalides"});
    }
})

// @desc    Authentifier un utilisateur
// @route   POST /api/users/login
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id)
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token,
            messages: user.messages
        })

    }else {
        res.status(400).json({message:"Vos données de connexion sont incorrectes"});
    }
})

// @desc    Charger les utilisateurs
// @route   GET /api/users/show
const getUsers = asyncHandler( async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
})

// @desc    Charger un utilisateur depuis son ID
// @route   GET /api/users/getOne
const getUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(400).json({message:'L\'utilisateur n\'a pas été trouvé'});
    }
    res.status(200).json(user);
})

// @desc    Charger les salles non masterisées d'un utilisateur
// @route   GET /api/users/getUnmasterizedRoomOfUser
const getUnmasterizedRoomOfUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);
    const userRooms = user.rooms;
    const allRooms = await Rooms.find();
    const allRoomsName = [];
    const roomsUnmasterized = [];

    if(!user) {
        res.status(400).json({message:'L\'utilisateur n\'a pas été trouvé'});
    }

    for (let i = 0; i < allRooms.length; i++) {
        allRoomsName.push(allRooms[i].name)
    }

    for (let j = 0; j < allRoomsName.length; j++) {
        if(!userRooms.includes(allRoomsName[j])) {
            roomsUnmasterized.push(allRoomsName[j])
        }
    }

    if(roomsUnmasterized.length > 0) {
        res.status(200).json(roomsUnmasterized);
    }
    else {
        res.status(400)
        throw new Error('Aucune salle disponibles pour ce GameMaster');
    }
})

// @desc    Modifier un utilisateur
// @route   PUT /api/users/modifyuser
const updateUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.body.id)
    let error;

    if(req.body.data.name === '') {
        req.body.data.name = user.name

        if(!req.body.data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            error = true;
            res.status(400).json({message:"l'adresse email est incorrecte"})
        }
    }

    if(req.body.data.email === '') {
        req.body.data.email = user.email

        if (!req.body.data.name.match(/^[\p{L} ,.'-]+$/u)) {
            error = true
            res.status(400).json({message:"le nom est incorrecte"})
        }
    }

    if(!error) {
        const updatedUser = await User.findByIdAndUpdate(req.body.id, {
            name: req.body.data.name,
            email: req.body.data.email,
        })
        res.status(200).json(updatedUser)
    }

})

// @desc    Supprimer un utilisateur
// @route   Delete /api/users/delete
const deleteUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(400).json({message:'L\'utilisateur recherché n\'existe pas'});
    }
    await user.remove();
    res.status(200).json({id: req.params.id});
} )

// @desc    Ajouter une salle à un utilisateur
// @route   Put /api/users/AddRoomFromUSer
const addRoomToUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.body.id);
    const actualRooms = user.rooms;
    const addedRoom = req.body.roomsToSend;

    if(!user) {
        res.status(400).json({message:'L\'utilisateur n\'a pas été trouvé'})
    }

    for (let i = 0; i < addedRoom.length; i++) {
        if (!actualRooms.includes(addedRoom[i])) {
            actualRooms.push(addedRoom[i]);
        }
    }

    await User.findByIdAndUpdate(req.params.id, {
        rooms: actualRooms
    })
    res.status(200).json(actualRooms);
})

// @desc    Supprimer une salle dun utilisateur
// @route   Put /api/users/deleteRoomFromUser
const deleteRoomFromUser = asyncHandler ( async (req, res) => {
    const user = await User.findById(req.body.id);
    const toRemove = user.rooms.indexOf(req.body.data)
    user.rooms.splice(toRemove, 1)

    const updatedUser =  await User.findByIdAndUpdate(req.body.id, {
        rooms:  user.rooms
    })
    res.status(200).json(updatedUser)
})

// @desc    Charger les 3 derniers utilisateurs enregistrés
// @route   Get /api/users/lastRecords
const getLastRecords = asyncHandler (async (req,res) => {
    const users = await User.find().sort({$natural:-1}).limit(3).select("-password -messages");

    if(!users) {
        res.status(400).json({message:'Aucun gm trouvés'})
    }

    res.status(201).json(users)

})

// @desc    Charger la conversation d'un utilisateur
// @route   POST /api/users/getMessages
const getMessages = asyncHandler( async (req,res) => {
    const user = await User.findById(req.body.id)
    const messages = user.messages
    res.status(201).json(messages)
})

//Générer le token avec JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '10d',
    })
}

//Exports des fonctions
module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUnmasterizedRoomOfUser,
    getUserById,
    getMessages,
    getLastRecords,
    updateUser,
    addRoomToUser,
    deleteRoomFromUser,
    deleteUser
}