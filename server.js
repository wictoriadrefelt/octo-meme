import express from 'express'; 
import { createServer } from "http";
import { Server } from 'socket.io'

import { DateTime } from 'luxon'
import { messageForm } from './utils/output.js';
import fetch from 'node-fetch';





const admin = 'Admin'
const nickname = 'wic'

const app = express(); 
const PORT = 3007
const server = createServer(app);

app.use('/', express.static('./Client'))
const io = new Server(server)




// connection - reserved keyword from io
io.on('connection', (socket) => {

    
    socket.on("join", (socketRoomData) => {
        socket.leave(socketRoomData.roomToLeave)
        socket.join(socketRoomData.roomToJoin)
  
        io.in(socketRoomData.roomToJoin).emit("welcome", `Välkommen ${nickname}`)
    })

    socket.emit('message', messageForm(admin, 'Hello and welcome'))

    // in use for entering chat? 
    socket.broadcast.emit('message', messageForm(admin, 'Someone joined'))


    // 
    socket.on('messageFromChat', (message) => {
        socket.emit('message', messageForm(admin, message))
    } )
    


    // when user leaves chat
    socket.on('disconnect', () => {
        io.sockets.emit('message',  messageForm(admin, 'Someone left the chat'))
    })




    

})



 let data = {
    apikey: '6f4847b796ec6fb80ec1d19f7b46e95088bbc272'
  } 
  
  fetch('https://api.flaticon.com/v3/app/authentication', {
    method: "POST",
    body: data,
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json()) 
  .then(json => console.log(json));





server.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
