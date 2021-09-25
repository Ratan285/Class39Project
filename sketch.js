var boyFalling, boyRunning1, boyFalling;
var coinImage, backgroundImage, stoneImage, restartImage;
var backGround, ground, boy, stone, coin, restartButton;
var stoneGroup, coinGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var r;

function preload() {
  boyFalling = loadAnimation("Boyfalling.png");
  boyRunning = loadAnimation("Boyrunning1.png", "Boyrunning2.png");
  backgroundImage = loadImage("background.jpg");
  coinImage = loadImage("coin.png");
  stoneImage = loadImage("stone.png");
  boyFalling = loadAnimation("Boyfalling.png");
  restartImage = loadImage("Arrow.png");
}

function setup() {
  createCanvas(400, 200)

  backGround = createSprite(300, 100, 20, 20);
  backGround.addImage(backgroundImage);
  backGround.x = backGround.width / 2;

  ground = createSprite(200, 225, 400, 60);
  ground.visible = false;
  ground.debug = true;

  boy = createSprite(50, 180, 50, 50);
  boy.addAnimation("running", boyRunning);
  boy.addAnimation("falling", boyFalling);
  boy.scale = 0.1;
  boy.debug=true

  restartButton = createSprite(200, 100, 20, 20);
  restartButton.addImage(restartImage);
  restartButton.scale = 0.03;
  restartButton.setCollider('circle', 0, 0, restartButton.radius);

  stoneGroup = new Group();
  coinGroup = new Group();

  score = 0;
  

}

function draw() {
  background(0);

  if (gameState === PLAY) {

    restartButton.visible = false;

    boy.changeAnimation("running", boyRunning);

    if (keyDown("space") && boy.y >= 170 ||keyDown("UP_ARROW")&&boy.y>170) {
      boy.velocityY = -15;
    }
    if(keyDown("DOWN_ARROW")){
      boy.velocityY =boy.velocityY+10;
    }

    if (backGround.x < 0) {
      backGround.x = backGround.width / 2;
    }

    backGround.velocityX = -(3 + (score / 10 * 3));
    boy.velocityY = boy.velocityY + 1;

    stoneSpawn();
    coinSpawn();

    if (boy.isTouching(coinGroup)) {
      score = score + 1;
      coinGroup.destroyEach();
    }
    if (stoneGroup.isTouching(stone)) {
      stone.x = stone.x + 5;
    }

    if (boy.isTouching(stoneGroup)) {
      gameState = END;
      stoneGroup.destroyEach();
    }

  }


  if (gameState === END) {

    boy.velocityY = boy.velocityY + 30;

    restartButton.visible = true;

    if (mousePressedOver(restartButton) || keyDown("enter")) {

      gameState = PLAY;
      score = 0;
    }

    boy.velocityX = 0;

    backGround.velocityX = 0;

    coinGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);

    stoneGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);

    coinGroup.destroyEach();
    stoneGroup.destroyEach();

    boy.changeAnimation("falling", boyFalling);

  }

  boy.collide(ground);

  drawSprites();

  text("score: " + score, 350, 20);
  displayText();
  displayComplement();



  stoneGroup.velocityX = coinGroup.velocityX = backGround.velicityX;

}

function stoneSpawn() {

  if (frameCount % 70 === 0) {
    stone = createSprite(random(150, 400), 175, 10, 10);
    stone.addImage(stoneImage);
    stone.scale = 0.5;
    stone.velocityX = -(3 + (score / 10 * 3));
    stone.lifetime = 150;
    
    stoneGroup.add(stone);

  }
}

function coinSpawn() {
  if (frameCount % 100 === 0) {
    coin = createSprite(random(150, 400), random(70, 150), 20, 20);
    coin.velocityX = -(3 + (score / 10 * 3));
    coin.addImage(coinImage);
    coin.scale = 0.09
    coin.lifetime = 150;
    coin.debug = true;
    coinGroup.add(coin);
    
  }
}

function displayText() {
  if (gameState === END) {
    push();
    stroke("Black");
    strokeWeight(2);
    textSize(15);
    text("GAME OVER... PLEASE RESTART THE GAME", 45, restartButton.y - 30);
    pop();
  }
}

function displayComplement() {

  if (frameCount % 10 === 0 && gameState === PLAY) {

    if (score % 10 === 0 && score > 0) {
      r = Math.round(random(0, 3));
      switch (r) {
        case 0:
          stroke("Black");
          textSize(15);
          text("WOW!", 200, 50);
          break;
        case 1:
          text("NICE", 200, 50);
          break;
        case 2:
          text("GoodWork", 200, 50);
          break;
        case 3:
          text("Good!", 200, 50);
          break;
        default:
          break;
      }
    }
  }
  //console.log(r);
}