'use strict';

const base64 = require('base-64');
// here we have to create a model 
const  {users}  = require('../model');
// valdaite the auth here 

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) { return _authError(); }
     let basic = req.headers.authorization.split(' ').pop();
     let [user, pass] = base64.decode(basic).split(':');
     usersCollection.basicAuth(user, pass).then(validUser => {
        req.user = validUser;
        next();
      }).catch(err => { next('Invalid 1Login') })
  
}

