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
  
      socket.join(user.room);
  
      // welcome message 
      socket.emit("message", messageForm(admin, "Run Terminal Chat"));
  
      // puts out message when a user joins a room 
      socket.broadcast.to(user.room).emit("message",messageForm(admin, `${user.username} has joined the chat`)
        );
  
    });
 
    socket.on("messageFromChat", (msg) => {
      const user = getUser(socket.id);
        console.log(user)
      io.to(user.room).emit("message", messageForm(user.username, msg));
    });
  
    
    socket.on('disconnect', () => {
        //let user = getUser(socket.id)
        //io.emit('message',  messageForm(admin, `${user.username} has left the chat`))
    })
})


var headers = {
    'Content-Type':'multipart/form-data',
    'Accept':'application/json'
  
  };
  
  app.post('/api', async (req, res) => {
    try {
        let response = await fetch('https://api.flaticon.com/v3/app/authentication', {
            headers: {  
                'Content-Type':'multipart/form-data',  
                'Accept':'application/json',
                'Authentication': 'e3d45cf71bb2d64731644bf2a61a3a8be9755818'     
            },       
        })
        //console.log(response);
        let object = req.body
        console.log(object);
        res.json('Smultron')

           /*  const data = await response.json()
            console.log(data);
            res.json(data)
             */
        
    } catch (err) {
        console.error(err)
      res.json(err)
    }
}
  )
    /* {
     
        headers: headers,
        success: function(data) {
        console.log(JSON.stringify(data));
    } 
  }) */


app.get("/api/", async (req, res) => {
    try {
        let response = await fetch('https://api.flaticon.com/v3/app/authentication', {   
            headers: {
                Authentication: 'e3d45cf71bb2d64731644bf2a61a3a8be9755818'   
            } 
        });
        console.log(response);
            const data = await response.json()
            console.log(data);
            res.json(data)
            
    } catch (err) {
      console.error(err)
      res.json(err)
    }
  }
  )

  

// api https://api.flaticon.com/v3/docs/index.html
// use some random icons 
// save api call to list 
// loop through list with math.random to get random icons 
// in chat

server.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
