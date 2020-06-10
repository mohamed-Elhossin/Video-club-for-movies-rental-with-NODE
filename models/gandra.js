const joi = require('@hapi/joi');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const gandraScehma = new mongoose.Schema({
name : 
{
    type:String ,
    require: true ,
}

})
// convert model in database as a class called employee
const Gandra = mongoose.model('Gandra', gandraScehma);

// validation data with @hapi/joi

function valdiate(Gandra) {
  const schema = joi.object({
    name: joi.string().required().min(3).max(255),
  });
  return schema.valdiate(Gandra)
};


exports.Gandra = Gandra;
exports.valdiate = valdiate;
exports.gandraScehma = gandraScehma ;