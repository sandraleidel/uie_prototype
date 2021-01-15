// Smooth Drawing by Nikhil Krishnan on Codepen (https://codepen.io/nikhil8krishnan/pen/NNyJGd)

// Global Vars
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

let currentPosition = { x: 0, y: 0 };

// 1 - paint; 2 - fill; 3 - shape
let activeMode = 1;
let activeColor;
let activeBrushSize; 

document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", updatePosition);
document.addEventListener("mouseenter", updatePosition);


/**
 * Ändert Modus zwischen Zeichnen (1), Füllen (2) und Form-Modus (3)
 * @param new_mode
 * @param activeButton
 */
function change_mode(new_mode, activeButton) {
	activeMode = new_mode;
	let mode_buttons = document.querySelectorAll(".btn-mode");
	mode_buttons.forEach((button) => button.classList.remove("active"));
	activeButton.classList.add("active");
	if (activeMode == 3) {
		alert("Formenfenster öffnen");
	}
}

/**
 * Ändert ausgewählte Farbe
 * @param new_color
 * @param activeButton
 */
function change_color(new_color, activeButton) {
	activeColor = new_color;
	let color_buttons = document.querySelectorAll(".btn-color");
	color_buttons.forEach((button) => button.classList.remove("active"));
	activeButton.classList.add("active");
}

/**
 * ändert ausgewählte Größe
 * @param new_size - Radius
 * @param activeButton
 */
function change_size(new_size, activeButton) {
	activeBrushSize = new_size;
	let size_buttons = document.querySelectorAll(".btn-size");
	size_buttons.forEach((button) => button.classList.remove("active"));
	activeButton.classList.add("active");
}

/**
 * Update mouse event position
 * 
 * @param {object} e  event
 */
function updatePosition(e) {
	currentPosition.x = e.pageX - canvas.offsetLeft;
	currentPosition.y = e.pageY - canvas.offsetTop;
}

/**
 * Draw line in canvas
 * 
 * @param {object} e event
 */
function draw(e) {
	if (e.buttons !== 1) return;

	ctx.beginPath();
	ctx.lineWidth = activeBrushSize;
	ctx.lineCap = "round";
	ctx.strokeStyle = activeColor;

	ctx.moveTo(currentPosition.x, currentPosition.y);
	updatePosition(e);
	ctx.lineTo(currentPosition.x, currentPosition.y);

	ctx.stroke();
}

/**
 * Ändert Hintergrundfarbe
 * TODO: Füllalgorithmus
 */
function fill() {
	let canvas = document.getElementById("canvas");
	canvas.style.backgroundColor = activeColor;
}