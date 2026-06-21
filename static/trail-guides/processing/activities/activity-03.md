---
title: Activity 03
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Activity 03 Guide:  Create a new Java Processing document with code that recreates the scene in screenshot below as closely as you can. You can use the program below as a starting point.

![A screenshot of the output of the solution program below](placeholder)

```java
void setup(){
  size(1200, 750);

  // add your code here
}
```

## Solution

```java
void setup(){
  // draw the canvas
  size(1200, 750);
  
  // draw the scene
  /* top forest cover */
  rect(0, 0, 1200, 150);
  rect(0, 150, 150, 75);
  rect(0, 225, 75, 75);
  rect(675, 150, 150, 75);
  rect(1050, 150, 150, 75);
  rect(1125, 225, 75, 75);
  
  /* bottom forest cover */
  rect(0, 675, 525, 75);
  rect(675, 675, 525, 75);
  rect(0, 600, 150, 75);
  rect(0, 525, 75, 75);
  rect(675, 600, 150, 75);
  rect(1050, 600, 150, 75);
  rect(1125, 525, 75, 75);
  
  /* stand alone trees */
  rect(225, 225, 75, 75);
  rect(375, 225, 75, 75);
  rect(225, 375, 75, 75);
  rect(375, 375, 75, 75);
  rect(225, 525, 75, 75);
  rect(375, 525, 75, 75);
  rect(900, 225, 75, 75);
  rect(900, 375, 75, 75);
  rect(900, 525, 75, 75);
  
  /* enemy objects */
  rect(230, 300, 75, 75);
  rect(500, 600, 75, 75);
  rect(825, 365, 75, 75);
  rect(1050, 240, 75, 75);
  
  /* player & door */
  rect(555, 240, 75, 75);
  rect(525, 75, 75, 75); 
}
```