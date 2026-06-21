---
title: Activity 26
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point, create a game that allows the user to control an object on the screen in order to move around the screen to collect objects and earn points.

:::code-and-image{src="/images/TODO:"}
```java
int xPos, yPos, size, counter, timer, dir;
color bgColor, blockCol;

void setup(){
  size(800, 600);
  bgColor = #789abc;
  blockCol = #00ff00;
  size = 20;
  xPos = width/2 - size/2;
  yPos = height/2 - size/2;
  counter = 0;
  timer = 20;
  dir = 1;
  background(bgColor);
}

void draw(){
  noStroke();
  fill(blockCol);
  rect(xPos, yPos, size, size);
  
  counter++;
  if(counter % timer == 0){
    if(dir == 1){
      xPos += size;
    }
  }
  
}

void keyPressed(){
  
}
```
:::

## Solution

:::code-and-image{src="/images/TODO:"}
```java
int xPos, yPos, size, counter, timer, dir;
color bgColor, blockCol;
int score, itemX, itemY, itemTimer;

void setup(){
  size(800, 600);
  bgColor = #789abc;
  blockCol = #00ff00;
  size = 20;
  xPos = width/2;
  yPos = height/2;
  counter = 0;
  timer = 20;
  dir = 2;
  score = 0;
  itemTimer = 500;
  background(bgColor);
}

void draw(){
  
  noStroke();
  fill(blockCol);
  rect(xPos, yPos, size, size);
  
  counter++;
  if(counter % timer == 0){
    if(dir == 1){
      xPos += size;
    } else if(dir == 2){
      yPos -= size;
    } else if(dir == 3){
      xPos -= size;
    } else if(dir == 4){
      yPos += size;
    }
    if(xPos + size/2 == itemX && yPos + size/2 == itemY){
      score += 100;
    }
    score++;
  }
  
  if(xPos > width){
    xPos = 0;
  } else if(xPos < 0){
    xPos = width - size;
  } else if(yPos > height - size * 2){
    yPos = 0;
  } else if(yPos < 0){
    yPos = height - size * 2;
  }
  
  if(counter % itemTimer == 0){
    fill(#ff0000);
    itemX = size/2 + size * (int) random(0, width/size);
    itemY = size/2 + size * (int) random(0, height/size);
    circle(itemX, itemY, size);
  }
  
  fill(#ffffff);
  rect(0, height - size * 2, 800, size * 2);
  fill(#000000);
  textSize(30);
  text("Score: " + score, 10, 590);
  
}

void keyPressed(){
  if((keyCode == UP || keyCode == 'W') && dir != 4){
    dir = 2;
  } else if((keyCode == LEFT || keyCode == 'A') && dir != 1){
    dir = 3;
  } else if((keyCode == DOWN || keyCode == 'S') && dir != 2){
    dir = 4;
  } else if((keyCode == RIGHT || keyCode == 'D') && dir != 3){
    dir = 1;
  }
}
```
:::