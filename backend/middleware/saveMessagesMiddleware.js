const User = require('../models/usersModel');

const saveMessagesMiddleware = async (userId,data) => {


    const users = await User.find();

    users.map( async (user) => {

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

module.exports = {
    saveMessagesMiddleware
}