const express = require("express");
const router = express.Router();
const Model = require('../models/Reviewmodel');



router.get('/getreviews/:product_id', (req,res) => {
    let product_id = req.params.product_id;
    Model.find({product: product_id})
    .then(data => {
        console.log(`fetched ${data}`);
        res.status(200).json(data);
     })
     .catch( err => {
         res.status(500).json(err)
     })
})

router.post('/add', (req, res) => {
    data = req.body;
    console.log(data)
    model = new Model(data)
    model.save()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(500).json(err);
    })
})

module.exports = router;