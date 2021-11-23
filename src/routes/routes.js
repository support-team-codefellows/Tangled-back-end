"use strict";

const express = require('express');
const authRouter=express.Router();
const {usersCollection}=require('../model/index');
const basicAuth = require('../middleware/basic');
const bearerAuth =  require('../middleware/bearer');

authRouter.post("/signup", async (req,res,next) => {
    
    try {
        const output = {

        }
        res.status(201).json(output);
    } catch (error) {
        next(error.message)
    }

});

authRouter.post("/signin",basicAuth, async (req,res,next) => {
  const user = [
    //get it for the baisc auth
    //   user:req.,
    //   token:req.,
  ]
  res.status(201).json(user);
})







