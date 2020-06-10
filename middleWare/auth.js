const jwt =require('jsonwebtoken');

module.exports= function(req, res , next){
const token = req.header('x-auth-token');
if(!token){
    return res.status(401).send('access denied .. no token provided');  
}

try{
    const decoded = jwt.verify(token,'jwtPrivteKey' );
    req.user = decoded;
    next();
}
catch(ex){
return res.status(400).send("invalid token");    
}

}
