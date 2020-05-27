const mongoose=require('../connection')
const Schema= mongoose.Schema;
 
const OrderSchema=new Schema({
    user: {type: mongoose.Types.ObjectId, ref:"users"},
    created: Date,
    complete:Boolean,
    cart: Object,
    amount: Number,
    created : Date,
})
 
const model = mongoose.model('orders', OrderSchema);
module.exports=model;