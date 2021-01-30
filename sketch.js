// MADE BY NITISH
// WILL COMPLETE ALL PROJECTS AND OTHER STUFF TILL SUNDAY 
const Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Constraint = Matter.Constraint;
var reset;
var treeObj, stone, groundObject, launcher;
var mangoes = [];
var bg;

function preload() {
  boy = loadImage("images/boy.png");
  treeObj=loadImage("images/tree.png");
  bg=loadImage("images/bg.jpg");
}

function setup() {
  createCanvas(1300, 600);
  var engine = Engine.create();
  world = engine.world;

  stone = new Stone(0, 0, 40);
  for (var i = 0; i < 8; i++) {
    if (i < 5) mangoes[i] = new Mango(random(900, 1200), 230, 30);
    else mangoes[i] = new Mango(random(1000, 1100), 130, 30);
  }

  groundObject = new Ground(width / 2, height - 30, width, 70);
  launcher = new Launcher(stone.body, { x: 275, y: 420 });
  
  reset=createButton("RESET");
  reset.position(innerWidth/2-50,30);
  reset.style("background", "#00539CFF");
  reset.style("color", "white");
  reset.style("padding", "10px 28px");
  reset.style("text-align", "center");
  reset.style("border-radius", "10px");
  reset.mousePressed(()=>{window.location.reload()});

  Engine.run(engine);
}

function draw() {
  background(bg);
  image(boy, 200,295, 150, 250);
  image(treeObj, 800, 0,500,600);

  mangoes.forEach((mango) => {
    mango.display();
    collision(stone, mango);
  });

  stone.display();
  groundObject.display();
  launcher.display();
}

function mouseDragged() {
  if(stone.body.position.x<300)
  Body.setPosition(stone.body, { x: mouseX, y: mouseY });
}

function mouseReleased() {
  launcher.fly();
}

function keyPressed() {
  if (keyCode === 32) {
    Body.setPosition(stone.body, { x: 255, y: 420 });
    launcher.attach(stone.body);
  }
}

function collision(stone, mango) {
  var distance = dist(
    stone.body.position.x,
    stone.body.position.y,
    mango.body.position.x,
    mango.body.position.y
  );
  if (distance <= mango.r + stone.r) Matter.Body.setStatic(mango.body, false);
}
