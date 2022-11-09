const mongoose = require("mongoose");
require('dotenv').config();

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected to MongoDb: ${connection.connections[0].name}`)
    } catch (error) {
        console.log('Error connecting to database')
    }
}
 module.exports = connectDb;