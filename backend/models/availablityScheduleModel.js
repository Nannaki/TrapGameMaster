const mongoose = require('mongoose');

const availablityScheduleSchema = mongoose.Schema({
    name: {
        type: String,
    },
    month: {
        type: String,
    },
    year: {
        type: Number,
    },
    availblity: {
        type: Array,
    },
}, {
    timeStamp: true
});

module.exports = mongoose.model('availablitySchedule', availablityScheduleSchema);