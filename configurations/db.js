const winston = require("winston");
var mongoose = require('mongoose');

 module.exports = function(){ mongoose.connect('mongodb://localhost/projectTwo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => winston.info('Connected To DataBase Done'));
}