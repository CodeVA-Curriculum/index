---
title: Activity 22
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point, create a tug-of-war game that causes the “rope” shown on the screen to move from one side of the screen to the other until it reaches a point where one side or the other wins.

:::code-and-image{src="/images/TODO:"}
```java
int ropeWidth, ropeHeight, ropeX, ropeY;

void setup(){
  size(800, 600);
  ropeWidth = 650;
  ropeHeight = 40;
  ropeX = (width - ropeWidth)/2;
  ropeY = (height/2) - ropeHeight/2;
}

void draw(){
  background(#ededed);
  // draw the middle line
  line(width/2, 0, width/2, height);
  // draw the rope
  fill(#5c2c06);
  rect(ropeX, ropeY, ropeWidth, ropeHeight);
  // draw the flag
  fill(#ff2929);
  rect(ropeX + ropeWidth/2 - ropeHeight/2, ropeY, ropeHeight, ropeHeight * 3);
}
```
:::

## Solution

:::code-and-image{src="/images/TODO:"}
```java
int ropeWidth, ropeHeight, ropeX, ropeY;

void setup(){
  size(800, 600);
  ropeWidth = 650;
  ropeHeight = 40;
  ropeX = (width - ropeWidth)/2;
  ropeY = (height/2) - ropeHeight/2;
}

void draw(){
  background(#ededed);
  // draw the middle line
  line(width/2, 0, width/2, height);
  // draw the rope
  fill(#5c2c06);
  rect(ropeX, ropeY, ropeWidth, ropeHeight);
  // draw the flag
  fill(#ff2929);
  rect(ropeX + ropeWidth/2 - ropeHeight/2, ropeY, ropeHeight, ropeHeight * 3);
  
  // move the rope
  if(ropeX > 0 && ropeX + ropeWidth < width){
    ropeX += (int) random(-10, 10);
  } 
}
```
:::