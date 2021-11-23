'use strict';
//  get the user model 
 const { usersCollection } = require('../model/index')

module.exports = async (req, res, next) => {

  try {
if (!req.headers.authorization) {authError();}
const oken = req.headers.authorization.split(' ').pop();
const validUser=await usersCollection.authToken(token);
req.user = validUser;
req.token = validUser.token;
  
     next();

  } 
  
  catch (e) {
    next('Invalid login');
  }

  }