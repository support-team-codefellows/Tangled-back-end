"use strict";

const express = require('express');
const authRouter=express.Router();
const { users }=require('../model/index');
const basicAuth = require('../middleware/basic');
const bearerAuth =  require('../middleware/bearer');
const notFound =  require('../errors/404');
// Routes
authRouter.post("/signup", async (req,res,next) => {
   console.log(users);

});

authRouter.post("/signin",basicAuth, async (req,res,next) => {
  const user = [
    //get it for the baisc auth
    //   user:req.,
    //   token:req.,
  ]
  res.status(201).json(user);
})
// Home page should be replaced with the template that we have 
authRouter.get('/', (req,res) => {
  res.send('Ohayō 🤗')
})

// authRouter.get('*',notFound );

module.exports = authRouter






