const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;
var ground;
var fruit,rope;
var fruit_con;
var button,bunny;
var bg_img;
var food;
var rabbit;
//loaded images for food,background and rabbit.
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
//set properties for the button.
  button=createImg("cut_button.png");
  button.position(230,30);
  button.size(30,30);
  button.mouseClicked(drop);
  //created a new ground from ground class.
  ground = new Ground(200,680,600,20);
  //gave properties to bunny and created bunny.
  bunny=createSprite(200,620,100,100);
  bunny.addImage(rabbit);
  bunny.scale=0.2;
  //created new rope from the rope class.
  rope = new Rope(7,{x:245,y:30});
  //created fruiy object.
  fruit = Bodies.circle(300,300,20);
  //added fruit to the rope composite.
  Matter.Composite.add(rope.body,fruit);
//added rope and fruit to link.
  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
//gave properties to background image.
  image(bg_img,width/2,height/2,490,690);

  //rendering the fruit object.
  push();
  imageMode(CENTER);
  if(fruit!=null){
  image(food,fruit.position.x,fruit.position.y,70,70);
  };
  pop();

  //updated engine and displayed rope and ground.
  rope.show();
  Engine.update(engine);
  ground.show();

   drawSprites();
 
   
}
//used user defined function to detach the fruit.
function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con=null;
  
}
