var plr;
var desert,river,road;

var gameState = "start";

function preload(){

  playerI = loadImage("SDG/PI/player7.png");

  desertI = loadImage("SDG/desert.jpeg");
  riverI = loadImage("SDG/river.jpg");
  roadI = loadImage("SDG/road.jpg");
}

function setup() {
  createCanvas(800,800);

  desert = createSprite(400,800);
  desert.addImage("desertI",desertI);
  desert.scale = 1.5;
  desert.visible = false;

  river = createSprite(400,800);
  river.addImage("riverI",riverI);
  river.scale = 1.5;
  river.visible = false;

  road = createSprite(400,800);
  road.addImage("roadI",roadI);
  road.scale = 1.5;
  road.visible = false;

  player1 = createSprite(400, 4045);
  player1.addImage("playerI",playerI);
  player1.scale = 1;
  player1.visible = false;

  player2 = createSprite(400, 4045);
  player2.addImage("playerI",playerI);
  player2.scale = 1;
  player2.visible = false;

  player3 = createSprite(400, 4045);
  player3.addImage("playerI",playerI);
  player3.scale = 1;
  player3.visible = false;
}

function draw() {
  background(255,255,255);  

  background("black");

  drawSprites();

  if(keyDown("space") && gameState=="start"){

    gameState = "lvl1";
  }

  if(player1.y<-2390 && gameState == "lvl1"){

    gameState = "lvl2";
  }

  if(player2.y<-2390 && gameState == "lvl2"){

    gameState = "lvl3";
  }

  if(player3.y<-2390 && gameState == "lvl3"){

    gameState = "over";
  }

  if(gameState == "start"){

    Start();
  }

  if(gameState == "lvl1"){

    Level1();
    Movement("lvl1");
  }

  if(gameState == "lvl2"){

    Level2();
    Movement("lvl2");
  }

  if(gameState == "lvl3"){

    Level3();
    Movement("lvl3");
  }

  if(gameState == "over"){

    Over();
  }

  Position();

  console.log(player1.y)
}

function Start(){

  fill("red");
  textSize(50);
  text("Welcome To Game",170,3500);
  text("Earth On Fire",220,3700);
  text("Press SPACE to Start",140,3900);
}

function Level1(){

 desert.visible = true;
 river.visible = false;
 road.visible = false;

 player1.visible = true;
 player2.visible = false;
 player3.visible = false;

 plr = player1;
}

function Level2(){

 river.visible = true;
 desert.visible = false;
 road.visible = false;

 player2.visible = true;
 player1.visible = false;
 player3.visible = false;

 plr = player2;

}

function Level3(){

  road.visible = true;
  desert.visible = false;
  river.visible = false;

  player3.visible = true;
  player2.visible = false;
  player1.visible = false;

plr = player3;
}

function Over(){

  desert.visible = false;
  river.visible = false;
  road.visible = false;

 player1.visible = false;
 player2.visible = false;
 player3.visible = false;
}

function Position(){

  if(gameState == "start"){

    camera.y = 3700;
  }

  if(gameState == "lvl1"){

    if(player1.y>3700){
  
      camera.y = 3700
    }
    
    if(player1.y<3700 && player1.y>-2090){
    camera.y = player1.y;
    }
  
    if(player1.y<-2090){
      
      camera.y = -2090

    }
  }

  if(gameState == "lvl2"){
    if(player2.y>3700){
  
      camera.y = 3700
    }
    
    if(player2.y<3700 && player2.y>-2090){
    camera.y = player2.y;
    }
  
    if(player2.y<-2090){
      
      camera.y = -2090
    }
  }

  if(gameState == "lvl3"){
    if(player3.y>3700){
  
      camera.y = 3700
    }
    
    if(player3.y<3700 && player3.y>-2090){
    camera.y = player3.y;
    }
  
    if(player3.y<-2090){
      
      camera.y = -2090
    }
  }
}

function Movement(level){

  if(keyDown(UP_ARROW) && gameState == level){

    UP(plr);
  }

  if(keyDown(DOWN_ARROW) && gameState == level){

    DOWN(plr);
  }

  if(keyDown(LEFT_ARROW) && gameState == level){

    Left(plr);
  }

  if(keyDown(RIGHT_ARROW) && gameState == level){

    Right(plr);
  }
}

function UP(player){

  player.y = player.y - 15;
}

function DOWN(player){

  player.y = player.y + 15;
}

function Left(player){

  player.x = player.x - 15;
}

function Right(player){

  player.x = player.x + 15;
}