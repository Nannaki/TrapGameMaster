const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password, isAdmin} = req.body;

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
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else {
        res.status(400);
        throw new Error('Donnée d\'utilisateur invalide');
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

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler( async (req, res) => {
    const { _id, name, email, isAdmin } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email,
        isAdmin,
    })
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
}