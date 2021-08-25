var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climberGroup;
var ghost, ghostImg;
var iGroup, iBlock;
var gamestate = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  //making the (ugly) ghost
  ghost=createSprite(200,200)
ghost.addImage(ghostImg)
ghost.scale=0.30
spookySound.loop()


  //makeinggroup
  doorsGroup=createGroup()
  climberGroup=createGroup()
  iGroup=createGroup()
}

function draw() {
  background(0);
  if(gamestate=="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    obstacles ()

if (keyDown(LEFT_ARROW)){
ghost.x=ghost.x-4
}
if (keyDown(RIGHT_ARROW )){
  ghost.x=ghost.x+4
  }
if (keyDown("space")){
    ghost.velocityY=-10
    }
    //we love gravity
ghost.velocityY=ghost.velocityY+0.8

if(ghost.isTouching(climberGroup)||ghost.y>600){
gamestate="end"
}


    drawSprites()
  }
  
if(gamestate=="end"){
textSize(55)
fill("#ff1900")
text("Game Over",150,250)
}

}

function obstacles (){
 if (frameCount%250==0){
   //making doors
   door=createSprite(200,-50)
   door.addImage(doorImg)
   door.velocityY=1.5
   door.x=Math.round(random(120,420))
   door.lifetime=600
   doorsGroup.add(door)

ghost.depth=door.depth+1




   //making the climbers
   climber=createSprite(200,10)
   climber.addImage(climberImg)
   climber.velocityY=1.5
   climber.x=door.x
   climber.lifetime=600
   climberGroup.add(climber)

   //making the invisible blocks 
   iBlock=createSprite(200,15)
   iBlock.velocityY=1.5
   iBlock.x=door.x
   iBlock.width=climber.width
   iBlock.height=2
   iGroup.add(iBlock)
   iBlock.visible=false


 }
}
