const express = require('express')
const app = express();
const winston = require('winston')

require('./configurations/config')();
require('./configurations/db')();
require('./configurations/middleware')();
require('./configurations/logging')();
require('./configurations/routes')(app);


app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 3000);
  res.render('error');
});
const port = process.env.PORT || 3000;
app.listen(3000, () => winston.info(`listen port number ${port}....`))
module.exports = app;