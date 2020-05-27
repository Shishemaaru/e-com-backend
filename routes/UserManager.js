const express = require("express");
const router = express.Router();
const Model = require('../models/usermodel');
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
        res.status(200).json(data);
    })
    .catch( err => {
        res.status(500).json(err)
    })
})


router.put('/addaddress/:id', (req,res) => {
    Model.findByIdAndUpdate(req.params.id, {$push : {address : req.body}})
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

router.get('/getbyusername/:username', (req,res) => {
    Model.findOne({username: req.params.username})
    .then(data => {
        res.status(200).json(data);
    })
    .catch( err => {
        res.status(500).json(err)
    })
})

router.get('/getbyid/:id', (req,res) => {
    Model.findById(req.params.id)
    .then(data => {
        res.status(200).json(data);
    })
    .catch( err => {
        res.status(500).json(err)
    })
})

router.get('/getbyemail/:email', (req,res) => {
    Model.findOne({email: req.params.email})
    .then(data => {
        res.status(200).json(data);
    })
    .catch( err => {
        res.status(500).json(err)
    })
})

router.put("/changepassword/:id", (req, res) => {
      let id = req.params.id;
      let data = req.body;
      console.log(id);
      console.log(data);
      Model.findOneAndUpdate(id, data)
      .then((data)=>{
          res.status(200).json(data);
      })
      .catch((err)=>{
          res.status(500).send(err.message);
      })
    })

module.exports = router;