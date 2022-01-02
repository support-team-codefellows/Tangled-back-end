

const express = require('express');
const responseRouter = express.Router();
const response = require('../model/index')


responseRouter.get('/response', ResponseHandler)
responseRouter.get('/response/:customername', ResponseHandler)
responseRouter.post('/response', PostResponseHandler)





 async function ResponseHandler(req, res) {
  let customername = req.params.customername;
  let answer = await response.responseModel.findAll({ where: {customername:customername } })
  res.status(200).json(answer);

}




async function PostResponseHandler(req, res) {


  let body = req.body
  let answer = await response.responseCollection.create(body)
  res.status(200).json(answer)


}


module.exports = responseRouter 