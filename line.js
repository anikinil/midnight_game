class Line {
    constructor(line, id) {
        this.p1 = { x: line.x1, y: line.y1 };
        this.p2 = { x: line.x2, y: line.y2 };
        this.id = id;
        this.colors = [
            'red',
            'orange',
            'yellow',
            'green',
            'cyan'
        ]
    }

    draw = (ctx) => {
        ctx.beginPath();
        ctx.strokeStyle = this.colors[this.id];
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
        ctx.closePath();
    }
}
