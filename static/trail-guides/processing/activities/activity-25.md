---
title: Activity 25
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point, create a game that allows the player to earn points by clicking on objects as they appear and disappear from the screen.

:::code-and-image{src="/images/TODO:"}
```java
int xPos, yPos, size;
color color1, color2, color3, col;

void setup(){
  size(800, 600);
  xPos = 400;
  yPos = 300;
  size = 200;
  color1 = #00ff00;
  color2 = #ffff00;
  color3 = #ff0000;
  col = color1;
}

void draw(){
  background(#ffffff);
  noStroke();
  fill(col);
  circle(xPos, yPos, size);
}

void mouseClicked(){
  int colPicker = (int) random(3);
  if(colPicker == 0){
    col = color1;
  } else if(colPicker == 1){
    col = color2;
  } else {
    col = color3;
  }
}
```
:::

## Solution

:::code-and-image{src="/images/TODO:"}
```java
int xPos, yPos, size, counter, speed, score;
color color1, color2, color3, col;

void setup(){
  size(800, 600);
  xPos = 400;
  yPos = 300;
  size = 200;
  color1 = #00ff00;
  color2 = #ffff00;
  color3 = #ff0000;
  col = color1;
  counter = 0;
  speed = 100;
  score = 0;
}

void draw(){
  background(#ffffff);
  fill(#000000);
  textSize(20);
  text("Score: " + score, 20, 590);
  noStroke();
  fill(col);
  rect(xPos, yPos, size, size);
  counter++;
  if(counter % speed == 0){
    xPos = (int) random(0, width - size);
    yPos = (int) random(0, height - size);
    int colPicker = (int) random(3);
    if(colPicker == 0){
      col = color1;
    } else if(colPicker == 1){
      col = color2;
    } else {
      col = color3;
    }
    counter = 0;
  }
}

void mouseClicked(){
  if(mouseX < xPos + size && mouseX > xPos){
    if(mouseY < yPos + size && mouseY > yPos){
      if(col == color1){
        score += 10;
      } else if(col == color3){
        score -= 5;
      }
    }
  }
  
  xPos = (int) random(0, width - size);
  yPos = (int) random(0, height - size);
  int colPicker = (int) random(3);
  if(colPicker == 0){
    col = color1;
  } else if(colPicker == 1){
    col = color2;
  } else {
    col = color3;
  }
  counter = 0;
}
```
:::