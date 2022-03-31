//Appel des requis
const User = require('../models/usersModel');

//Middelware permettant de sauvegarder les conversation dans le chat (socket.io)
const saveMessagesMiddleware = async (userId,data) => {

    //Recherche de l'utilisateur en BDD
    const users = await User.find();
    users.map( async (user) => {

        //Pour tous les utilisateurs, Check du rôle, récupère les anciens messages, ajoute le nouveau aux anciens
        //limite le nombre max de message sauvés
        let currentUser = await User.findById(user._id);
        let dbMessages = currentUser.messages;

        if(user.isAdmin === true && data.room === "Admin") {

            let adminMessage = {
                author: data.author,
                message: data.message,
                time: data.time
            }

            if(dbMessages.length === 9) {
                dbMessages.shift();
                dbMessages.push(adminMessage)
                userUpdate = await User.updateOne({_id: user._id}, {messages:dbMessages})
            }
            else {
                dbMessages.push(adminMessage)
                userUpdate = await User.updateOne({_id: user._id}, {messages:dbMessages})
            }
        }

        if(user.isAdmin === false && data.room === "GM") {

            let gmMessage = {
                author: data.author,
                message: data.message,
                time: data.time
            }

            if(dbMessages.length === 9) {
                dbMessages.shift();
                dbMessages.push(gmMessage)
                userUpdate = await User.updateOne({_id: user._id}, {messages:dbMessages})
            }
            else {
                dbMessages.push(gmMessage)
                userUpdate = await User.updateOne({_id: user._id}, {messages:dbMessages})
            }
        }
    })
}

//Export du middleware
module.exports = {
    saveMessagesMiddleware
}