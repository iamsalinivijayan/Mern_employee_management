const mongoose = require("mongoose")

const connectDb = async () =>{
    try {
        const connection = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("database connected", connection.connection.host, connection.connection.name )
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDb