const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
function connectDB(){

    mongoose.connect('mongodb+srv://viswa:Vichu1907$$@cluster.wpw72ml.mongodb.net/vichucars' , {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose
