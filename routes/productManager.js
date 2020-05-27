const express = require("express");
const router = express.Router();
const Model = require('../models/productmodel');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req,file, cb) => {
        cb(null, './uploads')
    },
    filename : (req,file,cb)=>{
        cb(null,file.originalname);
    }

})

const upload  = multer({ storage : storage})

router.post('/addimg', upload.single('image'),(req,res)=>{
    console.log(req.body);
    res.json({message: "file upload success"})
})

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
        res.status(500).json(err);
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

router.get('/getbyid/:product_id', (req,res) => {
    let product_id = req.params.product_id;
    Model.findById(product_id)
    .then(data => {
        console.log(`fetched ${data}`);
        res.status(200).json(data);
     })
     .catch( err => {
         res.status(500).json(err)
     })
})

module.exports = router;