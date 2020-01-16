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

    let pointX = point.x;
    let pointY = point.y;
    let roundPointX = Math.round(point.x);
    let roundPointY = Math.round(point.y);
    let floorPointXt = Math.floor(point.x) * pointsDist + margin;
    let floorPointYt = Math.floor(point.y) * pointsDist + margin;
    let ceilPointXt = Math.ceil(point.x) * pointsDist + margin;
    let ceilPointYt = Math.ceil(point.y) * pointsDist + margin;

    if (roundPointX - pointX <= 0 && roundPointY - pointY <= 0) { // links oben
        if (pointX - roundPointX >= pointY - roundPointY) { //oben
            return {
                x1: floorPointXt,
                y1: floorPointYt,
                x2: ceilPointXt,
                y2: floorPointYt
            }
        } else { // links
            return {
                x1: floorPointXt,
                y1: floorPointYt,
                x2: floorPointXt,
                y2: ceilPointYt
            }
        }
    }

    if (roundPointX - pointX >= 0 && roundPointY - pointY <= 0) { // rechts oben
        if (roundPointX - pointX >= pointY - roundPointY) { // oben
            return {
                x1: floorPointXt,
                y1: floorPointYt,
                x2: ceilPointXt,
                y2: floorPointYt
            }
        } else { // rechts
            return {
                x1: ceilPointXt,
                y1: floorPointYt,
                x2: ceilPointXt,
                y2: ceilPointYt
            }
        }
    }

    if (roundPointX - pointX <= 0 && roundPointY - pointY >= 0) { // links unten
        if (pointX - roundPointX >= roundPointY - pointY) { //unten
            return {
                x1: floorPointXt,
                y1: ceilPointYt,
                x2: ceilPointXt,
                y2: ceilPointYt
            }
        } else { //links
            return {
                x1: floorPointXt,
                y1: floorPointYt,
                x2: floorPointXt,
                y2: ceilPointYt
            }
        }
    }

    if (roundPointX - pointX >= 0 && roundPointY - pointY >= 0) { // rechts unten
        if (roundPointX - pointX >= roundPointY - pointY) { // unten
            return {
                x1: floorPointXt,
                y1: ceilPointYt,
                x2: ceilPointXt,
                y2: ceilPointYt
            }
            
        } else { // rechts
            return {
                x1: ceilPointXt,
                y1: floorPointYt,
                x2: ceilPointXt,
                y2: ceilPointYt
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
