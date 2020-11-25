var PLAY = 1;
var gameState = PLAY;
var helicopterIMG, chopper, packageSprite, packageIMG;
var packageBody,ground
const Engine = Matter.Engine;;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var bg;
var stopper;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG = loadImage("package.png")
	bg = loadImage("bg.jpg");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	stopper = createSprite(width/2 + 120, 200, 10, 100);
	stopper.visible = false;

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale = 0.2
	packageSprite.visible = false;2

	chopper=createSprite(width-810, 200, 10,10);
	chopper.addImage(helicopterIMG)
	chopper.scale = 0.6
	chopper.velocityX = 15;

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
	rectMode(CENTER);
	background(bg);

	if (gameState === PLAY) {
		packageSprite.x = chopper.x
		if (chopper.isTouching(stopper)) {
			packageSprite.visible = true;
			chopper.velocityX = 0;
			keyPressed();
		}


	}

	packageSprite.x = packageBody.position.x
	packageSprite.y = packageBody.position.y
	drawSprites();
}


function keyPressed() {
 if (keyCode === DOWN_ARROW) {
	 Matter.Body.setStatic(packageBody, false);

    
  }
}



