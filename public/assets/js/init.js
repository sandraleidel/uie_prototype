const main = document.querySelector('main');
const buttonWrapperColor = document.querySelector('#buttonWrapperColor');
const buttonWrapperMode = document.querySelector('#buttonWrapperMode');
const canvas = document.createElement('canvas');

function init() {
	colors.forEach(color => {
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
	});
	brushes.forEach(brush => {
		const button = document.createElement('button');
		button.id = `btnBrush${brush.name.toUpperCase()}`;
		button.classList.add('btn-size');
		button.style.backgroundSize = `${2 * brush.size}px`;
		if (brush.active) {
			button.classList.add('active');
			activeBrushSize = brush.size;
		}
		button.onclick = () => {
			changeSize(brush.size, button);
		};

		buttonWrapperMode.append(button);
	});

	canvas.id = 'canvas';
	canvas.width = main.clientWidth;
	canvas.height = main.clientHeight;

	main.append(canvas);
}
