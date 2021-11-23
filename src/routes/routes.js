"use strict";

const express = require('express');
const authRouter=express.Router();
const  users =require('../model/index');
const basicAuth = require('../middleware/basic');
const bearerAuth =  require('../middleware/bearer');
const notFound =  require('../errors/404');
// Routes
authRouter.post("/signup", async (req,res,next) => {
    console.log(users);
    try {
      let userRecord = await users.Users.create(req.body);
      const output = {
        user: userRecord,
        token: userRecord.token
      };
        res.status(201).json(output);
    } catch (error) {
        next(error.message)
    }

});

authRouter.post("/sign-in",basicAuth, async (req,res,next) => {


  res.status(200).json(user);

})
// Home page should be replaced with the template that we have 
authRouter.get('/', (req,res) => {
  res.send('Ohayō 🤗')
})

// authRouter.get('*',notFound );

module.exports = authRouter






