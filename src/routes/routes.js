"use strict";

const express = require('express');
const authRouter = express.Router();
const users = require('../model/index');
const basicAuth = require('../middleware/basic');
const bearerAuth = require('../middleware/bearer');
const permissions = require('../middleware/acl.js')
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

authRouter.post("/sign-in", basicAuth, async (req, res, next) => {
  res.status(200).json(req.user);

})
authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const userRecords = await users.Users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
});

// Home page should be replaced with the template that we have 
authRouter.get('/', (req, res) => {
  res.send('Ohayō 🤗')
})

// authRouter.get('*',notFound );

module.exports = authRouter






