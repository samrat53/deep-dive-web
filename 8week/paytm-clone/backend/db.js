const mongoose=require("mongoose");
require("dotenv").config();
const DB_URl=process.env.DB_URl;
mongoose.connect(DB_URl);

const userSchema=new mongoose.Schema({
    username:String,
    password: String,
    firstName: String,
    lastName: String
});

const User=mongoose.model("User",userSchema);

module.exports={User};