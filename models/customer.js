const joi = require('@hapi/joi');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// build schema
const custmoerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  phone: {
    type: String,
    required: true
  },
  isGold: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

// convert model in database as a class called employee
const Customer = mongoose.model('Customer', custmoerSchema);

// validation data with @hapi/joi

function valdiate(customer) {
  const schema = joi.object({
    name: joi.string().required().min(3).max(255),
    phone: joi.string().required().min(11),
    isGold: joi.boolean().required()
  });
  return schema.valdiate(customer)
};

exports.Customer = Customer;
exports.valdiate = valdiate;
exports.custmoerSchema = custmoerSchema;