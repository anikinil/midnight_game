// SETUP ////////////////////////////////////////////////

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const mouse = { x: 0, y: 0 };

canvas.width = innerWidth;
canvas.height = innerHeight;

let lines = [];
let currPlayer = 0;

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

addEventListener('mousedown', () => {
    let newLine = getLine();
    let present = false;

    if (lines.length === 0) {
        lines.push(new Line(newLine, currPlayer));
        currPlayer = (currPlayer != 4 ? currPlayer + 1 : 0);
    } else {
        lines.forEach(l => { if (l.p1.x === newLine.x1 && l.p1.y === newLine.y1 && l.p2.x === newLine.x2 && l.p2.y === newLine.y2) { present = true; } });
        if (!present) { lines.push(new Line(newLine, currPlayer)); currPlayer = (currPlayer != 4 ? currPlayer + 1 : 0); }
    }
});

// DRAW FIELD /////////////////////////////////////////////

var pointRadius = 1;
var pointsDist = 40;
var margin = pointsDist;

var fieldNumX = parseInt(window.innerWidth / pointsDist);
var fieldNumY = parseInt(window.innerHeight / pointsDist);

function drawField() {
    for (var x = 0; x < fieldNumX - 1; x++) {
        for (var y = 0; y < fieldNumY - 1; y++) {
            ctx.beginPath();
            ctx.fillStyle = '#c8c8c8';    
            ctx.arc(margin + x * pointsDist, margin +  y * pointsDist, pointRadius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }

    ctx.beginPath();
    ctx.strokeStyle = '#DDDDDD';
    ctx.lineWidth = 5;

    try {
        let coords = getLine();
        ctx.moveTo(coords.x1, coords.y1);
        ctx.lineTo(coords.x2, coords.y2);
    } catch (Exception) {
        console.log("Move your mouse you idiot...");
    }

    ctx.stroke();
    ctx.closePath();
}

function getLine() {
    let point = {
        x: (mouse.x / pointsDist - 1 > fieldNumX - 2 ? fieldNumX - 2 : mouse.x / pointsDist - 1),
        y: (mouse.y / pointsDist - 1 > fieldNumY - 2 ? fieldNumY - 2 : mouse.y / pointsDist - 1)
    };    

    if (Math.round(point.x) - point.x <= 0 && Math.round(point.y) - point.y <= 0) { // links oben
        if (point.x - Math.round(point.x) >= point.y - Math.round(point.y)) { //oben
            return {
                x1: Math.floor(point.x) * pointsDist + margin,
                y1: Math.floor(point.y) * pointsDist + margin,
                x2: Math.ceil(point.x) * pointsDist + margin,
                y2: Math.floor(point.y) * pointsDist + margin
            }
        } else { // links
            return {
                x1: Math.floor(point.x) * pointsDist + margin,
                y1: Math.floor(point.y) * pointsDist + margin,
                x2: Math.floor(point.x) * pointsDist + margin,
                y2: Math.ceil(point.y) * pointsDist + margin
            }
        }
    }

    if (Math.round(point.x) - point.x >= 0 && Math.round(point.y) - point.y <= 0) { // rechts oben
        if (Math.round(point.x) - point.x >= point.y - Math.round(point.y)) { // oben
            return {
                x1: Math.floor(point.x) * pointsDist + margin,
                y1: Math.floor(point.y) * pointsDist + margin,
                x2: Math.ceil(point.x) * pointsDist + margin,
                y2: Math.floor(point.y) * pointsDist + margin
            }
        } else { // rechts
            return {
                x1: Math.ceil(point.x) * pointsDist + margin,
                y1: Math.floor(point.y) * pointsDist + margin,
                x2: Math.ceil(point.x) * pointsDist + margin,
                y2: Math.ceil(point.y) * pointsDist + margin
            }
        }
    }

    if (Math.round(point.x) - point.x <= 0 && Math.round(point.y) - point.y >= 0) { // links unten
        if (point.x - Math.round(point.x) >= Math.round(point.y) - point.y) { //unten
            return {
                x1: Math.floor(point.x) * pointsDist + margin,
                y1: Math.ceil(point.y) * pointsDist + margin,
                x2: Math.ceil(point.x) * pointsDist + margin,
                y2: Math.ceil(point.y) * pointsDist + margin
            }
        } else { //links
            return {
                x1: Math.floor(point.x) * pointsDist + margin,
                y1: Math.floor(point.y) * pointsDist + margin,
                x2: Math.floor(point.x) * pointsDist + margin,
                y2: Math.ceil(point.y) * pointsDist + margin
            }
        }
    }

    if (Math.round(point.x) - point.x >= 0 && Math.round(point.y) - point.y >= 0) { // rechts unten
        if (Math.round(point.x) - point.x >= Math.round(point.y) - point.y) { // unten
            return {
                x1: Math.floor(point.x) * pointsDist + margin,
                y1: Math.ceil(point.y) * pointsDist + margin,
                x2: Math.ceil(point.x) * pointsDist + margin,
                y2: Math.ceil(point.y) * pointsDist + margin
            }
        } else { // rechts
            return {
                x1: Math.ceil(point.x) * pointsDist + margin,
                y1: Math.floor(point.y) * pointsDist + margin,
                x2: Math.ceil(point.x) * pointsDist + margin,
                y2: Math.ceil(point.y) * pointsDist + margin
            }
        }
    }
}


// ANIMATION LOOP /////////////////////////////

var delay = 300;
function animate() {
    setTimeout(function() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#111111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawField();
        lines.forEach(l => { l.draw(ctx); });
    }, delay);
}

animate();
