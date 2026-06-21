---
title: Activity 27
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point, create a simple three level game that uses "if" statements to control the levels and developer-defined methods to create the unique levels for the game.

:::code-and-image{src="/images/TODO:"}
```java
int levelNum;

void setup(){
  size(800, 600);
  levelNum = 1;
}

void draw(){
  if(levelNum == 1){
    levelOne();
  } else if(levelNum == 2){
    levelTwo();
  } else if(levelNum == 3){
    levelThree();
  }
}

void keyPressed(){
  levelNum++;
  if(levelNum > 3){
    levelNum = 1;
  }
}

void levelOne(){
  background(#ffffff);
  textSize(40);
  fill(#000000);
  text("Level 1:  Intro Screen", 240, 320);
}

void levelTwo(){
  background(#bbbbbb);
  textSize(40);
  fill(#ff0000);
  text("Level 2:  Game Play", 240, 320);
}

void levelThree(){
  background(#777777);
  textSize(40);
  fill(#abcedf);
  text("Level 3:  Game Over", 240, 320);
}
```
:::

## Solution

:::code-and-image{src="/images/TODO:"}
```java
int levelNum, score, startPos, xPos, yPos, moveSpeed, setSpeed, jumpMax, jumpHeight, coinX, coinY, coinSize, timer, highScore;
color coinColor;
boolean jumping, jumpDir, moveCoin;
PImage ghost;

void setup(){
  size(800, 600);
  levelNum = 1;
  score = 0;
  startPos = 450;
  xPos = 10;
  yPos = startPos;
  moveSpeed = 0;
  setSpeed = 4;
  ghost = loadImage("images/ghostWarrior.png");
  jumping = false;
  jumpDir = true;
  jumpMax = 50;
  jumpHeight = 0;
  coinSize = 30;
  coinX = (int) random(coinSize/2, width - coinSize/2);
  coinY = (int) (startPos - coinSize * 2.5);
  coinColor = #ffff99;
  moveCoin = false;
  timer = 0;
  highScore = Integer.MAX_VALUE;
}

void draw(){
  checkLevel();
  if(levelNum == 2 && score >= 100){
    if(timer < highScore){
      highScore = timer;
    }
    levelNum = 3;
  } else if(levelNum == 2 && score < 100){
    moveCoin();
    timer++;
  }
  playerMovement();
  checkCoinCollision();
}

void keyPressed(){
  // gameplay controls
  if(levelNum == 2){
    if(keyCode == LEFT && moveSpeed >= 0 && !jumping){
      moveSpeed = -setSpeed;
    } else if(keyCode == RIGHT && moveSpeed <= 0 && !jumping){
      moveSpeed = setSpeed;
    }
    if(keyCode == ' '){
      setJump();
    }
  }
  
  // key controls to change between levels
  if(levelNum == 1 && keyCode == ' '){
    // go from intro screen to game level
    levelNum = 2;
  } else if(levelNum == 3 && keyCode == ' '){
    // go from game ending to intro screen
    levelNum = 1;
    timer = 0;
    score = 0;
  }
}

void keyReleased(){
  if(keyCode != ' '){
    moveSpeed = 0;
  }
}

void checkLevel(){
  if(levelNum == 1){
    levelOne();
  } else if(levelNum == 2){
    levelTwo();
  } else if(levelNum == 3){
    levelThree();
  }
}

void levelOne(){
  background(#ffffff);
  textSize(40);
  fill(#000000);
  text("Level 1:  Intro Screen", 240, 320);
}

void levelTwo(){
  background(#bbbbbb);
  textSize(40);
  fill(#ef8734);
  rect(0, 500, 800, 150);
  fill(#000000);
  text("Score: " + score, 20, 575);
  text("Time: " + timer, 420, 575);
  image(ghost, xPos, yPos);
}

void levelThree(){
  background(#777777);
  textSize(40);
  fill(#abcedf);
  text("Game Over", 240, 320);
  text("High Score: " + highScore, 210, 380);
}

void playerMovement(){
  run();
  jump();
}

void run(){
  if(xPos >= 0 && xPos <= width - 70){
    xPos += moveSpeed;
  } else if(xPos > width - 70){
    xPos = width - 70;
  } else if(xPos < 0){
    xPos = 0;
  }
}

void setJump(){
  if(!jumping){
    jumping = true;
  }
}

void jump(){
  if(jumping && jumpHeight <= jumpMax/2 && jumpDir){
    yPos -= 2;
    jumpHeight++;
  } else if(jumping && jumpHeight < jumpMax && jumpDir){
    yPos--;
    jumpHeight++;
  } else if(jumping && jumpHeight == jumpMax && jumpDir){
    jumpDir = false;
    yPos++;
    jumpHeight--;
  } else if(jumping && jumpHeight > jumpMax/2 && !jumpDir){
    jumpHeight--;
    yPos++;
  } else if(jumping && jumpHeight >= 0 && !jumpDir){
    jumpHeight--;
    yPos += 2;
  } else if(jumping){
    yPos = 450;
    jumping = false;
    jumpDir = true;
  }
}

void moveCoin(){
  if(moveCoin){
    coinX = (int) random(coinSize/2, width - coinSize/2);
    moveCoin = false;
  }
  fill(coinColor);
  circle(coinX, coinY, coinSize);
}

void checkCoinCollision(){
  if(xPos + 75 > coinX - coinSize/2 && xPos < coinX + coinSize/2){
    if(yPos < coinY + coinSize/2 && yPos + 75 > coinY - coinSize/2){
      score += 10;
      coinX = -100;
      moveCoin = true;
    }
  }
}
```
:::