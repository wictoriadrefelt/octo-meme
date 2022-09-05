import { typeSound } from "./sound/sound.js"




/* const socket = io() 
let userInput = document.getElementById('username').value

socket.on('message', (message) =>{
    console.log(message)
    messageOutput(message)
    
}) */


// Plays sound when typing
document.addEventListener('keydown', function(e) {
      typeSound();

  });


  const getDateAndTime = () => {

    
  let currentDate = new Date();
  currentDate = currentDate.toDateString()
  console.log(currentDate)
  let currentTime = new Date(); 
  currentTime = currentTime.toLocaleTimeString("en-US",
  {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById('date').innerHTML = ''
  document.getElementById('date').innerHTML = currentDate
  console.log(currentTime)

  document.getElementById('time').innerHTML = ''
  document.getElementById('time').innerHTML = currentTime
    
  }	

  function playSound () {
	let ding = new Audio('./sound/background.wav');
    ding.muted = true;
	ding.play();
}


const message =  `<h2>CODE@CHAT</h2>
<span>----------------------------------</span> </br> 
<h2>CON_NAME</h2>
<span>----------------------------------</span></br>
<h2>REVOLUTONARY WAY TO COMMUNICATE ONLINE</h2>
<span>----------------------------------</span></br>
<h2>BEEP BOOP, BEEP BOOP, COMPUTER STUFF</h2>
<span>----------------------------------</span></br>
<h2>INPUT USERNAME TO ENTER</h2>
<h2>`


const typingPromises = (message, timeout) =>
  [...message].map(
    (ch, i) =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(message.substring(0, i + 1));
        }, timeout * i);
      })
  );

typingPromises(message, 140).forEach(promise => {
  promise.then(portion => {
    document.querySelector('.output').innerHTML = portion;
  });
});




getDateAndTime()


window.addEventListener('load', () => {
    //playSound();
  
    typingPromises(message)
    
})










