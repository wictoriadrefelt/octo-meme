

let keys = [
	new Audio("./sound/key1.wav"),
	new Audio("./sound/key6.mp3"),

];




// function to generate sound when keys are pressed 
export function typeSound() {
	let i = Math.floor(Math.random() * keys.length);
	keys[i].currentTime = 0;
	keys[i].play();
}