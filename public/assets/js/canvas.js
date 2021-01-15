/** Globale Variablen **/
var x, y;                       // Position der Maus
var activeBrushSize;                     // Radius der gezeichneten Punkte
var draw = false;
var activeColor;          // aktuell ausgewählte Farbe
var mode = 1;                   // 1 - paint; 2 - fill; 3 - shape

/** Event-Handler **/
document.addEventListener("mousemove", position_handler);
document.addEventListener("mousedown", function (event) {
    let canvas = document.getElementById("canvas");
    if (event.x > canvas.offsetLeft && event.x < (canvas.offsetLeft + canvas.width) && event.y > canvas.offsetTop && event.y < (canvas.offsetTop + canvas.height)) {
        switch (mode) {
            case 1:
                draw = true;
                draw_circle();
                break;
            case 2:
                fill();
                break;
            default:
                break;
        }
    }
});
document.addEventListener("mouseup", function () {
    draw = false;
});


/**
 * korrigiert Maus-position auf screen zu Maus-Position auf canvas
 * wenn Maus gedrückt gehalten wird, wird Zeichen-Funktion aufgerufen
 * @param event
 */
function position_handler(event) {
    let canvas = document.getElementById('canvas');
    x = event.pageX - canvas.offsetLeft;
    y = event.pageY - canvas.offsetTop;
    if (draw) {
        draw_circle();
    }
}


/**
 * Ändert Modus zwischen Zeichnen (1), Füllen (2) und Form-Modus (3)
 * @param new_mode
 * @param activeButton
 **/

function change_mode(new_mode, activeButton) {
    mode = new_mode;
    let mode_buttons = document.querySelectorAll(".btn-mode");
    mode_buttons.forEach(button => button.classList.remove("active"));
    activeButton.classList.add("active");
    if (mode == 3) {
        alert("Formenfenster öffnen");
    }
}


/**
 * Ändert ausgewählte Farbe
 * @param new_color
 * @param activeButton
 */

function change_color(new_color, activeButton) {
    activeColor = new_color;
    let color_buttons = document.querySelectorAll(".btn-color");
    color_buttons.forEach(button => button.classList.remove("active"));
    activeButton.classList.add("active");
}


/**
 * ändert ausgewählte Größe
 * @param new_size - Radius
 * @param activeButton
 */

function change_size(new_size, activeButton) {
    activeBrushSize = new_size;
    let size_buttons = document.querySelectorAll(".btn-size");
    size_buttons.forEach(button => button.classList.remove("active"));
    activeButton.classList.add("active");
}


/**
 * Zeichnet Kreis auf Canvas
 */

function draw_circle() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext("2d");
    context.beginPath();
    context.arc(x, y, activeBrushSize, 0, Math.PI * 2, false);
    context.fillStyle = activeColor;
    context.fill();
}


/**
 * Ändert Hintergrundfarbe
 * TODO: Füllalgorithmus
 */

function fill() {
    let canvas = document.getElementById('canvas');
    canvas.style.backgroundColor = activeColor;
}
