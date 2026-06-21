---
title: Activity 12
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point, update the grayscale colors to make a more colorful version of the scene. The only requirement is that the elements of the scene that are currently the same grayscale color one another need to stay the same color. Use the current current grayscale value as the “number” to identify all the elements that will change to the same new color.

:::code-and-image{src="/images/TODO:"}
```java
void setup(){
	size(800, 600);
	background(255);
	
	stroke(10);
	strokeWeight(3);
	fill(200);
	rect(0, 0, 100, 50);
	rect(100, 0, 300, 50);
	fill(250);
	rect(400, 0, 200, 50);
	fill(100);
	rect(600, 0, 200, 125);
	fill(200);
	rect(0, 50, 70, 100);
	rect(0, 150, 70, 200);
	fill(250);
	rect(0, 350, 70, 200);
	fill(200);
	rect(0, 550, 220, 50);
	fill(50);
	rect(70, 50, 330, 250);
	fill(0);
	rect(70, 300, 150, 130);
	fill(200);
	rect(70, 430, 150, 120);
	rect(220, 300, 180, 65);
	rect(220, 365, 180, 65);
	fill(0);
	rect(220, 430, 180, 65);
	fill(250);
	rect(220, 495, 90, 105);
	fill(200);
	rect(310, 495, 90, 105);
	fill(250);
	rect(400, 50, 200, 125);
	fill(200);
	rect(400, 175, 100, 125);
	rect(500, 175, 100, 125);
	rect(400, 300, 200, 65);
	fill(100);
	rect(400, 365, 200, 130);
	fill(50);
	rect(400, 495, 200, 105);
	rect(600, 125, 200, 125);
	fill(200);
	rect(600, 250, 200, 50);
	rect(600, 300, 100, 140);
	rect(700, 300, 100, 140);
	fill(250);
	rect(600, 440, 200, 110);
	rect(600, 550, 200, 50);
}
```
:::

## Solution

:::code-and-image{src="/images/TODO:"}
```java
void setup(){
	size(800, 600);
	
	color white = color(255, 255, 255);
	color black = color(0, 0, 0);
	color red = color(255, 0, 0);
	color yellow = color(255, 255, 0);
	color blue = color(0, 0, 255);
	
	background(white);
	
	stroke(10);
	strokeWeight(6);
	fill(white);
	rect(0, 0, 100, 50);
	rect(100, 0, 300, 50);
	fill(yellow);
	rect(400, 0, 200, 50);
	fill(blue);
	rect(600, 0, 200, 125);
	fill(white);
	rect(0, 50, 70, 100);
	rect(0, 150, 70, 200);
	fill(yellow);
	rect(0, 350, 70, 200);
	fill(white);
	rect(0, 550, 220, 50);
	fill(red);
	rect(70, 50, 330, 250);
	fill(black);
	rect(70, 300, 150, 130);
	fill(white);
	rect(70, 430, 150, 120);
	rect(220, 300, 180, 65);
	rect(220, 365, 180, 65);
	fill(black);
	rect(220, 430, 180, 65);
	fill(yellow);
	rect(220, 495, 90, 105);
	fill(white);
	rect(310, 495, 90, 105);
	fill(yellow);
	rect(400, 50, 200, 125);
	fill(white);
	rect(400, 175, 100, 125);
	rect(500, 175, 100, 125);
	rect(400, 300, 200, 65);
	fill(blue);
	rect(400, 365, 200, 130);
	fill(red);
	rect(400, 495, 200, 105);
	rect(600, 125, 200, 125);
	fill(white);
	rect(600, 250, 200, 50);
	rect(600, 300, 100, 140);
	rect(700, 300, 100, 140);
	fill(yellow);
	rect(600, 440, 200, 110);
	rect(600, 550, 200, 50);
}
```
:::
