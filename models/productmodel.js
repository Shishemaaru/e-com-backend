const mongoose = require("../connection");
const Schema = mongoose.Schema;

const userschema = new Schema({
    prodname: String,
    prodcat : String,
    prodprice : Number,
    proddesc: Object,
    prodbrand : String,
    images : Array,
    descImgs : Array,
    description : Array,
    
})

const productmodel = mongoose.model("products", userschema);

module.exports = productmodel;