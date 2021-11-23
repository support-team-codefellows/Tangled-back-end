'use strict'
const express = require('express');
const server=express();
const cors = require('cors');
const logger = require('../src/middleware/logger'); 
const errorHandlers = require('../src/errors/500');
const notFound = require('../src/errors/404');
const authRoutes = express.Router()
require('dotenv').config();
const PORT=process.env.PORT||3000;
server.use(express.json());
server.use(cors())
//route 
server.use(authRoutes);
//middleware
server.use(logger);
// error handlers
server.use(notFound);
server.use(errorHandlers);

function start(){
    server.listen(PORT,()=>{
        console.log(`listening  to this ${PORT}`);
    })


}
module.exports={
    server:server,
    start:start
}
