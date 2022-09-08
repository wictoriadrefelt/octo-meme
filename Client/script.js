
const inputForm = document.getElementById('userNameInput')
const messageToSend = document.getElementById('answerInput')
const sendBtn = document.getElementById('sendBtn')
const socket = io()
const sentMsg = document.getElementById('boxForChats')
const chatContainer = document.getElementById('chatContainer')
let roomContainer = document.getElementById('room')
let msgContainer = document.getElementById
let answerFromApi = undefined

socket.on('message', (message) => {
    messageOutput(message)
})

let answerInput = document.getElementById('answerInput')

const onInput = (event) => {

    if (event.target.value.startsWith('/')) {
        let getCountry = document.getElementById('getApibtn')
        getCountry.innerText = '/getCountry'
    }
}
document.getElementById("answerInput").addEventListener("input", onInput)


// gets current url
let currentURL = document.location.href

let room = 'startRoom'
// gets username from params in url. 
let objUrlParams = new URLSearchParams(window.location.search);
let username = objUrlParams.get('username');


socket.emit('joinRoom', { username, room });

sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let msg = messageToSend.value
    socket.emit('messageFromChat', msg)
    messageToSend.value = ""
})


const messageOutput = (message) => {

    const sentMessage = document.createElement('div')
    sentMessage.classList.add('sentMsg')
    sentMessage.innerHTML = `<h3 class="sender">${message.userName} <h3 id="msg" class="numbers"> ${message.text} <h6 id="timestamp"> ${message.time}`
    sentMsg.appendChild(sentMessage)
}


const getAnswerfromApi = () => {
    fetch("http://localhost:3007/api/").then((res) => {
        return res.json()
    }).then((data) => {
        answerFromApi = data
    }).catch((err) => {
        console.error('Fel i API', err)
    })
}

function renderApiAnswer() {
    let nationalityToRender = document.getElementById('msg')
    nationalityToRender.innerHTML = ''
    nationalityToRender.innerHTML = answerFromApi.country[0].country_id
}


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





