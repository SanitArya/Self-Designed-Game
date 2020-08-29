//Creating Variables for game
var plr;

var desert,river,road;

var gameState = "start";

var temperature = 34;

var stoneGrp,pollutantGrp;

var leftBoundry1,rightBoundry1,leftBoundry2,rightBoundry2,leftBoundry3,rightBoundry3;

var edges;

var state = 0;

var health = 500;

var win,lose,GW,WP,AP;

var winI,loseI,GWI,WPI,API;

var life = 1;

var GOS,clickS,notificationS;









//Loading Images to the variables
function preload(){

  playerI = loadImage("SDG/PI/player.png");
  playerI2 = loadImage("SDG/PI/playerSwim.png");

  desertI = loadImage("SDG/desert.jpeg");
  riverI = loadImage("SDG/river.jpg");
  roadI = loadImage("SDG/road.jpg");

  stoneI1 = loadImage("SDG/m1.png");
  stoneI2 = loadImage("SDG/m2.png");
  stoneI3 = loadImage("SDG/m3.png");

  pollutantI1 = loadImage("SDG/p1.png");
  pollutantI2 = loadImage("SDG/p2.png");
  pollutantI3 = loadImage("SDG/p3.png");

  smokeI1 = loadImage("SDG/s1.png");
  smokeI2 = loadImage("SDG/s2.png");

  winI = loadImage("SDG/youWin.png");

  loseI = loadImage("SDG/youLose.png");

  GWI = loadImage("SDG/globalWarming.jpg");

  WPI = loadImage("SDG/waterPollution.jpg");

  API = loadImage("SDG/airPollution.png");

  soundFormats("mp3");

  GOS = loadSound("Sound/gameOver.mp3");

  clickS = loadSound("Sound/click.mp3");

  notificationS = loadSound("Sound/notification");
 
}














function setup() {

  //Creating canvas
  createCanvas(800,800);

  //Creating desert
  desert = createSprite(400,800);
  desert.addImage("desertI",desertI);
  desert.scale = 1.5;
  desert.visible = false;

  //Creating river
  river = createSprite(400,800);
  river.addImage("riverI",riverI);
  river.scale = 2;
  river.visible = false;

  //Creating road
  road = createSprite(400,800);
  road.addImage("roadI",roadI);
  road.scale = 1.5;
  road.visible = false;


  //Creating Player 1
  player1 = createSprite(400, 4045);
  player1.addImage("playerI",playerI);
  player1.scale = 1;
  player1.visible = false;

  //Creating Player 2
  player2 = createSprite(400, 4045);
  player2.addImage("playerI2",playerI2);
  player2.scale = 1;
  player2.visible = false;

  //Creating Player 3
  player3 = createSprite(400, 4045);
  player3.addImage("playerI",playerI);
  player3.scale = 1;
  player3.visible = false;

  //Creating Groups
  stoneGrp = new Group();
  pollutantGrp = new Group();
  smokeGrp = new Group();

 leftBoundry1 = createSprite(110,3700,10,1500);
 leftBoundry1.visible = false;

 rightBoundry1 = createSprite(690,3700,10,1500);
 rightBoundry1.visible = false;

 leftBoundry2 = createSprite(120,3700,10,1500);
 leftBoundry2.visible = false;

 rightBoundry2 = createSprite(680,3700,10,1500);
 rightBoundry2.visible = false;


 leftBoundry3 = createSprite(160,3700,10,1500);
 leftBoundry3.visible = false;

 rightBoundry3 = createSprite(640,3700,10,1500);
 rightBoundry3.visible = false;

 win = createSprite(400,3700);
 win.addImage("winI",winI);
 win.scale = 2;
 win.visible = false;

 lose = createSprite(400,3650);
 lose.addImage("loseI",loseI)
 lose.visible = false;

 GW = createSprite(400,3700);
 GW.addImage("GWI",GWI);
 GW.scale = 0.80;
 GW.visible = false;

 WP = createSprite(400,3700);
 WP.addImage("WPI",WPI);
 WP.scale = 1.2;
 WP.visible = false;

 AP = createSprite(400,3700);
 AP.addImage("API",API);
 AP.visible = false;
}















