const mongoose = require("../connection");
const Schema = mongoose.Schema;

const userschema = new Schema({
    name: String,
    username : String,
    password : String,
    age : Number,
    email : String
})

const usermodel = mongoose.model("users", userschema);

module.exports = usermodel;