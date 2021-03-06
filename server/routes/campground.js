const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const multer = require('multer');
const cloudinary = require('cloudinary');
const {auth} = require('../middleware/auth')

const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname);
    }
})
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}
var upload = multer({storage: storage, fileFilter: imageFilter});

cloudinary.config({
    cloud_name: 'deezroo6c',
    api_key: '212388765587681',
    api_secret: 'xkJqcw2_2J9hNC3e58eeDNx-PDo'
})

const {Campground} = require('../models/Campground');

router.get('/campground', (req, res) => {
    Campground.find({}).then((campground) => {
       res.status(200);
       res.send({campground});
    }).catch((err) => {
        res.status(400).send({err: true, msg: err})
    })
})

router.post('/campground',upload.single('image'),auth, (req, res) => {
    console.log(req.body);
    const body = req.body;
    cloudinary.uploader.upload(req.file.path, (result) => {
        body.image = {
            img: result.secure_url,
            id: result.public_id
        }

        let newCamp = new Campground({
            name: body.name,
            image: body.image,
            price: Number(body.price),
            description: body.description,
            createdBy: {id: req.user._id, email: req.user.email},
            createdAt: moment().format('DD/MM/YYYY')
        })   
        newCamp.save().then((campground) => {
            res.status(200).send({campground});
        }).catch((e) => {
            console.log(e)
            res.status(403).send({err: true, error: e});
        })
    })
})
router.get('/campground/:id', (req, res) => {
    const id = req.params.id;
    Campground.findById(id).then((campground) => {
        res.send({campground})
    }).catch((err) => {
        res.status(900)
        res.send({err})
    })
})
router.patch('/campground/:id',upload.single('image'),auth, (req, res) => {
    const body = req.body;
    const id = req.params.id;
    if(req.file && req.file.path) {
        cloudinary.v2.uploader.destroy(body.imgId, (error, result) => {
            cloudinary.uploader.upload(req.file.path, (result) => {
                body.image = {
                    img: result.secure_url,
                    id: result.public_id
                }
                Campground.findByIdAndUpdate(id, body, {new: true}).then((campground) => {
                    res.status(200).send({campground});
                }).catch((e) => {
                    console.log(e)
                })
            })
        })
    } else {
        Campground.findByIdAndUpdate(id, body, {new: true}).then((campground) => {
            res.status(200).send({campground});
        }).catch((e) => {
            console.log(e)
        })
    }

})
router.put('/campground/:id',auth, (req, res) => {
    cloudinary.v2.uploader.destroy(req.body.imgId, (error, result) => {

        const id = req.params.id;
        Campground.findOneAndRemove({_id: id}).then((campground) => {
            res.send({campground}).status(200);
        }).catch((e) => {
            console.log(e)
        })
    })
})


module.exports = router;