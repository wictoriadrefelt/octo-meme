

let keys = [
	new Audio("./sound/key1.wav"),
	//new Audio("./sound/key2.mp3"),
	//new Audio("./sound/key3.mp3"),
	//new Audio("./sound/key4.mp3"),
	//new Audio("./sound/key5.mp3"),
];




// function to generate sound when keys are pressed 
export function typeSound() {
	let i = Math.floor(Math.random() * keys.length);
	keys[i].currentTime = 0;
	keys[i].play();
}