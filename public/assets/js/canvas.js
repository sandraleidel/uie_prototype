// Smooth Drawing by Nikhil Krishnan on Codepen (https://codepen.io/nikhil8krishnan/pen/NNyJGd)

// Global Vars
// 1 - paint; 2 - fill; 3 - shape
let activeMode = 1;
let activeColor;
let activeBrushSize;
let canvas;

buildInterface();

const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

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

buttonSave.addEventListener("click", () => window.location.href = './index.html');
buttonCancel.addEventListener("click", () => alert("Cancel Editin;g"));
buttonUndo.addEventListener("click", () => alert("Undo last Step"));
buttonModePaint.addEventListener("click", () => changeMode(1, buttonModePaint));
buttonModeFill.addEventListener("click", () => changeMode(2, buttonModeFill));
buttonModeShape.addEventListener("click", () => toggleShapeModal());
buttonShapeAccept.addEventListener("click", () => toggleShapeModal());
buttonShapeCancel.addEventListener("click", () => toggleShapeModal());

/**
 * Set up interface components by adding buttons and a canvas.
 */
function buildInterface() {
	const buttonWrapperColor = document.querySelector('#buttonWrapperColor');
	const buttonWrapperMode = document.querySelector('#buttonWrapperMode');
	const shapeGallery = document.querySelector('#shapeGallery');
	const canvasContainer = document.querySelector("#canvasContainer");

	// Place canvas according to container size
	const newCanvas = document.createElement('canvas');
	newCanvas.id = 'canvas';
	newCanvas.width = canvasContainer.clientWidth;
	newCanvas.height = canvasContainer.clientHeight;
	canvasContainer.append(newCanvas);
	canvas = new fabric.Canvas('canvas');

	// Place brush size buttons
	fetch('./assets/js/brushes.json')
		.then(response => response.json())
		.then(brushes => brushes.forEach(brush => {
			const button = document.createElement('button');
			button.id = `btnBrush${brush.name.toUpperCase()}`;
			button.classList.add('btn-size');
			button.style.backgroundSize = `${brush.size}px`;
			if (brush.active) {
				button.classList.add('active');
				canvas.freeDrawingBrush.width = brush.size;
			}
			button.onclick = () => {
				changeSize(brush.size, button);
			};
			buttonWrapperMode.append(button);
		}));

	// Place brush color buttons
	fetch('./assets/js/colors.json')
		.then(response => response.json())
		.then(colors => colors.forEach(color => {
			const button = document.createElement('button');
			button.id = `btnColor${color.name}`;
			button.classList.add('btn-color');

			// The white button should have a white glow 
			color.code === '#ffffff'
				? (button.style.color = '#000000')
				: (button.style.color = color.code);
			button.style.backgroundColor = color.code;
			if (color.active) {
				button.classList.add('active');
				canvas.freeDrawingBrush.color = color.code;
			}
			button.onclick = () => {
				changeColor(color.code, button);
			};

			buttonWrapperColor.append(button);
		}));

	// Populate shape menu
	fetch('./assets/js/shapes.json')
		.then(response => response.json())
		.then(shapes => shapes.forEach(shape => {
			const div = document.createElement('div');
			const img = document.createElement('img');
			img.id = `shape_${shape.name}`
			img.src = shape.img;
			div.append(img);
			div.classList.add('shape-gallery-entry')
			div.addEventListener('click', () => {
				const activeGalleryElements = document.querySelector('.shape-gallery-entry.active');
				activeGalleryElements && activeGalleryElements.classList.remove('active');
				div.classList.add('active');
			});
			shapeGallery.append(div);
		}));
}

/**
 * Toggle visibility of the shape menu
 */
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

	canvas.freeDrawingBrush.color = newColor;

	//activeColor = newColor;
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
 * Change background color
 * TODO: implement fill algorithm
 */
function fill() {
	const canvas = document.getElementById('canvas');
	canvas.style.backgroundColor = activeColor;
}
