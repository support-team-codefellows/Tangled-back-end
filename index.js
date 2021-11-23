'use strict';


const server=require('./src/server')
const {db}=require('./src/model/index')
require('dotenv').config()

db.sync().then(()=>{

server.start();


}).catch(console.error())


