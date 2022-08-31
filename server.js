import express from 'express'; 
import { createServer } from "http";
import { Server } from 'socket.io'
import { DateTime } from 'luxon'








const app = express(); 
const PORT = 3007
const server = createServer(app);

app.use('/', express.static('./Client'))
const io = new Server(server)




// connection - reserved keyword from io
io.on('connection', (socket) => {

    socket.emit('message', 'Hello and welcome')

    // in use for entering chat? 
    socket.broadcast.emit('message', 'Someone joined')


    // 
    socket.on('messageFromChat', (message) => {
        socket.emit('message', message)
    } )
    


    // when user leaves chat
    socket.on('disconnect', () => {
        io.sockets.emit('message', 'Someone left the chat')
    })




    

})


// api https://api.flaticon.com/v3/docs/index.html
// use some random icons 
// save api call to list 
// loop through list with math.random to get random icons 
// in chat

server.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})