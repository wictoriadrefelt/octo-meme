
/* const socket = io() 
let userInput = document.getElementById('username').value

socket.on('message', (message) =>{
    console.log(message)
    messageOutput(message)
    
}) */





  // displays time on start-screen
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
	let background = new Audio('./sound/background.wav');
	//let background = new Audio('./sound/background2.wav');
   background.autoplay = true; 
	background.play();
} 





const message =  `<h2>SET UP CHAT</h2>
 </br> 
<h2>LOADING . . . . . . . . . . . . . . . . .</h2>
<h2>. . . . . . . . . .</h2>
<h2>. . . . . . .</h2>
<h2>. .</h2>
<h2>OK</h2>
<h2>USER AUTHENTICATION</h2>
<h2>INPUT USERNAME TO ENTER</h2>
<h2>`


window.addEventListener('keydown', () => {
playSound();
const typing = (message, timeout) =>
  [...message].map(
    (ch, i) =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(message.substring(0, i + 5));
        }, timeout * i);
      })
  );

typing(message, 140).forEach(promise => {
  promise.then(portion => {
    document.querySelector('.output').innerHTML = portion;
  });
});

  //typing(message)
})




getDateAndTime()


/* window.addEventListener('load', () => {
   
  setTimeout(function() {
    typing(message);
}, 3000);
    
})
 */













