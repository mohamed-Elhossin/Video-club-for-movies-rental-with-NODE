var usersRouter = require('../routes/users');
var custmer = require('../routes/custmer');
var gendra = require('../routes/gendra');
var movies = require('../routes/movie');
var rental = require('../routes/rental')
var auth = require('../routes/auth')
var express = require('express');
var error = require('../middleWare/errors');

var app = express();
var cros = require('cors')
var createError = require('http-errors');



module.exports = function(app){
app.use('/users', usersRouter);
app.use('/customer', custmer);
app.use('/gendra', gendra);
app.use('/movies', movies);
app.use('/rental', rental);
app.use('/auth', auth);
app.use(error);
app.use(function (req, res, next) {
    next(createError(404));
  });

}