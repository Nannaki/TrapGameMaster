const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');

// @desc    Get users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler( async (req, res) => {
    const users = await User.find();

    res.status(200).json(users);
})

// @desc    Set users
// @route   POST /api/users
// @access  Private
const setUsers = asyncHandler( async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field');
    }

    const user = await User.create({
        text: req.body.text
    })

    res.status(200).json(user);
})

// @desc    Update users
// @route   PUT /api/users/:id
// @access  Private
const updateUsers = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedUser);
})

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private
const deleteUsers = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
    await user.remove()
    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getUsers,
    setUsers,
    updateUsers,
    deleteUsers,
}