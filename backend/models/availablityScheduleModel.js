//Appel de mongoose
const mongoose = require('mongoose');

//Creation du Schema de disponibilités
const availablityScheduleSchema = mongoose.Schema({
    name: {
        type: String,
    },
    month: {
        type: String,
    },
    year: {
        type: String,
    },
    availblity: {
        type: Array,
    },
}, {
    timeStamp: true
});

//Export du Schema
module.exports = mongoose.model('availablitySchedule', availablityScheduleSchema);