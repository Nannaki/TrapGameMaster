//Déclaration constantes et requis
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const {authMiddleware} = require('./middleware/authMiddleware');
const {saveMessagesMiddleware} = require('./middleware/saveMessagesMiddleware');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const jwt = require("jsonwebtoken");
const User = require("./models/usersModel");
const axios = require("axios");
const port = process.env.PORT || 5000;
const app = express();

//Connection Bdd
connectDB();

//Use de l'store pour JSON routes et cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/rooms', require('./routes/roomsRoutes'));
app.use('/api/schedule', require('./routes/scheduleRoutes'))

//Creation server HTTP
const httpServer = createServer(app);

//Creation server Websocket
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000'],
    },
});

//Wrap pour middleware
const wrap = middleware => (socket, next) => {
    const request = socket.request;
    request.headers.authorization = socket.handshake.auth.token;
    return middleware(request, {}, next);
};

//Ajout wrap pour socket
io.use(wrap(authMiddleware));

//Event de connection
io.on('connection', socket => {

    //joind é'utilsateur a une room
    socket.on("join_room", (data) => {
        socket.join(data);
    })

    //Ecoute les messages envoyés
    socket.on("send_message", (data) => {

        //MiddleWare d'enregistrement de message en BDD
        saveMessagesMiddleware(socket.handshake.auth.token, data);

        //Ecoute les messages recus
        socket.to(data.room).emit("receive_message", data);

    })

    //Ecoute la déconnection
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
    })
})

//Start server
httpServer.listen(port, () => console.log(`Server started on port ${port}`))
