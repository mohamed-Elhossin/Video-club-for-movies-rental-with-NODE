const express = require('express')
const joi = require('@hapi/joi');
const router = express.Router();
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken");
const { User , valdiate} = require('../models/user');
const _ = require('lodash')
const auth = require('../middleWare/auth')
const config = require('config');
const admin = require('../middleWare/admin')
require('express-async-errors');

router.get('/', async (req, res) => {
    const user = await User.find();
    res.send(user)
});

router.post('/', async (req, res) => {
let user = await User.findOne({email : req.body.email });
if(user) return res.status(404).send("user aridy exist , register ");
     
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    })
  const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password , salt);
   const token = jwt.sign({_id : user._id , isAdmin : user.isAdmin} ,config.get('jwtPrivteKey'));

    user = await user.save();
    res.header('x-auth-token', token).send({
        mass: {
         status : "successed",
         message : "your user has been register at system"
        },
        name: user.name,
        email: user.email,
    });

});
router.get('/me' , auth ,  async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
res.send(user);
});


module.exports =router;