function draw() {

  //Coloring Background
  background("black");

  //Displaying Sprites
  drawSprites();

  //Changing Game State
  if(keyDown("space") && gameState== "start" ){

    gameState = "lvl1";
    state = 1;
    clickS.play();
  }

  if(player1.y<-2390 && gameState == "lvl1"){

    gameState = "gw";
    state = 2;
    river.velocityY = 15;
    notificationS.play();

    
  }

  if(keyDown("space") && gameState=="gw" ){

    gameState = "lvl2";
    GW.visible = false;
    clickS.play();

    
  }



  if(player2.y<3390 && gameState == "lvl2" && river.velocityY == 0){

    gameState = "wp";
    state = 3;
    notificationS.play();

  }

  if(keyDown("space") && gameState=="wp" ){

    gameState = "lvl3";
    WP.visible = false;
    clickS.play();

    
  }


  if(player3.y<-2390 && gameState == "lvl3" || temperature>44 || health<=0 || life == 0){

    gameState = "over";
    //GOS.play();
    
  }

  if(keyDown("space") && (gameState == "over") && (temperature>44 || health<=0 || life == 0)){

    Reset();
    clickS.play();

    
  }

  if(keyDown("space") && gameState == "over" && (temperature<44 || health>0 || life == 1)){

    gameState = "ap";
    notificationS.play();

    

  }

  if(keyDown("enter") && gameState == "ap"){

    Reset();
    clickS.play();

  }

  if(river.y == 7700){

    river.velocityY = 0;
  }

  //calling Levels
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

  //Calling camera position function 
  Position();

  DYK();

  console.log(gameState)
}


















//Creating Start function of Game
function Start(){

  fill("red");
  textSize(50);
  text("Welcome To Game",170,3500);
  text("Earth On Fire",220,3700);
  text("Press SPACE to Start",140,3900);
}



//Creating Level 1
function Level1(){

 desert.visible = true;
 river.visible = false;
 road.visible = false;
 
 player1.visible = true;
 player2.visible = false;
 player3.visible = false;

 plr = player1;

 player1.collide(leftBoundry1);
 player1.collide(rightBoundry1);

 if(frameCount%10 == 0){

  temperature = temperature+0.15;
 }


 spawnStone();

}


















//Creating Level 2
function Level2(){

 river.visible = true;
 desert.visible = false;
 road.visible = false;

 player2.visible = true;
 player1.visible = false;
 player3.visible = false;

 plr = player2;

 player2.collide(leftBoundry2);
 player2.collide(rightBoundry2);

 textSize(30);
 fill("white")
 text("LVL:02",6,3355);

 spawnPollutant();

 if(plr.isTouching(pollutantGrp)){
  
  life = 0;
  gameState = "over"
 }

}


















//Creating Level 3
function Level3(){

  road.visible = true;
  desert.visible = false;
  river.visible = false;

  player3.visible = true;
  player2.visible = false;

  plr = player3;

  player3.collide(leftBoundry3);
  player3.collide(rightBoundry3);

  var t = 3355;

 if(plr.y>3700){

  t = 3355;

 }

 if(plr.y<3700 && plr.y>-2090){

  t = plr.y-350;

 }

 if(plr.y<-2090){

  t = -2454

 }

 textSize(30);
 fill("white")
 text("LVL:03",6,t);
 text("HP",706,t);
 text(health,706,t+40)

 
 if(frameCount%20 == 0 || plr.isTouching(smokeGrp)){

    health = health-10;

 }


  spawnSmoke();
}
















//Creating Game Over Function
function Over(){

  desert.visible = false;
  river.visible = false;
  road.visible = false;
  player1.visible = false;
  player2.visible = false;
  player3.visible = false;

 stoneGrp.destroyEach();
 pollutantGrp.destroyEach();
 smokeGrp.destroyEach();

 State();

}



















