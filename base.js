class Base {
    constructor(x, y, width, height) {
        this.width=width;
        this.height=height;
        var options={
            isStatic: true
        }
        this.body=Bodies.rectangle(x, y, this.width, this.height, options);
        World.add(world, this.body);
    }
    display() {
        var pos=this.body.position;
        push();
        translate(pos.x, pos.y)
        rect(0, 0, this.width, this.height);
        pop();
    }
}