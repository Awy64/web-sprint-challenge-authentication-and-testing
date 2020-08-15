const router = require('express').Router();
const Users = require('./user-model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { isValid } = require('./user-services');
const secrets = require('../config/secrets');


router.post('/register', async (req, res) => {
  // implement registration
  const user = req.body
  if(isValid(user)){
    const hash = bcrypt.hashSync(user.password, 11)
    user.password = hash
    try {
      const added = await Users.add(user)
      const token = genarateToken(added)
      res.status(201).json({message: `Welcome ${user.username}`, token: token})
    } catch (error) {
      res.status(500).json({err: error})
    }
  }else{
    res.status(400).json({
      message: "please provide a username and password."
    })
  }
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body
  if(isValid(req.body)){
    const [user] = await Users.findBy({username: username})
    try {
      if(user && bcrypt.compareSync(password, user.password)){
        const token = genarateToken(user)
        res.json({message: "logged in", token})
      }else{
        res.status(401).json({message: "invalid username and or password"})
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }else{
    res.status(400).json({
      message: 'please provide a username and password.'
    })
  }
});


function genarateToken(user){
  const payload = {
    sub: user.id,
    username: user.username
  }
  const secret = secrets.jwtSecrets
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, secret, options)
}


module.exports = router;
