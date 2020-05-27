const mongoose = require("../connection");
const Schema = mongoose.Schema;

const userschema = new Schema({
    name: String,
    username : String,
    password : String,
    age : Number,
    email : String,
    contact : Number,
    address : [{type:Object}],
    created : Date,
    image: String,
    admin : Boolean,
})

const usermodel = mongoose.model("users", userschema);

module.exports = usermodel;