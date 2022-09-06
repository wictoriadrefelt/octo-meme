import express from 'express'; 
import { createServer } from "http";
import { Server } from 'socket.io'
import fetch from 'node-fetch';
import { messageForm } from './utils/output.js';
import  {joinUser, getUser }  from './utils/users.js';
import { isGeneratorFunction } from 'util/types';


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
  
      // puts out message when a user joins
      socket.broadcast.to(user.room).emit("message",messageForm(admin, 
        `${user.username} has joined the chat`)
        );
  
    });

      
    socket.on("messageFromChat", async (msg) => {
        try {
            const user = getUser(socket.id);
            
            if (msg.startsWith('/getCountry')) {
                const response = await fetch
                (`http://api.nationalize.io?name=${socket.nickname}`)
                const data = await response.json()

                if (data.name == socket.nickname) {
                    console.log(data)

                    if(!data.country[0]){
                        msg = 'This person does not live anywhere'
                        console.log(data)
                        io.to(user.room).emit("message", messageForm(user.username, msg));
                        console.log('hej')
                   

                } else
                    console.log(data.country[0].country_id)
                    msg = (`is with 
                    ${data.country[0].probability} 
                    % chance from ${data.country[0].country_id}`)
                    io.to(user.room).emit("message", messageForm
                    (socket.nickname, msg));  
               
                  
                
                }
               
                
            } else {
                console.log(user)
                io.to(user.room).emit("message", messageForm(user.username, msg));
    
            }
            }
         catch (error) {
            console.log(error, 'Something went wrong');

    }});
  
    
    socket.on('disconnect', () => {
      
        io.emit('message',  messageForm(admin, `Someone has left the chat`))
    })
})
 
 


server.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
