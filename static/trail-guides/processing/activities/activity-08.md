---
title: Activity 08
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Use the image you created in the third activity for [[activity-06]] as a starting point, and improve your design by adding triangles and using additional colors.

When you're done, your scene might look something like this:

![The output of the solution program below](placeholder)

## Solution

```java
void setup(){
  // setup the canvas size and background color
  size(820, 720);  // use image sizes for screen size
  background(0);  // use '0' for black
  
  // beams
  fill(9, 0, 176);
  stroke(75, 184, 178);
  strokeWeight(4);
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
  fill(236, 156, 83);
  noStroke();
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
  fill(132, 2, 220);
  stroke(75, 184, 178);
  strokeWeight(8);
  circle(175, 400, 40);
  circle(650, 400, 40);
  circle(630, 520, 40);
  circle(520, 640, 40);
  
  // mario, hammer, dk, and princess
  fill(220, 41, 8);
  stroke(237, 197, 198);
  strokeWeight(4);
  triangle(540, 300, 600, 300, 570, 240);
  
  fill(165, 0, 4);
  noStroke();
  triangle(555, 210, 585, 210, 570, 240);
  
  fill(164, 0, 0);
  stroke(237, 197, 198);
  strokeWeight(6);
  triangle(410, 90, 385, 60, 435, 60);
  triangle(380, 130, 340, 100, 340, 160);
  triangle(440, 130, 480, 100, 480, 160);
  circle(410, 130, 100);
  
  fill(251, 118, 255);
  stroke(255, 255, 255);
  strokeWeight(2);
  triangle(240, 130, 310, 130, 275, 95);
  triangle(275, 95, 255, 75, 295, 75);
  circle(275, 65, 20);
}
```