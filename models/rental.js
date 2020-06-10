const joi = require('@hapi/joi');
const mongoose = require('mongoose');
const { moviesSchema } = require('./movies');
const { custmoerSchema } = require('./customer');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const rentalSchema = new mongoose.Schema({
    customer: {
        type: custmoerSchema,
        require: true
    },
    movie: {
        type: moviesSchema,
        require: true
    },
    dataOut: {
        type: Date,
        require: true,
        default: Date.now()
    },
    dateReturned:
    {
        type: Date,
    },
    rentFee: {
        type: Number,
        min: 0
    }
})

const Rental = mongoose.model('Rental' , rentalSchema);

exports.Rental = Rental;