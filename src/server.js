'use strict'
require('dotenv').config();
const express = require('express');
const server=express();
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/routes');
const logger = require('../src/middleware/logger'); 
const errorHandlers = require('../src/errors/500');
const notFound = require('../src/errors/404');
const PORT=process.env.PORT||3000;
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//route 
//middleware
server.use(authRoutes);
server.use(logger);
// error handlers
server.use(notFound);
server.use(errorHandlers);

function start(){
    server.listen(PORT,()=>{
        console.log(`listening  to this :🤣 ${PORT}`);
    })


}
module.exports={
    server:server,
    start:start
}
