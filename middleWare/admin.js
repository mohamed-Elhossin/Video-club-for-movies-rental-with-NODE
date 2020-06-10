const jwt =require('jsonwebtoken');

module.exports= function(req, res , next){
   if (!req.user.isAdmin)
       return res.status(301).send('access denied 403');
      next();    
}