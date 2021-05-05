var Balloon,balloonImage1,balloonImage2;
var database;
var positon;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(displayWidth,displayHeight-200);
 database = firebase.database();
  console.log(database)
  var  Balloonheight=database.ref('Balloon/height')
  Balloonheight.on("value",readHeight,showError)
  

  Balloon=createSprite(250,450,150,150);
  Balloon.addAnimation("hotAirBalloon",balloonImage1);
  Balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(touches.length > 0 || keyDown(LEFT_ARROW)){
    
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(-10,0)
    touches = [];
  }
  else if(touches.length > 0 || keyDown(RIGHT_ARROW)){
  
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(10,0)
    touches = [];
  }
  else if(touches.length > 0 || keyDown(UP_ARROW)){
  
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,-10)
    touches = [];
  }
  else if(touches.length > 0 || keyDown(DOWN_ARROW)){
    
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,+10)
    touches = [];
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function updateHeight(x,y){
  database.ref('Balloon/height').set({
    'x' : height.x+x,
    'y' : height.y+y

  })
}
function readHeight(data){
  height=data.val()
  Balloon.x=height.x
    Balloon.y= height.y
    console.log(height.x,height.y)


}
function showError(){
console.log("showError")


}