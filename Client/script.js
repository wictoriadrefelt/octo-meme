


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
let roomContainer = document.getElementById('room')
let msgContainer = document.getElementById
let answerFromApi = undefined

socket.on('message', (message) =>{
    console.log(message)
    messageOutput(message)
    
})


// gets current url
let currentURL = document.location.href

let room = 'startRoom'
// gets username from params in url. 
let objUrlParams = new URLSearchParams(window.location.search);
let username = objUrlParams.get('username'); 
console.log(username)


socket.emit('joinRoom', { username, room });

sendBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    let msg = messageToSend.value
    //sentMsg.innerHTML = msg
    //console.log(msg)
    //messageOutput(msg)
    // empty field here 

    socket.emit('messageFromChat', msg)   
    console.log(msg)
})


const messageOutput = (message) => {

    const sentMessage = document.createElement('div')
    sentMessage.classList.add('sentMsg')
    // TODO add more here later, fix it tomorrow   
    
    sentMessage.innerHTML = `<h3 class="sender">${message.userName} <h3 id="msg class="numbers"> ${message.text} <h6 id="timestamp"> ${message.time}`

    console.log(message.text)
    console.log(message.time)

    sentMsg.appendChild(sentMessage)
}

/* document.getElementById('addRoomBtn').addEventListener('click', () => {
    console.log('room');
    let room = document.getElementById('roomInput').value
    socket.emit('join', {roomToJoin: room})
    joinedRoom = room
    console.log(joinedRoom);
    let roomInList = document.createElement('h3')
    //roomInList.classList.add('text')
    roomInList.innerText = joinedRoom

    roomContainer.append(roomInList)    
}) */


const getAnswerfromApi = () => {
    fetch("http://localhost:3007/api/").then((res) => {
        console.log(res)
        return res.json()
    }).then((data) => {
        answerFromApi = data
        //renderApiAnswer()
    }).catch((err) => {
        console.error('Fel i API', err)
    })
}

function renderApiAnswer() {
    //let nationalityToRender = document.createElement('div')
    let nationalityToRender = document.getElementById('msg')
    nationalityToRender.innerHTML = ''
    nationalityToRender.innerHTML = answerFromApi.country[0].country_id


}


/* // Plays sound when typing
document.addEventListener('keydown', function(e) {
    typeSound();

});
 */
