'use strict';

const socket = require('socket.io-client')
const host=`http://localhost:3000/`;

const customerConnection=socket.connect(host)

setInterval(() => {
    const obj={
        customerName: "haroun",
      department: 'Telephone',
        problemDescription: 'Telephone',
     }
     customerConnection.emit('customerFrontEvent',obj)
    
},1000);
