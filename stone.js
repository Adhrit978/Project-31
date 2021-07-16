class Stone {
    constructor(x, y, radius) {
        this.radius=radius;
        this.diameter=this.radius*2;
        var options={
            density: 0.001
        }
        this.body=Bodies.circle(x, y, this.radius, options);
        this.image=loadImage("stone.png");
        World.add(world, this.body);
        ellipseMode(RADIUS);
    }
    display() {
        var pos=this.body.position;
        push();
        translate(pos.x, pos.y);
        imageMode(CENTER);
        image(this.image, 0, 0, this.diameter, this.diameter);
        pop();
    }
}