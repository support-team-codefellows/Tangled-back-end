'use strict'
require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/routes');
const logger = require('../src/middleware/logger'); 
const errorHandlers = require('../src/errors/500');
const notFound = require('../src/errors/404');
const errorHnadlers = require('../src/errors/500')
// const notFound = require('../src/errors/404')
const PORT=process.env.PORT||3000;

server.use(logger);
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//route 
server.use(authRoutes);

//middelware
// error handlers
server.use(notFound);
server.use(errorHandlers);

// >>>> configuring socket.io
const httpServer = require('http').createServer(server);
const io = require('socket.io')(httpServer);
io.on('connection', (socket) => {
    console.log(`>>> socket ${socket.id} connected`);
});
io.on('customerFrontEvent', (payload) => {
    console.log(payload);
})

// >>>>>

function start(){
    httpServer.listen(PORT,()=>{
        console.log(`listening  to this :🤣 ${PORT}`);
    })
}

module.exports={
    server:server,
    start,
}