//Creating camera's position function
function Position(){

  if(gameState == "start"){

    camera.y = 3700;
  }

  if(gameState == "lvl1"){

    if(player1.y>3700){
  
      camera.y = 3700;

      Temperature(3355);

    }
    
    if(player1.y<3700 && player1.y>-2090){
    camera.y = player1.y;

    Temperature(plr.y-350);

    }
  
    if(player1.y<-2090){
      
      camera.y = -2090

      Temperature(-2454)

    }
  }

  if(gameState == "lvl2"){

      camera.y = 3700;
    
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























//Creating Player's movement
function Movement(level){

  if(keyDown(UP_ARROW) && gameState == level){

    UP(plr);
    leftBoundry1.y = player1.y;
    rightBoundry1.y = player1.y;
  }

  if(keyDown(DOWN_ARROW) && gameState == level){

    DOWN(plr);
    leftBoundry1.y = player1.y;
    rightBoundry1.y = player1.y;
  }

  if(keyDown(LEFT_ARROW) && gameState == level){

    Left(plr);
    leftBoundry2.y = player2.y;
    rightBoundry2.y = player2.y;
  }

  if(keyDown(RIGHT_ARROW) && gameState == level){

    Right(plr);
    leftBoundry3.y = player3.y;
    rightBoundry3.y = player3.y;
  }
}















//Creating player's velocities
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




















//Creating Temperature
function Temperature(t){

 textSize(30);
 fill("white")
 text("LVL:01",6,t);
 text("Temp",705,t);
 text(Math.round(temperature)+" °C",706,t+40);

}




















function spawnStone(){

  if(frameCount%25 == 0 && (player1.y<3700 && player1.y>-2090)){

    var stone = createSprite(random(220,570),player1.y - 500);

    rand = Math.round(random(1,3));

    switch(rand){

      case 1:  stone.addImage("stoneI1",stoneI1);
      stone.scale = 2.5;
      case 2:  stone.addImage("stoneI2",stoneI2);
      stone.scale = 2.5;
      case 3:  stone.addImage("stoneI3",stoneI3);
      stone.scale = 2.5;
    }
   
    stoneGrp.add(stone);
  
   }

   player1.collide(stoneGrp);
}























function spawnPollutant(){

  if(frameCount%20 == 0 && (river.velocityY == 15)){

    var pollutant = createSprite(random(180,600),player2.y - 900);

    rand = Math.round(random(1,3));

    switch(rand){

      case 1:  pollutant.addImage("pollutantI1",pollutantI1);
      pollutant.scale = 0.80;
      case 2:  pollutant.addImage("pollutantI2",pollutantI2);
      pollutant.scale = 0.80;
      case 3:  pollutant.addImage("pollutantI3",pollutantI3);
      pollutant.scale = 0.80;
    }

    pollutantGrp.add(pollutant);
    pollutantGrp.setVelocityYEach(15);
    
  
   }

   stoneGrp.destroyEach();
}



















function spawnSmoke(){

  if(frameCount%15 == 0 && (player1.y<3700 && player3.y>-2090)){

    var smoke = createSprite(random(220,560),player3.y - 900);

    rand = Math.round(random(1,2));

    switch(rand){

      case 1:  smoke.addImage("smokeI1",smokeI1);
      smoke.scale = 1;
      case 2:  smoke.addImage("smokeI2",smokeI2);
      smoke.scale = 1;
    }

    smokeGrp.add(smoke);
  
   }

   pollutantGrp.destroyEach();
}
















function Reset(){

  player1.visible = true;
  player2.visible = false;
  player3.visible = false;
  river.visible = false;
  road.visible = false;

  win.visible = false;
  lose.visible = false;

  GW.visible = false;

  WP.visible = false;

  AP.visible = false;

  temperature = 34;

  gameState = "lvl1";

  health = 500;

  state = 1;

  player1.x = 400;
  player1.y = 4050;

  player2.x = 400;
  player2.y = 4050;

  player3.x = 400;
  player3.y = 4050;

  desert.x = 400;
  desert.y = 800;

  river.x = 400;
  river.y = 800;

  road.x = 400;
  road.y = 800;

  river.velocityY = 0;

}

function State(){

    if(state == 1){

      lose.visible = true;

      textSize(40);
      fill("white");
      text("The temperature is above the survival level",10,4000)
      text("Press SPACE to continue",150,4060);
      camera.y = 3700;

    }

    if(state == 2){

      lose.visible = true;

        

      textSize(40);
      fill("white");
      text("You are collided with the pollutant of the river",0,4000);
      text("Press SPACE to continue",150,4060);

      camera.y = 3700;

    }

    if(state == 3 && health<=0){

      lose.visible = true;

      textSize(40);
      fill("white");
      text("You enhailed large amount of harmful gases",0,4000);
      text("Press SPACE to continue",150,4060);

      camera.y = 3700;
    }

    if(state == 3 && health >0){

      win.visible = true;

      textSize(40);
      fill("red");
      text("Press SPACE to continue",150,4060);

      camera.y = 3700;
    }
}















function DYK(){

    if(gameState == "gw"){

    camera.y = 3700;    
    GW.visible = true;

    textSize(40);
    fill("red");
    text("Press SPACE to continue",150,4060);


    desert.visible = false;
    player1.visible = false;
    stoneGrp.destroyEach();

    }
    
    if(gameState == "wp"){

    camera.y = 3700;    
    WP.visible = true;

    textSize(40);
    fill("red");
    text("Press SPACE to continue",150,4060);

    river.visible = false;
    player2.visible = false;
    pollutantGrp.destroyEach();
    }


    if(gameState == "ap"){

    camera.y = 3700;    
    AP.visible = true;

    textSize(40);
    fill("red");
    text("Press ENTER to play again",150,4060);

    road.visible = false;
    player3.visible = false;
    smokeGrp.destroyEach();
    
    }
}

