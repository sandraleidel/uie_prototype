const main = document.querySelector('main');
const buttonWrapperColor = document.querySelector("#buttonWrapperColor");
const buttonWrapperMode = document.querySelector("#buttonWrapperMode");
const canvas = document.createElement('canvas');

colors.forEach(color => {
    const button = document.createElement("button");
    button.id = color.name;
    button.classList.add("color");
    button.onclick = () => { change_color(color.code, button) };

    buttonWrapperColor.append(button);
})
brushes.forEach(brush => {
    const button = document.createElement("button");
    button.id = brush.name;
    button.classList.add("size");
    button.onclick = () => { change_size(brush.size, button) };

    buttonWrapperMode.append(button);
})

canvas.id = 'canvas';
canvas.width = main.clientWidth;
canvas.height = main.clientHeight;

main.append(canvas);