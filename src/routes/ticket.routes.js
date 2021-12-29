const express = require('express');
const ticketsRouter=express.Router();
const tickets=require('../model/index')


ticketsRouter.get('/telephoneTicket', telephoneHandeler)
ticketsRouter.get('/telephoneTicket/:id', telephoneHandeler)
ticketsRouter.post('/telephoneTicket', PostTelephoneHandeler)
// ticketsRouter.get('/onSiteTelephone', FAQSHAndeler)



async function telephoneHandeler(req,res){

  let id=req.params.id;
  let answer= await tickets.ticketCollection.get(id)
  res.status(200).json(answer)

}




async function PostTelephoneHandeler(req,res){

  
  let body=req.body
  let answer= await tickets.ticketCollection.create(body)
  res.status(200).json(answer)


}


module.exports = ticketsRouter 
  