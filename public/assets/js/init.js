const main = document.querySelector('main');
const buttonWrapper = document.querySelector("#buttonWrapperColor");
const canvas = document.createElement('canvas');

colors.forEach(color => {
    const button = document.createElement("button");
    button.id = color.name;
    button.classList.add("color");
    button.onclick = () => { change_color(color.code, button) };

    buttonWrapper.append(button);
})

canvas.id = 'canvas';
canvas.width = main.clientWidth;
canvas.height = main.clientHeight;

main.append(canvas);