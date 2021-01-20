const main = document.querySelector('#canvasContainer');
const buttonWrapperColor = document.querySelector('#buttonWrapperColor');
const buttonWrapperMode = document.querySelector('#buttonWrapperMode');
const shapeGallery = document.querySelector('#shapeGallery');

function init() {
	fetch('./assets/js/brushes.json')
		.then(response => response.json())
		.then(brushes => brushes.forEach(brush => {
			const button = document.createElement('button');
			button.id = `btnBrush${brush.name.toUpperCase()}`;
			button.classList.add('btn-size');
			button.style.backgroundSize = `${brush.size}px`;
			if (brush.active) {
				button.classList.add('active');
				activeBrushSize = brush.size;
			}
			button.onclick = () => {
				changeSize(brush.size, button);
			};
			buttonWrapperMode.append(button);
		}));

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
				activeColor = color.code;
			}
			button.onclick = () => {
				changeColor(color.code, button);
			};

			buttonWrapperColor.append(button);
		}));

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

	const canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	canvas.width = main.clientWidth;
	canvas.height = main.clientHeight;
	main.append(canvas);
}
