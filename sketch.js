/* 
TicTacToe (Human vs Human)
authon: Ahmet Ataşoğlu
*/
const DIAMETER = 100;
const SCL = 0.8;

let w, h, d; // the d is the diagonal length of X

let cells = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

let count = 9;

let player = 'X';
let nextPlayer = 'O';
let info;


function setup() {
	createCanvas(500, 500);

	w = floor(width / 3);
	h = floor(height / 3);
	d = dist(0, 0, w, h) * SCL;

	info = document.getElementById("info");

	// Settings...
	strokeWeight(3);
	noFill();
}

function draw() {
	background(0);
	drawLines();
	drawSymbols();
	info.innerHTML = "Next turn: " + player;
	if(checkWinner()) {
		info.innerHTML = winner + " Wins!";
		noLoop();
	}
}

function mousePressed() {
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		let row = (mouseX - mouseX % w) / w;
		let col = (mouseY - mouseY % h) / h;

		if (cells[col][row] == null) {
			cells[col][row] = player;
			player = nextPlayer;
			nextPlayer = cells[col][row];
			count--;
			// console.log(cells);		
		}
	}
}

function keyPressed() {
	if (keyCode === ENTER) {
		cells = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];
		count = 9;
		player = 'X';
		nextPlayer = 'O';
		loop();
	}
}

function drawLines() {
	stroke(255);
	for (let i = 1; i < 3; i++) {
		line(w * i, 0, w * i, height);
		line(0, h * i, width, h * i);
	}
}
function drawSymbols() {
	let x, y, t;
	stroke(255);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (cells[i][j] == 'X') {
				x = j * w;
				y = i * h;
				t = floor(d / sqrt(2));
				
				line(x + t, y + t, x + w - t, y + h - t);
				line(x + w - t, y + t, x + t, y + h - t);
			} 
			else if (cells[i][j] == 'O') {
				x = j * w + w / 2;
				y = i * h + h / 2;
				ellipse(x, y, DIAMETER, DIAMETER);
			} else {
				continue;
			}
		}
	}
}

function checkWinner() {

	let x, y;
	// Diagonal check
	stroke(255, 0, 0);
	if (equals3(cells[0][0], cells[1][1], cells[2][2])) {
		winner = cells[0][0];
		line(w / 2, h / 2, w * 2.5, h * 2.5);
		return true;
	}

	if (equals3(cells[0][2], cells[1][1], cells[2][0])) {
		winner = cells[0][2];
		line(w * 2.5, h / 2, w / 2, h * 2.5);
		return true;
	}

	for (let i = 0; i < 3; i++) {	
		// Horizontal check
		if (equals3(cells[i][0], cells[i][1], cells[i][2])) {
			winner = cells[i][0];
			line(w / 2, h * (i + 0.5), w * 2.5, h * (i + 0.5));
			return true;
		}
		// Vertical check
		if (equals3(cells[0][i], cells[1][i], cells[2][i])) {
			winner = cells[0][i];
			line(w * (i + 0.5), h / 2, w * (i + 0.5), h * 2.5);
			return true;
		}
	}

	if (count == 0) {
		winner = 'Nobody';
		return true;
	}
	return false;
}

function equals3(a, b, c) {
	if (a == b && b == c && c != null) return true;
	else return false;
}
