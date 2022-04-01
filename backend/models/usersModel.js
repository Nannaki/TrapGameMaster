//Appel de mongoose
const mongoose = require('mongoose');

//Creation du Schema pour les utilisateurs
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Merci d\'écrire votre nom'],
        trim: true,

    },
    email: {
        type: String,
        required: [true, 'Merci d\'écrire votre email'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Merci d\'écrire votre password'],
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

//Export du Schema
module.exports = mongoose.model('User', userSchema);