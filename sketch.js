const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground;
var tower1;
var tower2;
var bridge;
var link;
var towerlink;
var stones=[];
var backgroundimage;
var button;
var ground1;
var ground2;
var ground3;
var zombie1;
var zombie2;
var zombie3;
var zombie4;

function preload() {
  zombie1 = loadImage("zombie1.png");
  zombie2 = loadImage("zombie2.png");

  zombie3 = loadImage("zombie3.png");
  zombie4 = loadImage("zombie4.png");

  deadzombie=loadImage("deadzombie.png");

  backgroundimage=loadImage("background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground=new Base(0, height-4, width, 50);
  ground1=new Base(width/2, height-4, width, 50);
  ground2=new Base(width/2+width/4, height-4, width, 50);
  ground3=new Base(width/2+width/3, height-4, width, 50);

  bridge=new Bridge(27, {x:0, y:250});

  towerlink=new Base(width-190, 270, 20, 20);

  Matter.Composite.add(bridge.body, towerlink);
  link=new Link(bridge, towerlink);

  for (let i=0; i<=10; i++) {
    var x=random(width/2+170, width/2-170);
    var y=random(70, 100);
    var stone=new Stone(x, y, 33);
    stones.push(stone);
  }

  zombie = createSprite(width / 2, height - 110);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.addImage("deadzombie", deadzombie);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

  button=createImg("axe.png");
  button.size(45, 45);
  button.position(width - 200, height / 2 - 50);
  button.class("breakbutton");
  button.mousePressed(dropstones);
}

function draw() {
  background(backgroundimage);
  Engine.update(engine);

  bridge.show();

  for (let i=0; i<=10; i++) {
    var distance=dist(ground.body.position.x, ground.body.position.y, stones[i].body.position.x, stones[i].body.position.y);
    if (distance<=4) {
      Matter.World.remove(world, stones[i].body);
    }
    else{
      stones[i].display();
      var d=dist(zombie.position.x, zombie.position.y, stones[i].body.position.x, stones[i].body.position.y);
      if (d<=50) {
        zombie.velocityX=0;
        Matter.Body.setVelocity(stones[i].body, {x:10, y:-10});
        zombie.changeImage("deadzombie");
      }
    }
  }

  if (zombie.position.x >= width - 300) {
    zombie.velocityX = -10;
    zombie.changeAnimation("righttoleft");
  }

  if (zombie.position.x <= 300) {
    zombie.velocityX = 10;
    zombie.changeAnimation("lefttoright");
  }

  drawSprites();
}

function dropstones() {
  link.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
