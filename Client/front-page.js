const socket = io() 
let userInput = document.getElementById('username').value

socket.on('message', (message) =>{
    console.log(message)
    messageOutput(message)
    
})



console.log(userInput)








