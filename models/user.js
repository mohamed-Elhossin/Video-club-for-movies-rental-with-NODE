const joi = require('@hapi/joi');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// build schema
const UserSchema = new mongoose.Schema({
  name:
  {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  email : {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },
  password : {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1500,
  },
  isAdmin : {
    type: Boolean, 
    default : false
  }
})

// convert model in database as a class called employee
const User = mongoose.model('user', UserSchema);

// validation data with @hapi/joi

function valdiate(user) {
  const schema = joi.object({
    name: joi.string().required().min(3).max(255),
    email: joi.string().required().min(11),
    password : joi.string.required()
  });
  return schema.valdiate(user)
};

exports.User = User;
exports.valdiate = valdiate;
exports.UserSchema = UserSchema;