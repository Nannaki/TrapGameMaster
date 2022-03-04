const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Merci d\'indiquer le nom de la salle'],
        unique: true,
    },
    description: {
        type: String,
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);