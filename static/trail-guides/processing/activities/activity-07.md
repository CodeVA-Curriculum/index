---
title: Activity 07
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point, create an alternative color scheme to the one in the existing program.

```java
void setup(){
  // draw the canvas, including color
  size(1100, 570); 
  background(161, 174, 255);
  
  // draw the scene
  /* See the model image used to create this scene */
  
  fill(50, 79, 4);
  circle(1040, 55, 100);
  circle(20, 80, 100);
  circle(45, 350, 100);
  fill(18, 242, 19);
  rect(200, 35, 490, 250);
  fill(100, 200, 40);
  rect(360, 315, 60, 60);
  rect(875, 100, 60, 60);
  rect(775, 320, 300, 60);
  fill(243, 143, 209);
  circle(645, 540, 160);
  fill(0, 100, 119);
  circle(225, 500, 60);
  fill(227, 50, 198);
  circle(355, 500, 80);
  circle(415, 500, 80);
  circle(475, 500, 80);
  circle(1010, 500, 80);
  fill(17, 171, 71);
  circle(810, 500, 60);
  fill(25, 201, 19);
  rect(0, 530, 1100, 40);
}
```

## Solution

```java
void setup(){
  // draw the canvas, including color
  size(1100, 570); 
  background(161, 174, 255);
  
  // draw the scene
  /* See the model image used to create this scene */
  
  fill(255, 255, 255);
  circle(1040, 55, 100); // top right cloud
  circle(20, 80, 100);  // top left cloud
  circle(45, 350, 100);  // lower right cloud
  fill(222, 88, 24);
  rect(200, 35, 490, 250);  // game title sign
  fill(249, 195, 124);
  rect(360, 315, 60, 60);  // highest stand along "?" box
  rect(875, 100, 60, 60);  // stand alone "?" box under game title sign
  rect(775, 320, 300, 60);  // block and "?" box row
  fill(58, 185, 1);
  circle(645, 540, 160);  // green hill
  fill(244, 72, 32);
  circle(225, 500, 60);  // mario
  fill(198, 227, 50);
  circle(355, 500, 80);  // first of triple bushes
  circle(415, 500, 80);  // second of triple bushes
  circle(475, 500, 80);  // third of triple bushes
  circle(1010, 500, 80);  // single bush
  fill(221, 89, 24);
  circle(810, 500, 60);  // goomba
  fill(222, 87, 27);
  rect(0, 530, 1100, 40);  // bottom row of bricks
}
```