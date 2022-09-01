const inputForm = document.getElementById('userNameInput')
const messageToSend = document.getElementById('answerInput')
const sendBtn = document.getElementById('sendBtn')
const socket = io() 
const sentMsg = document.getElementById('boxForChats')
const chatContainer = document.getElementById('chatContainer')
const userName = document.querySelector('#input')
const userNameBtn = document.getElementById('userNameBtn')

socket.on('message', (message) =>{
    console.log(message)
   // messageOutput(message)
    
})







//let userName= 'Sammy'

let joinedRoom = ''

/* 
// get value from input field 
sendBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    let msg = messageToSend.value
    //sentMsg.innerHTML = msg
    //console.log(msg)
    //messageOutput(msg)
    // empty field here 
    
    socket.emit('messageFromChat', msg)   
    messageToSend.value = " ";
})
 */


userNameBtn.addEventListener('click', (e) => {
    // prevents the default behaviour when submitting a form
    e.preventDefault(); 

    // get message text from input
    const user = userName.value
    console.log(user)
    
   userName.value = ' '
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




