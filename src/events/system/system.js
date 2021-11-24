'use strict'
const server=require('../../server')

// const {start}=require('../../server')

const io=require('socket.io')(server.start)
const telephoneRouter=require('../Telephone/Telephone')
// app.set('socketio', io);


const system=io.of('/system')
const uuid=require('uuid').v4

let serviceQueue={

liveChate:{},
telephone:{},
onSite:{}


}

system.on('connection', (socket)=>{

    console.log(`${socket.id} connected to the system `);

socket.on('customerFrontEvent',(service)=>{



let obj={
    time:new Date(),
    service: service,
   
}
const id= uuid()

// console.log('id',id);

    if (service.department==='Telephone') {

        serviceQueue.telephone[id]=obj
        system.emit('telephoneIssue',

        {
            id:id,
            obj:obj
        }
        )
        
    }
    // if (condition) {
        
    // }
    // if (condition) {
        
    // }
    // else{
    //     socket.emit('systemReject',service)
    // }


    
}
)



})



module.exports={
    system,
    telephoneRouter


}