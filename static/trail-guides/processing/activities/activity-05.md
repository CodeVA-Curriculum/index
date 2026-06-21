---
title: Activity 05
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point, switch out the rectangles for circles while keeping the center point of the rectangle as the center point of the new circle and the size of the circles consistent with the size of the rectangles.

By the time you're done, your scene should look like this:

![A screenshot of the output of the solution program below](/TODO:)

```java
void setup(){
  // set canvas size and color
  size(1200, 750);
  background(180);
  
  // draw the scene
  /* do not change these rectangles */
  rect(0, 0, 1200, 150);
  rect(0, 150, 150, 75);
  rect(0, 225, 75, 75);
  rect(675, 150, 150, 75);
  rect(1050, 150, 150, 75);
  rect(1125, 225, 75, 75);
  rect(0, 675, 600, 75);
  rect(750, 675, 450, 75);
  rect(0, 600, 150, 75);
  rect(0, 525, 75, 75);
  rect(750, 600, 150, 75);
  rect(1050, 600, 150, 75);
  rect(1125, 525, 75, 75);
  rect(600, 75, 75, 75);
  
  /* change these rectangles to circles */
  rect(225, 225, 75, 75);
  rect(375, 225, 75, 75);
  rect(225, 375, 75, 75);
  rect(375, 375, 75, 75);
  rect(225, 525, 75, 75);
  rect(375, 525, 75, 75);
  rect(900, 225, 75, 75);
  rect(900, 375, 75, 75);
  rect(900, 525, 75, 75);
  rect(230, 300, 75, 75);
  rect(500, 600, 75, 75);
  rect(825, 365, 75, 75);
  rect(1050, 240, 75, 75);
  rect(630, 240, 75, 75);
}
```
## Solution
```java
void setup(){
  // set canvas size and color
  size(1200, 750);
  background(180);
  
  // draw the scene
  /* perimeter forest and doorway */
  rect(0, 0, 1200, 150);
  rect(0, 150, 150, 75);
  rect(0, 225, 75, 75);
  rect(675, 150, 150, 75);
  rect(1050, 150, 150, 75);
  rect(1125, 225, 75, 75);
  rect(0, 675, 525, 75);
  rect(675, 675, 525, 75);
  rect(0, 600, 150, 75);
  rect(0, 525, 75, 75);
  rect(675, 600, 150, 75);
  rect(1050, 600, 150, 75);
  rect(1125, 525, 75, 75);
  rect(525, 75, 75, 75);
  
  /* stand along trees */
  circle(257, 257, 75);
  circle(412, 257, 75);
  circle(257, 412, 75);
  circle(412, 412, 75);
  circle(257, 562, 75);
  circle(412, 562, 75);
  circle(932, 257, 75);
  circle(932, 412, 75);
  circle(932, 562, 75);
  circle(257, 328, 75);
  circle(532, 632, 75);
  circle(862, 397, 75);
  circle(1082, 272, 75);
  circle(587, 272, 75);
}
```