---
title: Activity 20
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point, modify the code so the circle set in the middle of the screen grows constantly. Display a message on the screen that tells the user if the circle fits inside of the screen.

:::code-and-image{src="/images/TODO:"}
```java
float xPos, yPos, size;

void setup(){
  size(600, 600);
  xPos = 300;
  yPos = 300;
  size = 10;
}

void draw(){
  background(255);
  fill(#9242af);
  circle(xPos, yPos, size);
}
```
:::

## Solution

:::code-and-image{src="/images/TODO:"}
```java
float xPos, yPos, size;

void setup(){
  size(600, 600);
  xPos = 300;
  yPos = 300;
  size = 10;
}

void draw(){
  background(255);
  fill(#9242af);
  circle(xPos, yPos, size);
  
  // grow the circle
  size += 3;
  // add the text
  textSize(30);
  fill(0);
  text("The circle fits insides the screen: " + (size < 600), 70, 580);
}
```
:::