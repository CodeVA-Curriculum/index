---
title: Activity 21
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point. modify the code to make shape in the scene to move around the screen and change direction when it hits a “border” to keep the shape inside of the specified area.

:::code-and-image{src="/images/TODO:"}
```java
int size, xPos, yPos, initSpeed, xSpeed, ySpeed;

void setup(){
  size(800, 600);
  size = 30;
  xPos = size;
  yPos = size;
  initSpeed = 2;
  xSpeed = initSpeed;
  ySpeed = initSpeed;
}

void draw(){
  background(#012345);
  circle(xPos, yPos, size);
  xPos += xSpeed;
  yPos += ySpeed;
}
```
:::

## Solution

:::code-and-image{src="/images/TODO:"}
```java
int size, xPos, yPos, initSpeed, xSpeed, ySpeed;

void setup(){
  size(800, 600);
  size = 30;
  xPos = size;
  yPos = size;
  initSpeed = 2;
  xSpeed = initSpeed;
  ySpeed = initSpeed;
}

void draw(){
  background(#012345);
  circle(xPos, yPos, size);
  xPos += xSpeed;
  yPos += ySpeed;
  if(xPos >= 800 - size/2 || xPos <= size/2){
    xSpeed = -xSpeed;
  }
  if(yPos >= 600 - size/2 || yPos <= size/2){
    ySpeed = -ySpeed;
  }
}
```
:::