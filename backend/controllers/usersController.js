const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');


// @desc    Register new user
// @route   POST /api/users/registerGm
// @access  Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, isAdmin, rooms} = req.body;

    if(!name || !email || !password || isAdmin === null) {
        res.status(400)
        throw new Error('Merci de remplir tous les champs')
    }

    //Check if user exists
    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400)
        throw new Error('L\'utilisateur existe déjà')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
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
        res.status(400);
        throw new Error('Données d\'utilisateur invalides');
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    //Check for user email
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else {
        res.status(400);
        throw new Error('Données incorrectes');
    }
})

// @desc    Get users
// @route   GET /api/users/show
// @access  Private
const getUsers = asyncHandler( async (req, res) => {
    const users = await User.find().select('-password');

    res.status(200).json(users);
})

// @desc    Get user by ID
// @route   GET /api/users/getOne
// @access  Private
const getUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(400);
        throw new Error('L\'utilisateur n\'a pas été trouvé');
    }

    res.status(200).json(user);
})

// @desc    Update user data
// @route   PUT /api/users/delete
// @access  Private
const updateUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.body.id)

    if(req.body.data.name === '') {
        req.body.data.name = user.name
    }

    if(req.body.data.email === '') {
        req.body.data.email = user.email
    }

    const updatedUser = await User.findByIdAndUpdate(req.body.id, {
        name: req.body.data.name,
        email: req.body.data.email,
    })

    res.status(200).json(updatedUser)

})

// @desc    Delete user data
// @route   Delete /api/users/delete
// @access  Private
const deleteUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(400);
        throw new Error('L\'utilisateur recherché n\'existe pas');
    }

    await user.remove();

    res.status(200).json({id: req.params.id});
} )

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler( async (req, res) => {
    res.status(200).json(req.user);
})

//Generate JWT
const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}