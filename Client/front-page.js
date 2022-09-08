  // displays time on start-screen
  const getDateAndTime = () => {
  let currentDate = new Date();
  currentDate = currentDate.toDateString()
  let currentTime = new Date(); 
  currentTime = currentTime.toLocaleTimeString("en-US",
  {
    hour: "2-digit",
    minute: "2-digit",
  });
  
  document.getElementById('time').innerHTML = ''
  document.getElementById('time').innerHTML = currentTime  
  }	

  function playSound () {
	let background = new Audio('./sound/background.wav');
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

const btn = document.getElementById('start');

btn.addEventListener('click', () => {
  btn.style.backgroundColor = 'green';
  btn.style.color = 'white';
  btn.type = 'text/css'
  btn.classList.add('button')
})

btn.addEventListener('click', (e) => {

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
})

getDateAndTime()