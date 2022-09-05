import express from 'express'; 
import { createServer } from "http";
import { Server } from 'socket.io'

import { DateTime } from 'luxon'
import { messageForm } from './utils/output.js';





const admin = 'Admin'


const app = express(); 
const PORT = 3007
const server = createServer(app);

app.use('/', express.static('./Client'))
const io = new Server(server)




// connection - reserved keyword from io
io.on('connection', (socket) => {

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



app.get("/api/", async (req, res) => {
    try {
      const response = await fetch('http://api.nationalize.io?name=fredrik')
      const data = await response.json()
      res.json(data)
    } catch (err) {
      console.error(err)
      res.json(err)
    }
  }
  )


/* var headers = {
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
  }) 


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
 */
  

// api https://api.flaticon.com/v3/docs/index.html
// use some random icons 
// save api call to list 
// loop through list with math.random to get random icons 
// in chat

server.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})
