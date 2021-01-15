// Smooth Drawing by Nikhil Krishnan on Codepen (https://codepen.io/nikhil8krishnan/pen/NNyJGd)

/** Globale Variablen **/
var activeBrushSize; // Radius der gezeichneten Punkte
var activeColor; // aktuell ausgewählte Farbe
var mode = 1; // 1 - paint; 2 - fill; 3 - shape
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

// Default position
var DefaultPos = { x: 0, y: 0 };

document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);

//new mouse event position
function setPosition(e) {
	DefaultPos.x = e.pageX - canvas.offsetLeft;
	DefaultPos.y = e.pageY - canvas.offsetTop;
}

//drawing canvas object
function draw(e) {
	//left click define
	if (e.buttons !== 1) return;

	ctx.beginPath(); //path begin
	ctx.lineWidth = 5;
	ctx.lineCap = "round";
	ctx.strokeStyle = "white";

	ctx.moveTo(DefaultPos.x, DefaultPos.y);
	setPosition(e);
	ctx.lineTo(DefaultPos.x, DefaultPos.y);

	ctx.stroke();
}

/**
 * korrigiert Maus-position auf screen zu Maus-Position auf canvas
 * wenn Maus gedrückt gehalten wird, wird Zeichen-Funktion aufgerufen
 * @param event
 */
function position_handler(event) {
	let canvas = document.getElementById("canvas");
	x = event.pageX - canvas.offsetLeft;
	y = event.pageY - canvas.offsetTop;
	if (draw) {
		draw_circle();
	}
}

/**
 * Ändert Modus zwischen Zeichnen (1), Füllen (2) und Form-Modus (3)
 * @param new_mode
 * @param activeButton
 */
function change_mode(new_mode, activeButton) {
	mode = new_mode;
	let mode_buttons = document.querySelectorAll(".btn-mode");
	mode_buttons.forEach((button) => button.classList.remove("active"));
	activeButton.classList.add("active");
	if (mode == 3) {
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

	ctx.moveTo(DefaultPos.x, DefaultPos.y);
	setPosition(e);
	ctx.lineTo(DefaultPos.x, DefaultPos.y);

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