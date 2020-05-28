const express = require("express");
const router = express.Router();
const Model = require('../models/orderModel');

router.get('/', (req, res) => {
    res.send("Router Working..")
})

router.post('/add', (req, res) => {
    data = req.body;
    console.log(data)
    model = new Model(data)
    model.save()
    .then((data) => {
        res.status(200).json({message:"success"})
    })
    .catch((err) => {
        res.status(500).send(err.message);
    })
})

router.get('/getall', (req,res) => {
    
    Model.find({})
    .populate('user')
    .then(data => {
        console.log(`fetched ${data}`);
        res.status(200).json(data);
     })
     .catch( err => {
         res.status(500).json(err)
     })
})

router.put('/update/:id', (req,res) => {
    Model.findByIdAndUpdate(req.params.id, req.body)
    .then(data => {
        console.log(`updated ${data}`);
        res.status(200).json(data);
    })
    .catch( err => {
        res.status(500).json(err)
    })
})


router.delete('/delete/:id', (req,res) => {
    Model.findByIdAndDelete(req.params.id, req.body)
    .then(data => {
        console.log(`updated ${data}`);
        res.status(200).json({message : "success"});
    })
    .catch( err => {
        res.status(500).json(err)
    })
})


router.get('/getbyuser/:id',(req,res)=>{
    user_id = req.params.id
    Model.find({user: user_id})
    .populate('product')
    .populate('user')
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
})

router.get('/getbyproduct/:id', (req,res) => {
    Model.findById(req.params.id)
    .then(data => {
        res.status(200).json(data);
    })
    .catch( err => {
        res.status(500).json(err)
    })
})

module.exports = router;