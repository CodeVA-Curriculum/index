---
title: Activity 18
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Modify the program below to create the animation shown in the following screenshot:

![GIF of sampleAnimation18_Solution.pde](/TODO:)

:::code-and-image{src="/images/TODO:"}
```java
// Scene variables
color sky, ground;
int skyHeight, groundHeight;

// sun variables
color sunColor;
int sunSize, sunX, sunY;

// bird flock variables
color birdColor;
int birdSize, birdX, birdY;

// tree variables
color treeColor, leavesColor;
int treeWidth, treeHeight, treeX, treeY;

// animal varaibles
color headColor, bodyColor;
int headSize, bodyWidth, bodyHeight, animalX, animalY, legSize;

void setup(){
  size(800, 600);
  
  // Scene values
  sky = #87ceeb;
  ground = #388004;
  skyHeight = height * 2 / 3;
  groundHeight = height - skyHeight;
  
  // Sun values
  sunColor = #f5f06c;
  sunSize = (int) random(80, 120);
  sunX = (int) random(20, 70);
  sunY = (int) random(30, 100);
  
  // Bird values
  birdColor = #dd7746;
  birdSize = (int) random(25, 55);
  birdX = (int) random(750, 850);
  birdY = (int) random(50, 80);
  
  // Tree values
  treeColor = #725c42;
  leavesColor = #90ee90;
  treeWidth = (int) random(20, 40);
  treeHeight = (int) random(200, 400);
  treeX = (int) random(30, 60);
  treeY = (int) random(420, 500);
  
  // animal values
  headColor = #c4a484;
  bodyColor =#967969;
  headSize = (int) random(20, 30);
  bodyWidth = (int) random(80, 120);
  bodyHeight = bodyWidth / 3;
  animalX = (int) random(-20, 20);
  animalY = (int) random(skyHeight + 10, skyHeight + 100);
  legSize = (int) random(10, 20);
}

void draw(){
  // add code to the draw method
  

}
```
:::

## Solution

:::code-and-image{src="/images/TODO:"}
```java
// Scene variables
color sky, ground;
int skyHeight, groundHeight;

// sun variables
color sunColor;
int sunSize, sunX, sunY;

// bird flock variables
color birdColor;
int birdSize, birdX, birdY;

// tree variables
color treeColor, leavesColor;
int treeWidth, treeHeight, treeX, treeY;

// animal varaibles
color headColor, bodyColor;
int headSize, bodyWidth, bodyHeight, animalX, animalY, legSize;

void setup(){
  size(800, 600);
  
  // Scene values
  sky = #87ceeb;
  ground = #388004;
  skyHeight = height * 2 / 3;
  groundHeight = height - skyHeight;
  
  // Sun values
  sunColor = #f5f06c;
  sunSize = (int) random(80, 120);
  sunX = (int) random(20, 70);
  sunY = (int) random(30, 100);
  
  // Bird values
  birdColor = #dd7746;
  birdSize = (int) random(25, 55);
  birdX = (int) random(750, 850);
  birdY = (int) random(50, 80);
  
  // Tree values
  treeColor = #725c42;
  leavesColor = #90ee90;
  treeWidth = (int) random(20, 40);
  treeHeight = (int) random(200, 400);
  treeX = (int) random(30, 60);
  treeY = (int) random(420, 500);
  
  // animal values
  headColor = #c4a484;
  bodyColor =#967969;
  headSize = (int) random(20, 30);
  bodyWidth = (int) random(80, 120);
  bodyHeight = bodyWidth / 3;
  animalX = (int) random(-20, 20);
  animalY = (int) random(skyHeight + 10, skyHeight + 100);
  legSize = (int) random(10, 20);
}

void draw(){
  // draw sky and ground
  background(sky);
  fill(ground);
  noStroke();
  rect(0, skyHeight, width, groundHeight);
  
  // draw sun
  fill(sunColor);
  circle(sunX, sunY, sunSize);
  sunX++;
  
  // draw birds
  fill(birdColor);
  triangle(birdX, birdY, birdX + birdSize, birdY + birdSize/2, birdX + birdSize, birdY - birdSize/2);
  triangle(birdX + birdSize * 2, birdY - birdSize, birdX + birdSize * 3, birdY - birdSize + birdSize/2, birdX + birdSize * 3, birdY - birdSize - birdSize/2);
  triangle(birdX + birdSize * 2, birdY + birdSize, birdX + birdSize * 3, birdY + birdSize + birdSize/2, birdX + birdSize * 3, birdY + birdSize - birdSize/2);
  birdX -= 2;
  
  // draw animal
  fill(bodyColor);
  rect(animalX, animalY, bodyWidth, bodyHeight);
  rect(animalX + 5, animalY + bodyHeight, legSize, legSize);
  rect(animalX + bodyWidth - legSize - 5, animalY + bodyHeight, legSize, legSize);
  fill(headColor);
  circle(animalX + bodyWidth, animalY, headSize);
  animalX += 4;
  
  // draw trees
  fill(treeColor);
  rect(treeX, treeY, treeWidth, treeHeight);
  rect(treeX + 200, treeY - 10, treeWidth, treeHeight);
  rect(treeX + 400, treeY - 20, treeWidth, treeHeight);
  rect(treeX + 600, treeY - 40, treeWidth, treeHeight);
  fill(leavesColor);
  triangle(treeX + treeWidth/2, treeY - 50, treeX + treeWidth/2 - treeWidth * 2, treeY + 50, treeX + treeWidth/2 + treeWidth * 2, treeY + 50);
  triangle(treeX + treeWidth/2 + 200, treeY - 60, treeX + treeWidth/2 - treeWidth * 2 + 200, treeY + 60, treeX + treeWidth/2 + treeWidth * 2 + 200, treeY + 60);
  triangle(treeX + treeWidth/2 + 400, treeY - 70, treeX + treeWidth/2 - treeWidth * 2 + 400, treeY + 70, treeX + treeWidth/2 + treeWidth * 2 + 400, treeY + 70);
  triangle(treeX + treeWidth/2 + 600, treeY - 90, treeX + treeWidth/2 - treeWidth * 2 + 600, treeY + 90, treeX + treeWidth/2 + treeWidth * 2 + 600, treeY + 90);

}
```
:::