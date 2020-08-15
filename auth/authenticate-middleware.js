/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');


module.exports = (req, res, next) => {
  const {authorization} = req.headers;

  if(authorization){
    jwt.verify(authorization, secrets.jwtSecrets, (err, validToken) => {
      if(err){
        res.status(401).json({error: "invalid token"});
      }else{
        req.token = validToken;
        next()
      }
    })
  }else{
    res.status(404).json({error: "you shall not pass"})
  }

};
