'use strict';

const bas64 = require('base-64');
// here we have to create a model 
const  {usersCollection}  = require('../model/index');
// valdaite the auth here 

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) { return _authError(); }
     let basic = req.headers.authorization.split(' ').pop();
     let [user, pass] = base64.decode(basic).split(':');
     usersCollection.basicAuth(username, password).then(validUser => {
        req.user = validUser;
        next();
      }).catch(err => { next('Invalid 1Login') })
  
}

