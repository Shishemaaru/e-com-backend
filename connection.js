const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/myecom";

mongoose.connect(url, {useNewUrlParser: true})
.then(() => {
    console.log("Successfully connected to databsAe..");
})
.catch((err) => {
    console.log(err);
})

module.exports = mongoose
