const express = require('express')
const joi = require('@hapi/joi');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const {User} = require('../models/user');
const config = require('config');
require('express-async-errors');
router.post('/', async (req, res) => {
    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(404).send("invalid email |or| password");
    const validpass = await bcrypt.compare(req.body.password, user.password)
    if (!validpass) return res.status(404).send("invalid email |or| password");

const token = jwt.sign({_id : user._id ,isAdmin : user.isAdmin} ,config.get('jwtPrivteKey'));

res.header('x-auth-token', token).send({
        status: {
            succesed: true,
            message: "this user is match user"
        },
        user,
        token
    })
});
 

module.exports = router;