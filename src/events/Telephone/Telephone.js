'use strict'
// const express=require('express')
const express=require('express')
const telephoneRouter=express.Router()

const socket=require("socket.io-client")
const host=`http://localhost:3000/system`;



const socketConnection=socket.connect(host)

socketConnection.on('telephoneIssue', (service)=>{

    telephoneRouter.post('/telephoneNewCase',(req,res)=>{

        res.status(200).send(service)

    })

}

)

module.exports=telephoneRouter





