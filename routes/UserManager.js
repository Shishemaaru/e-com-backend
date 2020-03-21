const express = require("express");
const router = express.Router();
const Model = require('../models/usermodel');

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

router.get('/getbyname/:name', (req,res) => {
    let name = req.params.name;
    Model.find({ "name": { "$regex": name, "$options": "i"}})
    .then(data => {
        console.log(`fetched ${data}`);
        res.status(200).json(data);
     })
     .catch( err => {
         res.status(500).json(err)
     })
})

router.get('/getall', (req,res) => {
    
    Model.find({})
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
        res.status(200).json({message : "success"});
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

module.exports = router;