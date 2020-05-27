const mongoose = require("../connection");
const Schema = mongoose.Schema;

const reviewschema = new Schema({
    user : {type: mongoose.Types.ObjectId, ref: 'users'},
    product : {type: mongoose.Types.ObjectId, ref: 'products'},
    review: String,
    rating: Number,
    created : Date,
    
})

const productmodel = mongoose.model("review", reviewschema);

module.exports = productmodel;