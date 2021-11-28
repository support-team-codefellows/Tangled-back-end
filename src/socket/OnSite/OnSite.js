'use strict';

const socket=require("socket.io-client")
const host=`http://localhost:3000/`;
const socketConnection=socket.connect(host)

socketConnection.emit('getAll', 'OnSite');

socketConnection.on('onSiteIssue', (service)=>{
    console.log('=================================',service);
    let hours = ['08:00am', '09:00am', '10:00am', '11:00am', '12:00pm', '01:00pm', '02:00pm', '03:00pm'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    let location = ['Amman', 'Aqaba'];
    //event on click:
    const appointment = {
        time: '12:30 pm',
        day: 'wed',
        place: 'amman'
    };
    socketConnection.emit('onSiteResponse', appointment);
    socketConnection.emit('onSiteDeleteCase',service);
});
