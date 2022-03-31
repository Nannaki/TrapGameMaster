//Appel des requis
const mongoose = require('mongoose');
const colors = require('colors');

//Connection à la BDD
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);

    }catch (error) {
        console.log(error);
        process.exit(1);
    }
}

//Export de la connection
module.exports = connectDB;