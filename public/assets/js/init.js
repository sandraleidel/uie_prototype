const main = document.querySelector("main");
const canvas = document.createElement("canvas");
canvas.id = "canvas";
canvas.width = main.clientWidth;
canvas.height = main.clientHeight;

main.append(canvas);