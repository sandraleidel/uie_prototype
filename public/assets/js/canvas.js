// Smooth Drawing by Nikhil Krishnan on Codepen (https://codepen.io/nikhil8krishnan/pen/NNyJGd)

// Global Vars
// 1 - paint; 2 - fill; 3 - shape
let activeMode = 1;
let activeColor;
let activeBrushSize;

init();

const c = document.getElementById('canvas');
const ctx = c.getContext('2d');
// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('canvas');

// create a rectangle object
var rect = new fabric.Rect({
	fill: 'red',
	width: 20,
	height: 20
});

// "add" rectangle onto canvas
console.log(rect);
canvas.add(rect);

const buttonSave = document.querySelector("#btnSave");
const buttonCancel = document.querySelector("#btnCancel");
const buttonUndo = document.querySelector("#btnUndo");
const buttonModePaint = document.querySelector("#btnModePaint");
const buttonModeFill = document.querySelector("#btnModeFill");
const buttonModeShape = document.querySelector("#btnModeShape");
const buttonShapeAccept = document.querySelector("#btnShapeAccept");
const buttonShapeCancel = document.querySelector("#btnShapeCancel");

const shapeModal = document.querySelector("#shapeModal");
const canvasContainer = document.querySelector("#canvasContainer");

let currentPosition = { x: 0, y: 0 };

canvasContainer.addEventListener('touchstart', handleCanvasTouch);
canvasContainer.addEventListener('touchmove', handleCanvasMove);

buttonSave.addEventListener("click", () => window.location.href = './index.html');
buttonCancel.addEventListener("click", () => alert("Cancel Editin;g"));
buttonUndo.addEventListener("click", () => alert("Undo last Step"));
buttonModePaint.addEventListener("click", () => changeMode(1, buttonModePaint));
buttonModeFill.addEventListener("click", () => changeMode(2, buttonModeFill));
buttonModeShape.addEventListener("click", () => toggleShapeModal());
buttonShapeAccept.addEventListener("click", () => toggleShapeModal());
buttonShapeCancel.addEventListener("click", () => toggleShapeModal());

function toggleShapeModal() {
	shapeModal.classList.toggle("hidden");
	canvasContainer.classList.toggle("hidden");
}

/**
 * Set active mode (1) drawing, (2) filling, (3) shapes
 *
 * @param newMode selected mode
 * @param activeButton pressed button, to be set active
 */
function changeMode(newMode, activeButton) {
	const modeButtons = document.querySelectorAll('.btn-mode');
	modeButtons.forEach(button => button.classList.remove('active'));

	activeMode = newMode;
	activeButton.classList.add('active');

	if (activeMode === 3) {
		alert('Formenfenster öffnen');
	}
}

/**
 * Set active color
 *
 * @param newColor selected color
 * @param activeButton pressed button, to be set active
 */
function changeColor(newColor, activeButton) {
	const colorButtons = document.querySelectorAll('.btn-color');
	colorButtons.forEach(button => button.classList.remove('active'));

	activeColor = newColor;
	activeButton.classList.add('active');
}

/**
 * Set active brush size
 *
 * @param newBrushSize selected brush size
 * @param activeButton pressed button, to be set active
 */
function changeSize(newBrushSize, activeButton) {
	const sizeButtons = document.querySelectorAll('.btn-size');
	sizeButtons.forEach(button => button.classList.remove('active'));

	activeBrushSize = newBrushSize;
	activeButton.classList.add('active');
}

/**
 * Handle a touchstart event on the canvas. Decide what to do depending on the current mode.
 * 
 * @param {object} e event
 */
function handleCanvasTouch(e) {
	switch (activeMode) {
		case 1:
			updatePosition(e);
			break;
		case 2:
			fill();
			break;
		default:
			break;
	}
}

/**
 * Handle a touchmove event on the canvas. Decide what to do depending on the current mode.
 * 
 * @param {object} e event
 */
function handleCanvasMove(e) {
	switch (activeMode) {
		case 1:
			draw(e);
			break;
		case 2:
			break;
		default:
			break;
	}
}

/**
 * Update mouse position
 *
 * @param {object} e event
 */
function updatePosition(e) {
	currentPosition.x = e.touches[0].pageX - canvas.offsetLeft;
	currentPosition.y = e.touches[0].pageY - canvas.offsetTop;
}

/**
 * Draw line in canvas
 *
 * @param {object} e event
 */
function draw(e) {
	ctx.beginPath();
	ctx.lineWidth = activeBrushSize;
	ctx.lineCap = 'round';
	ctx.strokeStyle = activeColor;

	ctx.moveTo(currentPosition.x, currentPosition.y);
	updatePosition(e);
	ctx.lineTo(currentPosition.x, currentPosition.y);

	ctx.stroke();
}

/**
 * Change background color
 * TODO: implement fill algorithm
 */
function fill() {
	const canvas = document.getElementById('canvas');
	canvas.style.backgroundColor = activeColor;
}
