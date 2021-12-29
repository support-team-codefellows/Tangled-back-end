const express = require('express');
const ticketsRouter=express.Router();
const tickets=require('../model/index')


ticketsRouter.get('/telephoneTicket', telephoneHandler)
ticketsRouter.get('/telephoneTicket/:id', telephoneHandler)
ticketsRouter.post('/telephoneTicket', PostTelephoneHandler)
ticketsRouter.delete('/telephoneTicket/:id', deleteTelephoneHandler)
ticketsRouter.put('/telephoneTicket/:id', updateTelephoneHandler)
// ticketsRouter.get('/onSiteTelephone', FAQSHAndeler)



async function telephoneHandler(req,res){

  let id=req.params.id;
  let answer= await tickets.ticketCollection.get(id)
  res.status(200).json(answer)

}




async function PostTelephoneHandler(req,res){

  
  let body=req.body
  let answer= await tickets.ticketCollection.create(body)
  res.status(200).json(answer)


}
async function deleteTelephoneHandler(req,res) {
let id=req.params.id
await tickets.ticketCollection.delete(id)
    res.status(204).send("the item is deleted")
}


async function updateTelephoneHandler(req,res) {
    let obj=req.body
    let id=req.params.id

    let updatedItem= await tickets.ticketCollection.update(id,obj)
    res.status(201).json(updatedItem)
    
}

module.exports = ticketsRouter 
  