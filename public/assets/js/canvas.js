// Smooth Drawing by Nikhil Krishnan on Codepen (https://codepen.io/nikhil8krishnan/pen/NNyJGd)

// Global Vars
// 1 - paint; 2 - fill; 3 - shape
let activeMode = 1;
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

buttonSave.addEventListener("click", () => window.location.href = './index.html');
buttonCancel.addEventListener("click", () => alert("Cancel Editing"));
buttonUndo.addEventListener("click", () => alert("Undo last Step"));
buttonModePaint.addEventListener("click", () => changeMode(1, buttonModePaint));
buttonModeFill.addEventListener("click", () => changeMode(2, buttonModeFill));
buttonModeShape.addEventListener("click", () => {
	changeMode(3, buttonModeShape);
	toggleShapeModal();
});
buttonShapeAccept.addEventListener("click", appendShape);
buttonShapeCancel.addEventListener("click", toggleShapeModal);

canvasContainer.addEventListener("click",(e) => {if(activeMode == 2) {fill(e.layerX, e.layerY);}});
canvasContainer.addEventListener("touchstart",(e) => {
	if(activeMode == 2) {
		fill(e.changedTouches[0].pageX + e.layerX, e.changedTouches[0].pageY + e.layerY);
	}
});

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
	canvas.allowTouchScrolling = false;
	canvas.fireRightClick = false;
	canvas.selection = false;
	canvas.isDrawingMode = true;
	canvas.backgroundColor = "#ffffff";

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
			img.id = `shape_${shape.name}`;
			img.src = shape.img;
			div.append(img);
			div.classList.add('shape-gallery-entry');
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
 * Set active mode (1) drawing, (2) filling
 *
 * @param mode selected mode
 * @param activeButton pressed button, to be set active
 */
function changeMode(mode, activeButton) {
	const modeButtons = document.querySelectorAll('.btn-mode');
	modeButtons.forEach(button => button.classList.remove('active'));

	switch (mode) {
		case 1:
			canvas.isDrawingMode = true;
			console.log("switched to mode 1");
			break;
		case 2:
			canvas.isDrawingMode = false;
			canvas.getObjects().forEach(object => {
				object.lockMovementX = true;
				object.lockMovementY = true;
				object.lockRotation = true;
				object.lockScalingX = true;
				object.lockScalingY	= true;
				object.hasBorders = false;
				object.hasControls = false;
				object.perPixelTargetFind = true;
				if(object.fill == null) {
					object.set("fill", 'rgba(255,255,255,0.01)');
				}
			});
			canvas.requestRenderAll();
			console.log("switched to mode 2");
			break;
		case 3:
			canvas.isDrawingMode = false;
			canvas.getObjects().forEach(object => object.selectable = false);
			console.log("switched to mode 3");
			if(canvas.freeDrawingBrush.color == canvas.backgroundColor) {
				alert("Achtung: Die ausgewählte Farbe und die Hintergrundfarbe sind gleich.");
			}
			break;
	}

	activeMode = mode;
	activeButton.classList.add('active');
}

/**
 * Set active color
 *
 * @param color selected color
 * @param activeButton pressed button, to be set active
 */
function changeColor(color, activeButton) {
	const colorButtons = document.querySelectorAll('.btn-color');
	colorButtons.forEach(button => button.classList.remove('active'));

	canvas.freeDrawingBrush.color = color;
	activeButton.classList.add('active');
}

/**
 * Set active brush size
 *
 * @param brushSize selected brush size
 * @param activeButton pressed button, to be set active
 */
function changeSize(brushSize, activeButton) {
	const sizeButtons = document.querySelectorAll('.btn-size');
	sizeButtons.forEach(button => button.classList.remove('active'));

	canvas.freeDrawingBrush.width = brushSize;
	activeButton.classList.add('active');
}

/**
 * Changes stroke- or fill-color of selected path
 * or background-color if no path selected
 * @param x x-coordinate of clicked pixel
 * @param y y-coordinate of clicked pixel
 */
function fill(x,y) {
	let shape = canvas.getActiveObject();
	if(shape == null) {
		canvas.backgroundColor = canvas.freeDrawingBrush.color;
	} else {
		if(shape.fill == shape.stroke) {
			shape.set("fill", canvas.freeDrawingBrush.color);
			shape.set("stroke", canvas.freeDrawingBrush.color);
		}

		let pixel = ctx.getImageData(x, y, 1, 1).data;
		let pixelColor = new fabric.Color('rgb(' + pixel[0] + ',' + pixel[1] + ',' + pixel[2] + ')').toHex();
		let strokeColor = new fabric.Color(shape.stroke).toHex();
		if (pixelColor == strokeColor) {
			shape.set("stroke", canvas.freeDrawingBrush.color);
		} else {
			shape.set("fill", canvas.freeDrawingBrush.color);
		}
	}
	canvas.requestRenderAll();
}

/**
 * Adds selected icon to canvas
 */
function appendShape() {
	const selectedShape = document.querySelector(".shape-gallery-entry.active img");
	selectedShape && console.log(selectedShape);

	fabric.loadSVGFromURL(selectedShape.src, shapes => {
		let filteredShapes = shapes.filter(s => s.fill);
		for (i = 0; i < filteredShapes.length; i++) {
			filteredShapes[i].set("fill", canvas.freeDrawingBrush.color);
		}
		let shape = new fabric.Group(filteredShapes);
		shape.id = `object_${selectedShape.id}`;
		//shape.selectable = false;
		shape.scaleY = 5;
		shape.scaleX = 5;
		//oImg.hasControls = false;
		canvas.setActiveObject(shape);
		canvas.add(shape);
	});

	toggleShapeModal()
}
