---
title: Activity 04
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point, move the existing shapes and adjust the background color in the existing scene to recreate the scene shown in the screenshot below.

![A screenshot of the output of the solution program below](/TODO:)

```java
void setup(){
  // draw the canvas
  size(1100, 570); 
  background(180);
  
  // draw the scene
  circle(850, 130, 100);
  circle(0, 120, 100);  
  circle(105, 250, 100);  
  rect(250, -35, 490, 250);
  rect(360, 315, 60, 60);
  rect(1040, 0, 60, 60);
  rect(775, 420, 300, 60);
  circle(745, 540, 160);
  circle(175, 420, 60);
  circle(355, 450, 80);
  circle(415, 550, 80);
  circle(435, 500, 80);
  circle(910, 390, 60);
  circle(1100, 530, 80);
  rect(0, 530, 1100, 40);
}
```

## Solution

```java
void setup(){
  // draw the canvas, including color
  size(1100, 570); 
  background(50);
  
  // draw the scene
  /* See the model image used to create this scene */
  circle(1040, 55, 100); // top right cloud
  circle(20, 80, 100);  // top left cloud
  circle(45, 350, 100);  // lower right cloud
  rect(200, 35, 490, 250);  // game title sign
  rect(360, 315, 60, 60);  // highest stand along "?" box
  rect(875, 100, 60, 60);  // stand alone "?" box under game title sign
  rect(775, 320, 300, 60);  // block and "?" box row
  circle(645, 540, 160);  // green hill
  circle(225, 500, 60);  // mario
  circle(355, 500, 80);  // first of triple bushes
  circle(415, 500, 80);  // second of triple bushes
  circle(475, 500, 80);  // third of triple bushes
  circle(810, 500, 60);  //goomba
  circle(1010, 500, 80);  // single bush
  rect(0, 530, 1100, 40);  // bottom row of bricks
}
```