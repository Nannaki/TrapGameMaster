//Déclaration de constantes et de requis
const express = require('express');
const router = express.Router();

//Méthodes appelées selon routes
const { registerRoom, getRooms, getRoomById, updateRoom, deleteRoom } = require('../controllers/roomsController');

//Appel du middleware de protection des routes
const {authMiddleware} = require("../middleware/authMiddleware");

//Définition des routes de l'api avec leurs méthodes et protections

    //Routes en GET
    router.get('/show', authMiddleware, getRooms );
    router.get('/getOne:id',authMiddleware, getRoomById)

    //Route en POST
    router.post('/addroom',authMiddleware, registerRoom);

    //Route en PUT
    router.put('/updateroom:id',authMiddleware, updateRoom);

    //Route en DELETE
    router.delete('/delete:id',authMiddleware, deleteRoom)

//Export du router
module.exports = router;

