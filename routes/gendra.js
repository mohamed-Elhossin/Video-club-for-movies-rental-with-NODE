const express = require('express')
const router = express.Router();
const auth =require('../middleWare/auth')
require('express-async-errors');

const {
    Gandra,
    valdiate
} = require('../models/gandra')
const mongoose = require('mongoose');

router.get('/',auth, async (req, res) => {
    const gandra = await Gandra.find();
    res.send(gandra)
});

router.post('/',  async (req, res) => {
    // const {error} =valdiate(req.body);
    //    if(error) return res.status(404).send(error.details[0].message);

    let gendra = new Gandra({
        name: req.body.name
    })

    await gendra.save();
    res.send(gendra);

});

router.put('/:id', async (req, res) => {
    // const {error} =valdiate(req.body);
    // if(error) return res.status(404).send(error.details[0].message);
    let gandra = await Gandra.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
    }, {
        new: true
    });
    if (!gandra) {
        return res.status(404).send("gandra not exist at system ");
    }

    res.send(gandra);
});

router.delete('/:id', async (req, res) => {
    let gandra = await Gandra.findByIdAndRemove(req.params.id);
    if (!gandra) {
        res.status(404).send('sorry this product not found')
    }
    res.send(gandra);
});

router.get('/:id', async (req, res) => {
    const gandra = await Gandra.findById(req.params.id);
    if (!gandra) {
        return res.status(404).send("gandra not exist at system ");
    }
    res.send(gandra)
});

module.exports = router;