---
title: Activity 16
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Modify the scene below to use random values for the colors and position of the shapes. With the random values, each shape should stay in its quadrant and each shape color should match the background color of a different quadrant.

:::code-and-image{src="/images/TODO:"}
```java
void setup(){
	size(400, 400);
	background(0);
	
	// All quads values
	int quadWidth = width/2;
	int quadHeight = height/2;
	int r, g, b;
	int shapePosX;
	int shapePosY;
	
	// Quad 1 values
	color q1Color = color(0, 100, 200);
	
	// Quad 2 values
	color q2Color = color(50, 25, 0);
	
	// Quad 3 values
	color q3Color = color(75, 150, 225);
	
	// Quad 4 values
	color q4Color = color(100, 50,0);
	
	noStroke();
	// Quad 1 background and shape
	fill(q1Color);
	rect(0, 0, quadWidth, quadHeight);
	fill(q2Color);
	circle(100, 100, 100);
	
	// Quad 2 background and shape
	fill(q2Color);
	rect(quadWidth, 0, quadWidth, quadHeight);
	fill(q3Color);
	rect(250, 50, 100, 100);
	
	// Quad 3 background and shape
	fill(q3Color);
	rect(0, quadHeight, quadWidth, quadHeight);
	fill(q4Color);
	triangle(100, 250, 50, 350, 150, 350);
	
	// Quad 4 background and shape
	fill(q4Color);
	rect(quadWidth, quadHeight, quadWidth, quadHeight);
	fill(q1Color);
	ellipse(300, 300, 75, 100);
}
```
:::

## Solution

:::code-and-image{src="/images/TODO:"}
```java
void setup(){
	size(400, 400);
	background(0);
	
	// All quads values
	int quadWidth = width/2;
	int quadHeight = height/2;
	int r, g, b;
	int shapePosX;
	int shapePosY;
	int shapeWidth;
	int shapeHeight;
	
	// Quad 1 values
	r = (int) random(0, 255);
	g = (int) random(0, 255);
	b = (int) random(0, 255);
	color q1Color = color(r, g, b);
	
	// Quad 2 values
	r = (int) random(0, 255);
	g = (int) random(0, 255);
	b = (int) random(0, 255);
	color q2Color = color(r, g, b);
	
	// Quad 3 values
	r = (int) random(0, 255);
	g = (int) random(0, 255);
	b = (int) random(0, 255);
	color q3Color = color(r, g, b);
	
	// Quad 4 values
	r = (int) random(0, 255);
	g = (int) random(0, 255);
	b = (int) random(0, 255);
	color q4Color = color(r, g, b);
	
	noStroke();
	// Quad 1 background and shape
	fill(q1Color);
	rect(0, 0, quadWidth, quadHeight);
	fill(q2Color);
	shapeWidth = (int) random(quadWidth/4, quadWidth/2);
	shapePosX = (int) random(shapeWidth/2, quadWidth - shapeWidth/2);
	shapePosY = (int) random(shapeWidth/2, quadHeight - shapeWidth/2);
	circle(shapePosX, shapePosY, shapeWidth);
	
	// Quad 2 background and shape
	fill(q2Color);
	rect(quadWidth, 0, quadWidth, quadHeight);
	fill(q3Color);
	shapeWidth = (int) random(quadWidth/4, quadWidth/2);
	shapeHeight = (int) random(quadHeight/4, quadWidth/2);
	shapePosX = quadWidth + (int) random(0, quadWidth - shapeWidth);
	shapePosY = (int) random(0, quadHeight - shapeHeight);
	rect(shapePosX, shapePosY, shapeWidth, shapeHeight);
	
	// Quad 3 background and shape
	fill(q3Color);
	rect(0, quadHeight, quadWidth, quadHeight);
	fill(q4Color);
	shapeWidth = (int) random(quadWidth/4, quadWidth/2);
	shapeHeight = (int) random(quadHeight/4, quadWidth/2);
	shapePosX = (int) random(shapeWidth/2, quadWidth - shapeWidth/2);
	shapePosY = quadHeight + (int) random(0, quadHeight - shapeHeight);
	triangle(shapePosX, shapePosY, shapePosX - shapeWidth/2, shapePosY + shapeHeight, shapePosX + shapeWidth/2, shapePosY + shapeHeight);
	
	// Quad 4 background and shape
	fill(q4Color);
	rect(quadWidth, quadHeight, quadWidth, quadHeight);
	fill(q1Color);
	shapeWidth = (int) random(quadWidth/4, quadWidth/2);
	shapeHeight = (int) random(quadHeight/4, quadWidth/2);
	shapePosX = quadWidth + (int) random(shapeWidth/2, quadWidth - shapeWidth/2);
	shapePosY = quadHeight + (int) random(shapeHeight/2, quadHeight - shapeHeight/2);
	ellipse(shapePosX, shapePosY, shapeWidth, shapeHeight); 
}
```
:::