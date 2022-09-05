import express from 'express'; 
import { createServer } from "http";
import { Server } from 'socket.io'
import fetch from 'node-fetch';
import { DateTime } from 'luxon';
import { messageForm } from './utils/output.js';
import  {joinUser, getUser }  from './utils/users.js';





const admin = 'Admin'


const app = express(); 
const PORT = 3007
const server = createServer(app);

app.use('/', express.static('./Client'))
const io = new Server(server)

   
io.on("connection", (socket) => {
    
    socket.on("joinRoom", ({ username, room }) => {
      const user = joinUser(socket.id, username, room);
    socket.nickname = username
      socket.join(user.room);
  
      // welcome message 
      socket.emit("message", messageForm(admin, "Run Terminal Chat"));
  
      // puts out message when a user joins a room 
      socket.broadcast.to(user.room).emit("message",messageForm(admin, `${user.username} has joined the chat`)
        );
  
    });

      
    socket.on("messageFromChat", async (msg) => {
        try {
            const user = getUser(socket.id);
            /* const response = await fetch(`http://api.nationalize.io?name=Fredrik`)
            const data = await response.json()
            response.json(data) */
            
            if (msg.includes('/')) {
                const response = await fetch(`http://api.nationalize.io?name=${socket.nickname}`)
                const data = await response.json()
                if (data.name == socket.nickname) {
                    console.log('dubbla bananer');
                    msg = 'but didnt write a message'
                    io.to(user.room).emit("message", messageForm(`${socket.nickname}// is with ${data.country[0].probability}/1 probability from ${data.country[0].country_id}`, msg));        
                }
            } else {
                console.log(user)
                io.to(user.room).emit("message", messageForm(user.username, msg));
    
            }
            }
         catch (error) {
            console.log('NOPE');

    }});
  
    
    socket.on('disconnect', () => {
        //let user = getUser(socket.id)
        //io.emit('message',  messageForm(admin, `${user.username} has left the chat`))
    })
})
 
 



/* app.get("/api/", async (req, res) => {
    try {
      const response = await fetch('http://api.nationalize.io?name=fredrik')
      const data = await response.json()
      res.json(data)
    } catch (err) {
      console.error(err)
      res.json(err)
    }
  }
  ) */

  

// api https://api.flaticon.com/v3/docs/index.html
// use some random icons 
// save api call to list 
// loop through list with math.random to get random icons 
// in chat

server.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
