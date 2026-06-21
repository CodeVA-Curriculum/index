---
title: Activity 09
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Create a new Java Processing document with code that creates an abstraction of the game scene shown in the screenshot below as closely as you can.

![[modelImage_sampleScene09.gif]]

## Solution

```java
PImage bricks;
PImage bomberMan;
PImage doors;

void setup(){
  size(960, 930);
  background(0, 144, 0);
  
  fill(179);
  noStroke();
  rect(0, 0, 1020, 150);
  stroke(0);
  // top row of blocks
  rect(-40, 150, 60, 60);
  rect(20, 150, 60, 60);
  rect(80, 150, 60, 60);
  rect(140, 150, 60, 60);
  rect(200, 150, 60, 60);
  rect(260, 150, 60, 60);
  rect(320, 150, 60, 60);
  rect(380, 150, 60, 60);
  rect(440, 150, 60, 60);
  rect(500, 150, 60, 60);
  rect(560, 150, 60, 60);
  rect(620, 150, 60, 60);
  rect(680, 150, 60, 60);
  rect(740, 150, 60, 60);
  rect(800, 150, 60, 60);
  rect(860, 150, 60, 60);
  rect(920, 150, 60, 60);
  
  // bottom row of blocks
  rect(-40, 870, 60, 60);
  rect(20, 870, 60, 60);
  rect(80, 870, 60, 60);
  rect(140, 870, 60, 60);
  rect(200, 870, 60, 60);
  rect(260, 870, 60, 60);
  rect(320, 870, 60, 60);
  rect(380, 870, 60, 60);
  rect(440, 870, 60, 60);
  rect(500, 870, 60, 60);
  rect(560, 870, 60, 60);
  rect(620, 870, 60, 60);
  rect(680, 870, 60, 60);
  rect(740, 870, 60, 60);
  rect(800, 870, 60, 60);
  rect(860, 870, 60, 60);
  rect(920, 870, 60, 60);
  
  // spaced blocks
  rect(20, 270, 60, 60);
  rect(140, 270, 60, 60);
  rect(260, 270, 60, 60);
  rect(380, 270, 60, 60);
  rect(500, 270, 60, 60);
  rect(620, 270, 60, 60);
  rect(740, 270, 60, 60);
  rect(860, 270, 60, 60);
  rect(20, 390, 60, 60);
  rect(140, 390, 60, 60);
  rect(260, 390, 60, 60);
  rect(380, 390, 60, 60);
  rect(500, 390, 60, 60);
  rect(620, 390, 60, 60);
  rect(740, 390, 60, 60);
  rect(860, 390, 60, 60);
  rect(20, 510, 60, 60);
  rect(140, 510, 60, 60);
  rect(260, 510, 60, 60);
  rect(380, 510, 60, 60);
  rect(500, 510, 60, 60);
  rect(620, 510, 60, 60);
  rect(740, 510, 60, 60);
  rect(860, 510, 60, 60);
  rect(20, 630, 60, 60);
  rect(140, 630, 60, 60);
  rect(260, 630, 60, 60);
  rect(380, 630, 60, 60);
  rect(500, 630, 60, 60);
  rect(620, 630, 60, 60);
  rect(740, 630, 60, 60);
  rect(860, 630, 60, 60);
  rect(20, 750, 60, 60);
  rect(140, 750, 60, 60);
  rect(260, 750, 60, 60);
  rect(380, 750, 60, 60);
  rect(500, 750, 60, 60);
  rect(620, 750, 60, 60);
  rect(740, 750, 60, 60);
  rect(860, 750, 60, 60);
  
  // brick blocks
  bricks = loadImage("bricks.png");
  image(bricks, -40, 810);  // column 1
  image(bricks, 20, 210);  // column 2
  image(bricks, 20, 570);
  image(bricks, 20, 690);
  image(bricks, 80, 330);  // column 3
  image(bricks, 80, 630);  
  image(bricks, 80, 690);
  image(bricks, 140, 810);  // column 4
  image(bricks, 200, 210);  // column 5
  image(bricks, 200, 750);
  image(bricks, 200, 810);
  image(bricks, 260, 330);  // column 6
  image(bricks, 260, 810);
  image(bricks, 320, 630);  // column 7
  image(bricks, 320, 750);
  image(bricks, 440, 210);  // column 9
  image(bricks, 440, 270);
  image(bricks, 440, 330);
  image(bricks, 440, 630);
  image(bricks, 440, 750);
  image(bricks, 500, 210);  // column 10
  image(bricks, 500, 450);
  image(bricks, 500, 810);
  image(bricks, 560, 750);  // column 11
  image(bricks, 680, 210);  // column 13
  image(bricks, 680, 750);
  image(bricks, 740, 330);  // column 14
  image(bricks, 740, 450);
  image(bricks, 800, 210);  // column 15
  image(bricks, 800, 390);
  image(bricks, 800, 450);
  image(bricks, 800, 570);
  image(bricks, 860, 330);  // column 16
  image(bricks, 860, 450);
  image(bricks, 860, 810);
  image(bricks, 920, 510);  // column 17
  image(bricks, 920, 690);
  
  // bombs
  fill(0);
  noStroke();
  circle(590, 600, 60);
  circle(590, 720, 60);
  
  // enemies - type 1
  fill(46,218,255);
  stroke(0);
  triangle(680, 570, 710, 510, 740, 570);
  triangle(710, 750, 740, 690, 770, 750);
  triangle(840, 750, 870, 690, 900, 750);
  
  // enemies - type 2
  fill(128, 0, 128);
  noStroke();
  square(265, 215, 50);
  
  // main character
  bomberMan = loadImage("bomberMan.png");
  image(bomberMan, 445, 480);
  
  // level door
  doors = loadImage("doors.png");
  image(doors, 325, 455); 
}
```