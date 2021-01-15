const main = document.querySelector('main');
const buttonWrapperColor = document.querySelector("#buttonWrapperColor");
const buttonWrapperMode = document.querySelector("#buttonWrapperMode");
const canvas = document.createElement('canvas');

colors.forEach(color => {
    const button = document.createElement("button");
    button.id = color.name;
    button.classList.add("btn-color");
    color.code === "#ffffff" ? button.style.color = "#000000" : button.style.color = color.code;
    button.style.backgroundColor = color.code;
    if (color.active) {
        button.classList.add("active");
        activeColor = color.code;
    }
    button.onclick = () => { change_color(color.code, button) };

    buttonWrapperColor.append(button);
})
brushes.forEach(brush => {
    const button = document.createElement("button");
    button.id = brush.name;
    button.classList.add("btn-size");
    if (brush.active) {
        button.classList.add("active");
        activeBrushSize = brush.size;
    }
    button.onclick = () => { change_size(brush.size, button) };

    buttonWrapperMode.append(button);
})

canvas.id = 'canvas';
canvas.width = main.clientWidth;
canvas.height = main.clientHeight;

main.append(canvas);