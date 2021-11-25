"use strict";
require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/routes");
const logger = require("../src/middleware/logger");
const errorHandlers = require("../src/errors/500");
const notFound = require("../src/errors/404");
const errorHnadlers = require("../src/errors/500");
// const notFound = require('../src/errors/404')
const PORT = process.env.PORT || 3000;
const uuid=require('uuid').v4

server.use(logger);
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.use(express.urlencoded({ extended: true }));
//route
server.use(authRoutes);

server.setMaxListeners(20)


//middelware
// error handlers
server.use(notFound);
server.use(errorHandlers);

// >>>> configuring socket.io
const httpServer = require("http").createServer(server);
const io = require("socket.io")(httpServer);
const mainIo=io.of('/mainIo')

let serviceQueue={

    liveChate:{},
    telephone:{id :'service'},
    onSite:{}
    
    
    }
    

    mainIo.on("connection", (socket) => {

  console.log(`>>> socket ${socket.id} connected`);


  
  socket.on("customerFrontEvent", (service) => {
    console.log('========',service);
  
    let obj = {
      time: new Date(),
      service: service,
    };
    const id = uuid();
  
    if (service.department === "Telephone") {
      serviceQueue.telephone[id] = obj;
     
    
      mainIo.emit("telephoneIssue", {
          id: id,
          obj: obj,
        }
      );
    }
    // if (condition) {
  
    // }
    // if (condition) {
  
    // }
    // else{
    //     socket.emit('systemReject',service)
    // }

    
    socket.on("getAll", (payload) => {
        console.log('dsfsdfsfsdfsdfsdfsdfdfkgdgdfgdfgdfgdfgdgfgd');


        if (payload === "Telephone") {
          Object.keys(serviceQueue.telephone).forEach((id) => {
            socket.emit("telephoneIssue", {
              id: id,
              payload: serviceQueue.telephone[id],
            });
          });
        } 
      });




    
    // socket.on('telephoneDeleteCase',(payload)=>{
    //     // console.log('serviceQueue.telephone[payload.id];',serviceQueue.telephone[payload.id]);
       

    //     delete serviceQueue.telephone[payload.id];
    // })




  });






});


// >>>>>

function start() {
  httpServer.listen(PORT, () => {
    console.log(`listening  to this :🤣 ${PORT}`);
  });
}

module.exports = {
  server: server,
  start,
};
