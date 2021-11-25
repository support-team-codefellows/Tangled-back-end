'use strict'
// const express=require('express')
// const express=require('express')
// const telephoneRouter=express.Router()

const socket=require("socket.io-client")
const host=`http://localhost:3000/mainIo`;
const socketConnection=socket.connect(host)

socketConnection.emit('getAll','Telephone')


socketConnection.on('telephoneIssue', (service)=>{

    console.log('=================================',service);



    // socketConnection.emit('telephoneDeleteCase',service)
    
}

)

