"use strict";
require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/routes");
const ticketsRouter = require("../src/routes/ticket.routes");
const onSiteRouter = require("../routes/onSite.routes");
const resRouter = require("../routes/response.routes.js");
const logger = require("../src/middleware/logger");
const errorHandlers = require("../src/errors/500");
const notFound = require("../src/errors/404");
const PORT = process.env.PORT || 3500;
server.use(cors());
server.use(cors({ origin: "*" }));
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//route
server.use(authRoutes);
server.use(resRouter);
server.use(ticketsRouter);
server.use(onSiteRouter);

// >>>> configuring socket.io
const httpServer = require("http").createServer(server);
const bodyParser = require("body-parser");

const { Server } = require("socket.io");
// server.use(logger);
const io = new Server(httpServer, {
  cors: {
    origins: ["*"],
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        Origin: "*",
        Methods: "GET,POST",
        Headers: "my-custom-header",
        Credentials: true,
      });
      res.end();
    },
  },
});

io.on("connection", (socket) => {
  //chat
  socket.on("joinRoom", (payload) => {
    console.log(payload);
    socket.join(payload);
    console.log("A NEW USER HAS JOINED", payload);
  });

  socket.on("sendMessage", (payload) => {
    socket.broadcast.to(payload.room).emit("receiveMessage", payload);
  });

  socket.on("disconnect", () => {
    console.log(">>> socket disconnected");
  });
});

// >>>>>
server.use(notFound);
server.use(errorHandlers);

function start() {
  httpServer.listen(PORT, () => {
    console.log(`listening  to this :🤣 ${PORT}`);
  });
}

module.exports = {
  server: server,
  start,
};
