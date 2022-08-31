

const inputForm = document.getElementById('userNameInput')

const socket = io() 


socket.on('message', (message) =>{
    console.log(message)
})





