---
title: Activity 06
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

![[modelImage_sampleScene06.png]]
Create a new Java Processing document with code that creates an abstraction of the game element shown in the image above as closely as you can.

When you're done, your scene might look something like this:

![A screenshot of the output of the solution program below](placeholder)
## Solution
```java
void setup(){
  // setup the canvas size and background color
  size(820, 720);  // use image sizes for screen size
  background(0);  // use '0' for black
  
  // beams
  rect(250, 130, 50, 20);
  rect(125, 180, 75, 20);
  rect(230, 180, 460, 20);
  rect(100, 300, 100, 20);
  rect(230, 300, 490, 20);
  rect(70, 420, 130, 20);
  rect(230, 420, 360, 20);
  rect(610, 420, 130, 20);
  rect(50, 540, 150, 20);
  rect(225, 540, 365, 20);
  rect(615, 540, 150, 20);
  rect(20, 660, 775, 20);
  
  // ladders
  rect(125, 200, 25, 100);
  rect(230, 200, 25, 100);
  rect(560, 200, 25, 100);
  rect(665, 200, 25, 100);
  rect(100, 320, 25, 100);
  rect(405, 320, 25, 100);
  rect(690, 320, 25, 100);
  rect(70, 440, 25, 100);
  rect(300, 440, 25, 100);
  rect(480, 440, 25, 100);
  rect(715, 440, 25, 100);
  rect(50, 560, 25, 100);
  rect(380, 560, 25, 100);
  rect(740, 560, 25, 100);
  
  // ghosts
  circle(175, 400, 40);
  circle(650, 400, 40);
  circle(630, 520, 40);
  circle(520, 640, 40);
  
  // mario, hammer, dk, and princess
  circle(570, 270, 60);
  circle(570, 225, 30);
  circle(410, 130, 100);
  circle(275, 95, 70);
}
```
