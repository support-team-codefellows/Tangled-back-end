const express = require('express');
const onSiteRouter=express.Router();
const onsite=require('../model/index')


onSiteRouter.get('/onSiteTicket', onSiteHandler)
onSiteRouter.get('/onSiteTicket/:id', onSiteHandler)
onSiteRouter.post('/onSiteTicket', PostOnSiteHandler)
onSiteRouter.delete('/onSiteTicket/:id', deleteOnSiteHandler)
onSiteRouter.put('/onSiteTicket/:id', updateOnSiteHandler)






async function onSiteHandler(req,res){

  let id=req.params.id;
  let answer= await onsite.OnsiteTicketCollection.get(id)
  res.status(200).json(answer)

}




async function PostOnSiteHandler(req,res){

  
  let body=req.body
  let answer= await onsite.OnsiteTicketCollection.create(body)
  res.status(200).json(answer)


}
async function deleteOnSiteHandler(req,res) {
let id=req.params.id
await onsite.OnsiteTicketCollection.delete(id)
    res.status(204).send("the item is deleted")
}


async function updateOnSiteHandler(req,res) {
    let obj=req.body
    let id=req.params.id

    let updatedItem= await onsite.OnsiteTicketCollection.update(id,obj)
    res.status(201).json(updatedItem)
    
}
module.exports = onSiteRouter 
  