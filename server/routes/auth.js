const express = require('express');
const router = require('express').Router();
const {User} = require('../models/User');
const {auth} = require('../middleware/auth');

router.post('/user', (req, res) => {
    User.find({email: req.body.email}).then((email) => {
        if(!email.length > 0) {
            const body = {
                email: req.body.email,
                password: req.body.password
            }
            const newUser = new User({
                email: body.email,
            })
            if(body.password) {
                newUser.password = newUser.hashPassword(body.password);
            }   
            newUser.save().then((user) => {
                return newUser.genAuthToken();
            }).then((token) => {
                res.header('x-auth', token).send({newUser, token})
            }).catch((e) => {
                res.status(400).send({
                    err: true,
                    msg: 'email or password not provided'
                })
            })
        } else {
            res.status(403).send({
                err: true,
                msg: 'email address already exists'
            })
        }
    })
})
router.post('/user/login', (req, res) => {
    const body = {
        email: req.body.email,
        password: req.body.password
    }
    let SendUser
    User.findOne({email: body.email}).then((user) => {
        const check = user.checkPassword(body.password, user.password);
            if(check){
                SendUser = user;
                return user.genAuthToken()
            } else {
                return Reject();
            }
    }).then((token) => {
        res.header('x-auth', token).send({SendUser, token})
    }).catch((e) => {
        res.status(400).send({err: e, msg: 'Email or password did not match'})
    })
})
router.get('/user/token/me',auth, (req, res) => {
    res.send({user: req.user});
})
router.get('/user/logout',auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {
        $pull: {tokens:{token: req.token, access: 'auth'}}
    }, {new: true}).then((user) => {
        res.status(200).send({user})
    }).catch((e) => {
        console.log(e)
    })
})

module.exports = router;