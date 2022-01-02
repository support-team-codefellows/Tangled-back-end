

const express = require('express');
const responseRouter = express.Router();
const response = require('../model/index')


responseRouter.get('/response', ResponseHandler)
responseRouter.get('/response/:username', ResponseHandler)
responseRouter.post('/response', PostResponseHandler)





 async function ResponseHandler(req, res) {
  let customerName = req.params.customerName;
  let answer = await response.responseModel.findAll({ where: {customerName:customerName } })
  res.status(200).json(answer);

}




async function PostResponseHandler(req, res) {


  let body = req.body
  let answer = await response.responseCollection.create(body)
  res.status(200).json(answer)


}


module.exports = responseRouter 