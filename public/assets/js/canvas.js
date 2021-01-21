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
buttonCancel.addEventListener("click", () => alert("Cancel Editin;g"));
buttonUndo.addEventListener("click", () => alert("Undo last Step"));
buttonModePaint.addEventListener("click", () => changeMode(1, buttonModePaint));
buttonModeFill.addEventListener("click", () => changeMode(2, buttonModeFill));
buttonModeShape.addEventListener("click", () => {
	changeMode(3, buttonModeShape);
	toggleShapeModal();
});
buttonShapeAccept.addEventListener("click", appendShape);
buttonShapeCancel.addEventListener("click", toggleShapeModal);

canvasContainer.addEventListener("click",(e) => {if(activeMode == 2) {pixellauf(e.layerX, e.layerY);}});
canvasContainer.addEventListener("touchstart",() => {if(activeMode == 2) {fill();}});

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
					object.set("fill", canvas.backgroundColor);
				}
			});
			canvas.requestRenderAll();
			console.log("switched to mode 2");
			break;
		case 3:
			canvas.isDrawingMode = false;
			canvas.getObjects().forEach(object => object.selectable = false)
			console.log("switched to mode 3");
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
 * Changes fill-color of selected path
 * or background-color if no path selected
 */
function fill() {
	let shape = canvas.getActiveObject();
	if(shape == null) {
		canvas.backgroundColor = canvas.freeDrawingBrush.color;
	} else {
		shape.set("fill", canvas.freeDrawingBrush.color);
	}
	canvas.requestRenderAll();
}

/**
 * 
 */
function appendShape() {
	const selectedShape = document.querySelector(".shape-gallery-entry.active img");
	selectedShape && console.log(selectedShape);

	fabric.loadSVGFromURL(selectedShape.src, shapes => {
		shapes[1].set("fill", canvas.freeDrawingBrush.color);
		let shape = new fabric.Group(shapes.filter(s => s.fill));
		console.log(shapes.filter(s => s.fill));
		shape.id = `object_${selectedShape.id}`;
		//shape.selectable = false;
		shape.scaleY = 20;
		shape.scaleX = 20;
		//oImg.hasControls = false;
		canvas.setActiveObject(shape);
		canvas.add(shape);
	})

	toggleShapeModal()
}

function pixellauf(x, y) {
	var idata = ctx.getImageData(0, 0, c.width, c.height);
	var index = getIndex(x,y);
	console.log(idata.data[index]);
	console.log(index);
	var oldColor = [idata.data[index], idata.data[index+1], idata.data[index+2]];
	console.log(oldColor);
	var newColor = getColor(new fabric.Color(canvas.freeDrawingBrush.color).toRgb());
	if (oldColor == newColor) {
		return;
	}
	var queue = [];
	queue.push({x: x, y: y});
	while (queue.length != 0) {
		var pixel = queue.pop();
		for(j of [0, 1, -1]) {
			var k = j;
			index = getIndex(pixel.x + k, pixel.y);
			color = [idata.data[index], idata.data[index+1], idata.data[index+2]];
			while (similar(color, oldColor)) {
				for (i of [0, 1, 2]) {
					idata.data[index + i] = newColor[i];
				}
				for(l of [-1,1]) {
					var newPixel = {x: pixel.x + k, y: pixel.y + l};
					index = getIndex(newPixel.x, newPixel.y);
					color = [idata.data[index], idata.data[index+1], idata.data[index+2]];
					if(similar(color, oldColor)) {
						queue.push(newPixel);
					}
				}

				k += j;
				index = getIndex(pixel.x + k, pixel.y);
				color = [idata.data[index], idata.data[index+1], idata.data[index+2]];
			}
		}

	}
	var index = getIndex(x,y);
	console.log(idata.data[index]);
	ctx.putImageData(idata, 0, 0);
}

function getColor(rgb) {
	rgb = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',');
	return rgb
}

function getIndex(x,y) {
	return (c.width * y + x) * 4;
}

function similar(c1, c2) {
	var d = Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2));
	if (d < 50) {
		return true;
	}
}
