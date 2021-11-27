'use strict';

const socket=require("socket.io-client")
const host=`http://localhost:3000/`;
const socketConnection=socket.connect(host)

socketConnection.emit('getAll', 'OnSite');

socketConnection.on('onSiteIssue', (service)=>{
    console.log('=================================',service);
    //event on click:
    const appointment = {
        time: '12:30 pm',
        day: 'wed',
        place: 'amman'
    };
    socketConnection.emit('onSiteResponse', appointment);
    socketConnection.emit('onSiteDeleteCase',service);
});
