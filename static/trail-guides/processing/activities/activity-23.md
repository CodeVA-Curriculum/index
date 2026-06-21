---
title: Activity 23
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point, create an animation where a shape moves around the screen (either in a defined pattern or randomly) and changes given specific conditions (e.g. up and right movement is always red, down and left movement is always purple, etc; when the shape is in quadrant 1 it’s blue, in quadrant 2 it’s green, etc).

:::code-and-image{src="/images/TODO:"}
```java
int xPos, yPos, shapeDim;
color shapeCol;

void setup(){
  size(800, 600);
  shapeDim = 30;
  xPos = shapeDim;
  yPos = shapeDim;
  shapeCol = color(random(0, 100), random(0, 100), random(0, 100));
}

void draw(){
  background(#ffffff);
  fill(shapeCol);
  circle(xPos, yPos, shapeDim);
  xPos += 2;
  yPos++;
}
```
:::

## Solution

:::code-and-image{src="/images/TODO:"}
```java
int xPos, yPos, shapeDim;
int size1, size2;
int xSpeed, ySpeed;
color shapeCol, col1, col2, col3, col4;
PShape elem;
String shapeType;

void setup(){
  size(800, 600);
  
  // set color variables
  col1 = color(random(0, 100), random(0, 100), random(0, 100));
  col2 = color(random(0, 100), random(0, 100), random(0, 100));
  col3 = color(random(0, 100), random(0, 100), random(0, 100));
  col4 = color(random(0, 100), random(0, 100), random(0, 100));
  
  // set size variables
  size1 = 60;
  size2 = 30;
  
  // initialize shape variables
  shapeDim = size1;
  xPos = shapeDim;
  yPos = shapeDim;
  shapeCol = col1;
  shapeType = "circ";
  
  // initialize speed of movement
  xSpeed = 2;
  ySpeed = 1;
  
  // create the initial shape
  elem = createShape(ELLIPSE, xPos, yPos, shapeDim, shapeDim);
}

void draw(){
  background(#ffffff);
  
  // add the shape to the screen
  fill(shapeCol);
  shape(elem);
  
  // move the shape
  xPos += xSpeed;
  yPos += ySpeed;
  
  // bounce off the walls
  if(shapeType == "circ"){
    if(xPos - shapeDim/2 <= 0 || xPos + shapeDim/2 >= width){
      xSpeed *= -1;
    }
    if(yPos - shapeDim/2 <= 0 || yPos + shapeDim/2 >= height){
      ySpeed *= -1;
    }
  } else if(shapeType == "rect"){
    if(xPos <= 0 || xPos + shapeDim >= width){
      xSpeed *= -1;
    }
    if(yPos <= 0 || yPos + shapeDim >= height){
      ySpeed *= -1;
    }
  }
  
  // change shape while game runs
  if(xPos < 400 && yPos < 300){
    shapeDim = size1;
    elem = createShape(ELLIPSE, xPos, yPos, shapeDim, shapeDim);
    shapeCol = col1;
    shapeType = "circ";
  } else if(xPos >= 400 && yPos < 300){
    shapeDim = size2;
    elem = createShape(RECT, xPos, yPos, shapeDim, shapeDim);
    shapeCol = col2;
    shapeType = "rect";
  }else if(xPos < 400 && yPos >= 300){
    shapeDim = size2;
    elem = createShape(RECT, xPos, yPos, shapeDim, shapeDim);
    shapeType = "rect";
    shapeCol = col3;
  }else if(xPos >= 400 && yPos >= 300){
    shapeDim = size1;
    elem = createShape(ELLIPSE, xPos, yPos, shapeDim, shapeDim);
    shapeCol = col4;
    shapeType = "circ";
  } 
}
```
:::