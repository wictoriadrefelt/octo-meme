var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = "100%";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

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


socket.on("rooms", (rooms) => {
    console.log(rooms)
})


sendBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    let msg = messageToSend.value
    if(!msg){
        return false
    }
    
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



