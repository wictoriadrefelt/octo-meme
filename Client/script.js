const inputForm = document.getElementById('userNameInput')
const messageToSend = document.getElementById('answerInput')
const sendBtn = document.getElementById('sendBtn')
const socket = io() 
const sentMsg = document.getElementById('boxForChats')
const chatContainer = document.getElementById('chatContainer')

socket.on('message', (message) =>{
    console.log(message)
    messageOutput(message)
    
})

let userName= 'Sammy'
let joinedRoom = ''


sendBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    let msg = messageToSend.value
    //sentMsg.innerHTML = msg
    //console.log(msg)
    //messageOutput(msg)
    // empty field here 
    
    socket.emit('messageFromChat', msg)   
})




const messageOutput = (message) => {
    const sentMessage = document.createElement('div')
    sentMessage.classList.add('sentMsg')
    let renderMsg = document.getElementById('msg')
    // TODO add more here later, fix it tomorrow
    sentMessage.innerHTML = `${message.userName}//, ${message.text}, ${message.time}`;
    console.log(message.text)
    console.log(message.time)
    
    renderMsg.appendChild(sentMessage)
    sentMsg.appendChild(sentMessage)
}




