const mongoose = require("mongoose");

module.exports = ()=>{
    console.log("connected to db")
    return mongoose.connect("mongodb+srv://rounak:rounakmojumder@cluster0.tb3uz.mongodb.net/AdRENTure", {useUnifiedTopology: true , useNewUrlParser: true})
}