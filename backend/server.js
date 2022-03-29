const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const {authMiddleware} = require('./middleware/authMiddleware')
const colors = require('colors');
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

//Use de l'app pour JSON routes et cors
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
    console.log("User connected ", socket.id)


    if(socket.handshake.auth.admin) {
        socket.join("Admin");
        socket.join("Admin-Gm");
        io.to("Admin").to("Admin-Gm").emit(socket.handshake.auth.username + "viens de rejoindre la room");
    }

    console.log(socket.rooms)


    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
    })
})

//Start server
httpServer.listen(port, () => console.log(`Server started on port ${port}`))
