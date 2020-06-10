const express = require('express')
const joi = require('@hapi/joi');
const router = express.Router();
require('express-async-errors');

const {
    Movies,
    valdiate
} = require('../models/movies');
const {
    Gandra
} = require('../models/gandra');


router.get('/', async (req, res) => {
    const movie = await Movies.find();
    res.send(movie)
});

router.post('/', async (req, res) => {
    // const {error} =valdiate(req.body);
    //    if(error) return res.status(404).send(error.details[0].message);
    const gendra = await Gandra.findById(req.body.gendra);
    if (!gendra) {
        return res.status(404).send("gendra not exist at system ");
    }
    let movie = new Movies({
        title: req.body.title,
        gendra: {
            _id: gendra._id,
            name: gendra.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    movie = await movie.save();
    res.send(movie);
});

router.put('/:id', async (req, res) => {
    // const {error} =valdiate(req.body);
    // if(error) return res.status(404).send(error.details[0].message);

    let movie = await Movies.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {
        new: true
    })
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    let movie = await Movies.findByIdAndRemove(req.params.id);
    if (!movie) {
        res.status(404).send('sorry this movie not found')
    }
    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movies.findById(req.params.id);
    if (!movie) {
        return res.status(404).send("movie not exist at system ");
    }
    res.send(movie)
});

module.exports = router;