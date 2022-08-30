import express from 'express'; 
import { createServer } from "http";
import { Server } from 'socket.io'
import {formatMessage} from './utils/messages.js'




const nameOfBot = 'Admin'



const app = express(); 
const PORT = 3006
const server = createServer(app);

const io = new Server(server)


// api https://api.flaticon.com/v3/docs/index.html


server.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`)
})