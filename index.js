// const barcode = document.getElementById("barcode");

// let script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
// document.getElementsByTagName('head')[0].appendChild(script);

// function fade_in_barcode() {
	// $('barcode').fadeIn()
// }

// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
// document.getElementsByTagName('head')[0].appendChild(script);

const backgroundColor = "#B9B9B9";
var lastKeystrokeTime = new Date().getTime();

$("body").css("background-color", backgroundColor);

document.onkeypress = function (e) {
    e = e || window.event;
	let currentKeystrokeTime = new Date().getTime();
	let deltaTime = currentKeystrokeTime - lastKeystrokeTime;
	lastKeystrokeTime = currentKeystrokeTime;
	console.log("Time: " + currentKeystrokeTime);
	console.log("Delta time: " + deltaTime);
	console.log(e);
    // use e.keyCode
};

// $("#thatButton").click(function(){
	// $("#barcode").fadeOut();
	// console.log("clicky clicky");
// });

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
async function scan(upc) {
	// makes the upc appear then disappear
	if (!firstScan){
		$("#barcode").fadeOut();
		await new Promise(r => setTimeout(r, 1000));
	}
	else {
		firstScan = false;
	}
	JsBarcode("#barcode", upc,{	displayValue:true,
								fontSize:20,
								lineColor: "#0f2edb",
								background: backgroundColor});
	$("#barcode").fadeIn();
}

var repeat = function(){
	console.log("repeat");
	let choices = ["test", "hello", "hello world", "hmm", "yup"]
	scan(choice(choices));
	// scan(Math.floor(1000000+Math.random()*9000000));
};
setInterval(repeat,5000);
repeat();