var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload(){
  ki = loadImage("sword.png");
  f1 = loadImage("fruit1.png");
  f2 = loadImage("fruit2.png");
  f3 = loadImage("fruit3.png");
  f4 = loadImage("fruit4.png");
 
  a = loadAnimation("alien1.png","alien2.png");
  
  go = loadImage("gameover.png");
  
  cutingSound = loadSound("knifeSwoosh.mp3")
  
  goSound = loadSound("gameover.mp3")
}

function setup() {
  createCanvas(600, 600);
  knife = createSprite(40,200,20,20);
  knife.addImage("kni",ki);
  knife.addImage("Gameover",go);
  knife.scale=0.7;
  
  enemyGroup = createGroup();
  fruitGroup = createGroup();
}

function draw(){
background(220);
  
  if(gameState === PLAY){
    
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    
    spawnfruits();
  spawnEnemy();
    
    if(fruitGroup.isTouching(knife)){
    fruitGroup.destroyEach();
    score=score+1;
      cutingSound.play();
  }
    
    if(enemyGroup.isTouching(knife)){
    goSound.play();
      gameState=END;
  }
    
  }
  
  if(gameState === END){
  knife.changeImage("Gameover",go);
    knife.x=200;
    knife.y=200;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
  
  }
  
  
  
 
  
  
  
  text("Score: "+ score, 500,50);
  
  drawSprites();
}




function spawnfruits(){
 if (frameCount % 80 === 0){
   position = Math.round(random(1,2));
   var f = createSprite(600,200,20,20);
   f.y = Math.round(random(50,340));
   

   
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: f.addImage(f1);
              break;
      case 2: f.addImage(f2);
              break;
      case 3: f.addImage(f3);
              break;
      case 4: f.addImage(f4);
              break;

      default: break;
    }
   
     f.velocityX=-7;      
    f.scale = 0.2;
    f.lifetime = 100;
   f.velocityX=-(7+(score/4));
   
   if(position===1){
     f.x=600;
     f.velocityX=-(7+(score/4));
   }
   else
   {
     if(position===2){
       f.x=0;
       
       f.velocityX=(7+(score/4));
       
     }
   }
   
   
    fruitGroup.add(f);
 }
}

function spawnEnemy(){
  if(World.frameCount%200===0){
    monster=createSprite(600,200,20,20);
    monster.addAnimation("moving",a);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}