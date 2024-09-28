const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        mongoose.connect("connection string",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("MongoDB CONNECTED")
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDB;