//Appel de mongoose
const mongoose = require('mongoose');

//Creation du Schema pour le Scheduler
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

//Export du Schema
module.exports = mongoose.model('dataScheduler', dataSchedulerSchema);