//Appel des requis
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');

//Middleware de contrôle du token utilisateur pour protéger les routes
const authMiddleware = asyncHandler( async (req, res, next) => {

    //Token dans la requête
    let token;
    if(req.headers.authorization){

        //Décryptage du token avec validation si l'utilisateur existe (token contient ID de l'utilisateur)
        try {

            token = req.headers.authorization;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();

        //Envoie d'erreur si l'utilisateur n'existe pas
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized')
        }
    }
    //Envoie d'erreur si aucun token dans le header
    else {
        res.status(401);
        throw new Error('Not authorized, no token')
    }

})

//Export du middleware
module.exports = { authMiddleware };