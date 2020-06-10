const config = require('config');

module.exports = function(){
    
if(!config.get('jwtPrivteKey')){
    console.log('FAIL ERROR - in jwtPrivteKey ');
   }
   
}