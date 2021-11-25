'use strict';

const socket = require('socket.io-client')
const host=`http://localhost:3000/mainIo`;

const customerConnection=socket.connect(host);

setInterval(() => {
    const obj={
        customerName: "haroun",
      department: 'OnSite',
        problemDescription: 'Telephone',
     }
     console.log(obj);
     customerConnection.emit('customerFrontEvent',obj)
    
},5000);

customerConnection.on('serverOnSiteResponse', (appointment) => {
    console.log('><<<<<<<>>>><<<<<<<<', appointment);
});