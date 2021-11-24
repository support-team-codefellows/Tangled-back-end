'use strict'

const io =require('socket.io')(3500)


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
    console.log(service);



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


// ff.listen(3000);
module.exports={
    system,
}
