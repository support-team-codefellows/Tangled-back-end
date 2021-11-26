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
const errorHnadlers = require('../src/errors/500')
// require('../src/events/system/system')

// const telephoneRouter=require('./events/Telephone/Telephone')
// const notFound = require('../src/errors/404')
require('dotenv').config();
const PORT=process.env.PORT||3000;

server.use(logger);
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//route 
server.use(authRoutes);
// server.use(system);
// server.use(telephoneRouter)
// server.use(telephoneSolution)
//middelware
// error handlers
server.use(notFound);
server.use(errorHandlers);

''

function start(){
    server.listen(PORT,()=>{
        console.log(`listening  to this :🤣 ${PORT}`);
    })
}






///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////





module.exports={
    server:server,
    start
}
