const express = require('express')
const joi = require('@hapi/joi');
const router = express.Router();
const {
    Movies
} = require('../models/movies')
const {
    Customer,
    valdiate
} = require('../models/customer')
const {
    Gandra
} = require('../models/gandra')
const {
    Rental
} = require('../models/rental')
const mongoose = require('mongoose');
const Fawn = require('fawn');
require('express-async-errors'); // to heandilling intranla errors


Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rental = await Rental.find().sort('-dateOut');
    res.send(rental)
});

router.post('/', async (req, res) => {

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
        return res.status(404).send("customer not exist at system ");
    }

    const movies = await Movies.findById(req.body.movieId);
    if (!movies) {
        return res.status(404).send("movies not exist at system ");
    }

    if (movies.numberInStock == 0) return res.status(404).send("moveis not exist at system ");

    const rental = new Rental({
        customer: { // post by custmer name
            _id: customer.id,
            name: customer.name,
            phone: customer.phone
        },
        movie: { // post by movie titl
            _id: movies._id,
            title: movies.title,
            dailyRentalRate: movies.dailyRentalRate
        }
    });

    try {
        new Fawn.Task().save('rentals', rental)
            .update('movies', {
                _id: movies._id
            }, {
                $inc: {
                    numberInStock: -1
                }
            }).run();

        res.send(rental);
    } catch (ex) {
        res.status(500).send('somthing failed');
    }
});
router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
        return res.status(404).send("rental not exist at system ");
    }
    res.send(rental)
});
module.exports = router;