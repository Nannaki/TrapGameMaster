//Déclaration de constantes et de requis
const express = require('express');
const router = express.Router();

//Méthodes appelées selon routes
const {getActualsMonths, getAllDaysInMonth, registerUserAvailblity, getUsersAvailblity, addNewEventSchedule, getEventsFromSchedule, deleteEvent } = require('../controllers/scheduleController');

//Appel du middleware de protection des routes
const {authMiddleware} = require('../middleware/authMiddleware');

//Définition des routes de l'api avec leurs méthodes et protections

    //Routes en GET
    router.get('/actualsMonths',authMiddleware, getActualsMonths);
    router.get('/getEvents',authMiddleware, getEventsFromSchedule);

    //Routes en POST
    router.post('/getUserAvailblity',authMiddleware, getUsersAvailblity)
    router.post('/alldaysinmonth',authMiddleware, getAllDaysInMonth);
    router.post('/registerUserAvailblity',authMiddleware, registerUserAvailblity);
    router.post('/addNewEventSchedule',authMiddleware, addNewEventSchedule);

    //Routes en DELETE
    router.delete('/deleteEvent:id',authMiddleware, deleteEvent)

//Export du router
module.exports = router
