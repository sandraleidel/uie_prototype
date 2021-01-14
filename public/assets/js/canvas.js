/** Globale Variablen **/
var x, y;                       // Position der Maus
var r = 10;                     // Radius der gezeichneten Punkte
var draw = false;
var color = '#ffff00';          // aktuell ausgewählte Farbe
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
 * @param button
 **/

function change_mode(new_mode, button) {
    mode = new_mode;
    let mode_buttons = document.getElementsByClassName("mode");
    for (let i = 0; i < mode_buttons.length; i++) {
        mode_buttons[i].style.borderWidth = '2px';
    }
    button.style.borderWidth = '4px';
    if(mode == 3) {
        alert("Formenfenster öffnen");
    }
}


/**
 * Ändert ausgewählte Farbe
 * @param new_color
 * @param button
 */

function change_color(new_color, button) {
    color = new_color;
    let color_buttons = document.getElementsByClassName("color");
    for (let i = 0; i < color_buttons.length; i++) {
        color_buttons[i].style.borderWidth = '2px';
    }
    button.style.borderWidth = '4px';
}


/**
 * ändert ausgewählte Größe
 * @param new_size - Radius
 * @param button
 */

function change_size(new_size, button) {
    r = new_size;
    let size_buttons = document.getElementsByClassName("size");
    for (let i = 0; i < size_buttons.length; i++) {
        size_buttons[i].style.borderWidth = '2px';
    }
    button.style.borderWidth = '4px';
}


/**
 * Zeichnet Kreis auf Canvas
 */

function draw_circle() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext("2d");
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.fillStyle = color;
    context.fill();
}


/**
 * Ändert Hintergrundfarbe
 * TODO: Füllalgorithmus
 */

function fill() {
    let canvas = document.getElementById('canvas');
    canvas.style.backgroundColor = color;
}
