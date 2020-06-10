const joi = require('@hapi/joi');
const mongoose = require('mongoose');
const   {gandraScehma}   = require('./gandra')
const AutoIncrement = require('mongoose-sequence')(mongoose);

// build schema
const moviesSchema = new mongoose.Schema({
  title:
  {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  gendra : 
  {
    type: gandraScehma,
    required:true
  }, 
  numberInStock: {
    type: Number,
    require : true,
    min : 0 ,
    max:255
  },
  dailyRentalRate: {
    type: Number,
require:true,
min:0,
max : 255
}
})

// convert model in database as a class called employee
const Movies = mongoose.model('Movies', moviesSchema);

// validation data with @hapi/joi

function valdiate(Movies) {
  const schema = joi.object({
    title: joi.string().required().min(3).max(255),
    gandra: joi.objectId().required().min(11),
  });
  return schema.valdiate(Movies)
};

exports.Movies = Movies;
exports.valdiate = valdiate;
exports.moviesSchema = moviesSchema ;