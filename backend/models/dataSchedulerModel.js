const mongoose = require('mongoose');

const dataSchedulerSchema = mongoose.Schema({
    id: {
        type: String,
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    text: {
        type: String
    },
    resource: {
        type: String,
    },
    backColor: {
        type: String,
    },
})

module.exports = mongoose.model('dataScheduler', dataSchedulerSchema);