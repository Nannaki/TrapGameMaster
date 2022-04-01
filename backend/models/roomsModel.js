//Appel de mongoose
const mongoose = require('mongoose');

//Creation du Schema pour les salles
const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Merci d\'indiquer le nom de la salle'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean
    },

}, {
    timestamps: true
});

//Export du Schema
module.exports = mongoose.model('Room', roomSchema);