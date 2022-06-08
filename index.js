/*

Tracking system frontend for Signet

Scattered ideas:
- undo scans? (maybe better to handle from server side, or maybe just scan to proper location instead)

*/
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const allowedCharacters =  '0123456789' + alphabet + alphabet.toUpperCase();
const minimumDelay = 60; // ms between keystrokes
const minimumCharacters = 4; // this is the minimum length for a barcode scan (to prevent misfires)
var lastKeystrokeTime = new Date().getTime();
var keystrokeChunk = '';
var locations = ["stamps", "cell 1", "cell 2", "shipping"];

// count pageviews through localStorage, will get rid of this at some point
var pageViews = localStorage.getItem("pageViews");
if (pageViews) {
		pageViews = (parseInt(pageViews) + 1).toString();
		localStorage.setItem('pageViews', pageViews);
}
else {
	pageViews = '1';
	localStorage.setItem('pageViews', pageViews);
}
console.log(`Page views: ${pageViews}`);
$("#page-views").html(`<u>Views</u>: <b>${pageViews}</b> <i>(test of localStorage)</i>`);

// change the background color so that it matches the background of the barcode
const backgroundColor = "#B9B9B9";
$("body").css("background-color", backgroundColor);

// initialize location buttons (TODO: high priority)
for (i = 0; i < locations.length; i++){
	if ((i + 1) % 3 == 0){
		console.log("new row");
	}
}

// change the scan location
var scanLocation = localStorage.getItem("scanLocation");
if (scanLocation) {
	$("#scan-location").html(`Currently scanning to <b>${scanLocation}</b>`);
}
else {
	console.log("Please select location");
	$("#scan-location").html("Please select a location to scan to.");
}

document.onkeypress = function (e) {
	// when a burst of [minimumCharacters] or more keystrokes are detected with minimal delay followed by "enter",
	// treat it as a scan
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
		if (deltaTime < minimumDelay && keystrokeChunk.length >= minimumCharacters) {
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
// $("#barcode").hide()
const fadeSpeed = 500; // ms
async function scan(upc) {
	// makes the upc appear until the next one gets scanned
	// TODO: fix shenanigans where the first scan pops in instead of a slideDown (priority: low)
	if (firstScan){
		JsBarcode("#barcode", upc,{	displayValue:true,
							fontSize:20,
							lineColor: "#0f2edb",
							background: backgroundColor});
		firstScan = false;
	}
	else {
		$("#barcode").fadeOut(fadeSpeed);
		await new Promise(r => setTimeout(r, fadeSpeed + 10)); // don't remove this, fixes fades because of async shenanigans
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