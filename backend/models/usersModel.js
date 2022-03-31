const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Merci d\'écrire votre nom']
    },
    email: {
        type: String,
        required: [true, 'Merci d\'écrire votre email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Merci d\'écrire votre password']
    },
    isAdmin: {
        type: Boolean,
        required: [true, 'Merci d\'indiquer le rôle de l\'utilisateur']
    },
    rooms: {
        type: Array,
    },
    messages: {
        type: Array,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);