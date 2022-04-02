//Déclaration de constantes et de requis
const express = require('express');
const router = express.Router();

//Méthodes appelées selon routes
const { registerUser, loginUser, getUsers, deleteUser, getUserById, updateUser, deleteRoomFromUser, addRoomToUser, getUnmasterizedRoomOfUser, getMessages,
    getLastRecords
} = require('../controllers/usersController');

//Appel du middleware de protection des routes
const {authMiddleware} = require('../middleware/authMiddleware')

//Définition des routes de l'api avec leurs méthodes et protections

    //Routes en GET
    router.get('/show', authMiddleware, getUsers)
    router.get('/getOne:id', authMiddleware,getUserById);
    router.get('/getunmasterizedroomsfromuser:id',authMiddleware, getUnmasterizedRoomOfUser)
    router.get('/lastRecords', authMiddleware, getLastRecords)

    //Routes en POST
    router.post('/login', loginUser);
    router.post('/messages', authMiddleware, getMessages)
    router.post('/registerGm',authMiddleware, registerUser);

    //Routes en PUT
    router.put('/updateuser:id',authMiddleware, updateUser);
    router.put('/addroomtouser:id',authMiddleware, addRoomToUser);
    router.put('/deleteuserroom:id',authMiddleware, deleteRoomFromUser);

    //Route en DELETE
    router.delete('/delete:id',authMiddleware, deleteUser)

//Export du router
module.exports = router;