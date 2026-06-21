---
title: Activity 19
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point, add logic that checks to see if the center point of the circle is (1) on the top half of the screen and (2) on the left side of the screen.  Update the text to display the appropriate Boolean value.  

*Run the code multiple times to ensure it works correctly.

```java
int xPos, yPos, size;
color col;

void setup(){
  size(800, 600);
  size = (int) random(50, 200);
  xPos = (int) random(size, 800 - size);
  yPos = (int) random(size, 600 - size);
  col = color(random(0, 255), random(0, 255), random(0, 255));
}

void draw(){
  background(111);
  fill(col);
  circle(xPos, yPos, size);
  
  fill(255);
  textSize(30);
  text("The circle is on the top half of the screen: ", 5, 30);
  text("The cirlce is on the left side of the screen: ", 5, 590);
}
```

## Solution

:::code-and-image{src="/images/TODO:"}
```java
int xPos, yPos, size;
color col;

void setup(){
  size(800, 600);
  size = (int) random(50, 200);
  xPos = (int) random(size, 800 - size);
  yPos = (int) random(size, 600 - size);
  col = color(random(0, 255), random(0, 255), random(0, 255));
}

void draw(){
  background(111);
  fill(col);
  circle(xPos, yPos, size);
  
  fill(255);
  textSize(30);
  text("The circle is on the top half of the screen: " + (yPos < 300), 5, 30);
  text("The cirlce is on the left side of the screen: " + (xPos < 400), 5, 590);
}
```