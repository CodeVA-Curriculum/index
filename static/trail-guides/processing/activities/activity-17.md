---
title: Activity 17
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

In the program below, there is a game character and a timer. The game character is not moving and the timer is not running. Make the game character move from off the left side of the screen to off the right side of the screen and make the timer run while the program is running.

:::code-and-image{src="/images/TODO:"}
```java
// Declare game character values
PImage gameChar;
int xPos;
int yPos;

// Declare timer values
int counter;
int timerX;
int timerY;
int timerSize;
color timerColor;

// Declare ground block values
int blockX;
int blockY;
int blockWidth;
int blockHeight;
int blockSpacing;
color blockColor;

void setup(){
  size(800, 600);
  
  // Initialize game character values
  gameChar = loadImage("images/walkingGuy.png");
  xPos = 0;
  yPos = 470;
  
  // Initialize timer values
  counter = 0;
  timerX = 620;
  timerY = 50;
  timerSize = 40;
  timerColor = #1e5162;
  
  // Initialize ground block values
  blockX = 0;
  blockY = 530;
  blockWidth = 44;
  blockHeight = 10;
  blockSpacing = 2;
  blockColor = #cb4154;
}

void draw(){
  background(#add8e6);
  buildWalk();
  
  // Position the character
  image(gameChar, xPos, yPos);
  
  // Display the timer
  fill(timerColor);
  textSize(timerSize);
  text("Timer: " + counter, timerX, timerY);
}

// This is a code simplification for building rows of blocks
// You can ignore this code for now - you'll learn more about this in an upcoming lesson!
void buildWalk(){
  noStroke();
  fill(blockColor);
  for(int i = 0; i < 18; i++){
    for(int j = 0; j < 3; j++){
      rect(i * (blockWidth + blockSpacing), blockY + j * 2 * (blockHeight + blockSpacing), blockWidth, blockHeight);
      rect(i * (blockWidth + blockSpacing) - blockWidth/2, blockY + blockHeight + blockSpacing + j * 2 * (blockHeight + blockSpacing), blockWidth, blockHeight);
    }
  }
}
```
:::

## Solution

:::code-and-image{src="/images/TODO:"}
```java
// Declare game character values
PImage gameChar;
int xPos;
int yPos;

// Declare timer values
int counter;
int timerX;
int timerY;
int timerSize;
color timerColor;

// Declare ground block values
int blockX;
int blockY;
int blockWidth;
int blockHeight;
int blockSpacing;
color blockColor;

void setup(){
  size(800, 600);
  
  // Initialize game character values
  gameChar = loadImage("images/walkingGuy.png");
  xPos = 0;
  yPos = 470;
  
  // Initialize timer values
  counter = 0;
  timerX = 620;
  timerY = 50;
  timerSize = 40;
  timerColor = #1e5162;
  
  // Initialize ground block values
  blockX = 0;
  blockY = 530;
  blockWidth = 44;
  blockHeight = 10;
  blockSpacing = 2;
  blockColor = #cb4154;
}

void draw(){
  background(#add8e6);
  buildWalk();
  
  // Position the character
  image(gameChar, xPos, yPos);
  xPos += 5;
  
  // Display the timer
  fill(timerColor);
  textSize(timerSize);
  text("Timer: " + counter, timerX, timerY);
  counter++;
}

// This is a code simplification for building rows of blocks
// You can ignore this code for now - you'll learn more about this in an upcoming lesson!
void buildWalk(){
  noStroke();
  fill(blockColor);
  for(int i = 0; i < 18; i++){
    for(int j = 0; j < 3; j++){
      rect(i * (blockWidth + blockSpacing), blockY + j * 2 * (blockHeight + blockSpacing), blockWidth, blockHeight);
      rect(i * (blockWidth + blockSpacing) - blockWidth/2, blockY + blockHeight + blockSpacing + j * 2 * (blockHeight + blockSpacing), blockWidth, blockHeight);
    }
  }
}
```
:::