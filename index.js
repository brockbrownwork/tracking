const backgroundColor = "#B9B9B9";
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const allowedCharacters =  '0123456789' + alphabet + alphabet.toUpperCase();
const minimumDelay = 300; // ms between keystrokes
var lastKeystrokeTime = new Date().getTime();
var keystrokeChunk = '';

$("body").css("background-color", backgroundColor);

document.onkeypress = function (e) {
	// detects keypresses, when a burst of 6 keystrokes are detected with minimal delay followed by "enter"
    e = e || window.event;
	if (e.key && allowedCharacters.includes(e.key)){
		console.log('this is allowed: ' + e.key);
		let currentKeystrokeTime = new Date().getTime();
		let deltaTime = currentKeystrokeTime - lastKeystrokeTime;
		let keycode = e.key;
		if (deltaTime < minimumDelay) {
			keystrokeChunk += e.key;
			console.log(`Keystroke chunk: ${keystrokeChunk}`);
		}
		else {
			keystrokeChunk = e.key;
		}
		lastKeystrokeTime = currentKeystrokeTime;
		// console.log("Time: " + currentKeystrokeTime);
		console.log("Delta time: " + deltaTime);
		// use e.keyCode
	}
	else if (e.key == "Enter") {
		console.log("Enter pressed!");
		let currentKeystrokeTime = new Date().getTime();
		let deltaTime = currentKeystrokeTime - lastKeystrokeTime;
		let keycode = e.key;
		if (deltaTime < minimumDelay && keystrokeChunk.length > 5) {
			console.log("Scan detected: " + keystrokeChunk);
			scan(keystrokeChunk);
		}
		else {
			keystrokeChunk = '';
		}
		lastKeystrokeTime = currentKeystrokeTime;
	}
	// else {
		// console.log("Unhandled keystroke info:");
		// console.log(e);
	// }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function choice(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

var visible = false;
var firstScan = true;
$("#barcode").hide()
const fadeSpeed = 500; // ms
async function scan(upc) {
	// makes the upc appear then disappear
	if (!firstScan){
		$("#barcode").fadeOut(fadeSpeed);
		await new Promise(r => setTimeout(r, fadeSpeed + 10)); // don't remove this, fixes fades because of async shenanigans
	}
	else {
		firstScan = false;
	}
	JsBarcode("#barcode", upc,{	displayValue:true,
								fontSize:20,
								lineColor: "#0f2edb",
								background: backgroundColor});
	$("#barcode").slideDown(fadeSpeed);
}

var repeat = function(){
	// tests out the scan function
	console.log("repeat");
	let choices = ["test", "hello", "hello world", "hmm", "yup", "12345", "67890"]
	scan(choice(choices));
	// scan(Math.floor(1000000+Math.random()*9000000));
};
// setInterval(repeat,1000);