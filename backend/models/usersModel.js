const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    text: {
        type: String,
        require: [true, 'Merci d\'écrire votre nom']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);