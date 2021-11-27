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
const PORT = process.env.PORT || 3500;
const uuid = require('uuid').v4


// server.use(cors());
server.use(cors({origin: 'http://localhost:3500'}));
server.use(morgan("dev"));
server.use(express.json());



// const server = http.createServer(app);






// server.use(express.urlencoded({ extended: true }));
//route
server.use(authRoutes);

//middelware
// error handlers
server.use(notFound);
server.use(errorHandlers);

// >>>> configuring socket.io
const httpServer = require("http").createServer(server);
const bodyParser = require('body-parser');
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));



// const io = require("socket.io")(httpServer);

const { Server } = require("socket.io"); 
server.use(logger);
const io = new Server(httpServer, {
    cors: {
        origins: ["*"],
        handlePreflightRequest: (req,res) => {
          res.wirteHead(200,{
            "Origin": "*",
            "Methods": "GET,POST",
            "Headers": "my-custom-header",
            "Credentials": true,
            // "credentials": true
      
          });
          res.end()
        }
        }
      });

let serviceQueue = {
    liveChate: {},
    telephone: {},
    onSite: {}
}


io.on("connection", (socket) => {

    
    console.log(`>>> socket ${socket.id} connected`);

    socket.on("customerFrontEvent", (service) => {
        console.log('========', service);

        let obj = {
            time: new Date(),
            service: service,
        };
        const id = uuid();

        if (service.department === "Telephone") {
            serviceQueue.telephone[id] = obj;
            io.emit("telephoneIssue", {
                id: id,
                obj: obj,
            }
            );
        }
        if(service.department === "OnSite") {
            serviceQueue.onSite[id] = obj;
            io.emit("onSiteIssue", {
                id: id,
                obj: obj,
            });
        }
        // if (condition) {

        // }
        // else{
        //     socket.emit('systemReject',service)
        // }


    });

    socket.on('onSiteResponse', (appointment) => {
        io.emit('serverOnSiteResponse', appointment);
    });

    socket.on('getAll', (payload) => {
        console.log('getting all missed requests');
        if (payload === "Telephone") {
            Object.keys(serviceQueue.telephone).forEach((id) => {
                socket.emit("telephoneIssue", {
                    id: id,
                    payload: serviceQueue.telephone[id],
                });
            });
        } else if (payload === "OnSite") {
            Object.keys(serviceQueue.onSite).forEach((id) => {
                socket.emit("onSiteIssue", {
                    id: id,
                    payload: serviceQueue.onSite[id],
                });
            });
        }
    });

    socket.on('telephoneDeleteCase', (payload) => {
        delete serviceQueue.telephone[payload.id];
        console.log('Deleted a req');
    });

    socket.on('onSiteDeleteCase', (payload) => {
        delete serviceQueue.onSite[payload.id];
        console.log('Deleted a req');
    });
    

    socket.on('deleteAll', (payload) => {
        if (payload === "Telephone") {
            serviceQueue.telephone = {};
            console.log(serviceQueue.telephone);
            console.log('cleared!');
        } else if (payload === "OnSite") {
            serviceQueue.onSite = {};
        }
    })

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
