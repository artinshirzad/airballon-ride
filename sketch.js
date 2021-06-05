var ball;
var database,position
var ground, player;

function preload(){
  ground = loadImage("cityImage.png");
  player = loadImage("hotairballoon1.png");
}

function setup(){
    createCanvas(windowWidth ,windowHeight-100);
    database = firebase.database();

    ball = createSprite(250,windowHeight-180,100,100);
    ball.addImage(player)
    ball.shapeColor = "red";

    var locofchild=database.ref("ball/position");
    locofchild.on("value", readPosition, showError);
}

function draw(){
    background(ground);
    
      if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
      }
      else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
      }
      else if(keyDown(UP_ARROW) && ball.y>20){
        writePosition(0,-10);
        ball.scale=ball.scale-0.01
      }
      else if(keyDown(DOWN_ARROW) && ball.y<699){
        writePosition(0,+10);
        ball.scale=ball.scale+0.01

      }
      fill(0);
      textSize(20);
      text(ball.y, 100, 100)
      text(ball.x, 100, 150)
      drawSprites();
    
  }

function writePosition(x,y){

    database.ref("ball/position").set({
        x:ball.x + x ,
        y:ball.y + y
    })
    
}

function readPosition(data){
console.log("error")
position= data.val();
ball.x= position.x;
ball.y= position.y;

  
}

function showError(){

    console.log("error");

  }