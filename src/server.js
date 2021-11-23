'use strict'
const express = require('express');
const server=express();
const cors = require('cors');
const logger = require('../src/middleware/logger'); 
const errorHnadlers = require('../src/errors/500')
const telephoneSolution=require('../src/events/Telephone')
const notFound = require('../src/errors/404')
require('dotenv').config();
const PORT=process.env.PORT||3000;
server.use(express.json());
server.use(cors())
//route 
// server.use(authRoutes);
// server.use(telephoneSolution)
//middelware
server.use(logger);
// error handlers
server.use(notFound);
server.use(errorHnadlers);

function start(){
    server.listen(PORT,()=>{
        console.log(`Listning to this ${PORT}`);
    })


}
module.exports={
    server:server,
    start:start
}
