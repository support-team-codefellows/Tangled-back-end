'use strict'
const express=require('express')
const app=express();
const socket=require("socket.io-client")
const host=`http://localhost:3500/system`;

const socketConnection=socket.connect(host)

socketConnection.on('telephoneIssue', (service)=>{

    app.post('/telephoneSolution',telephoneSolution)

}

)

function telephoneSolution(req,res) {

    let obj= 'fixed'
    

    res.status(201).send(obj)

    
}



module.exports={telephoneSolution}