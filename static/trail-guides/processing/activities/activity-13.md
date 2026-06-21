---
title: Activity 13
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Use a search engine to find some famous paintings of landscapes. After selecting a landscape, use Java Processing to recreate a simplified version of that scene. All values controlling the position, size, and color of the scene should be set with variables and/or objects.

## Solution

:::code-and-image{src="/images/TODO:"}
```java
void setup(){
	size(400, 400);
	
	// Color values
	color sky = #0082cb;
	color stars = #fffb0a;
	color mountains = #00008b;
	color plant = #5c4033;
	color lightHouse = #e1d9d1;
	color darkHouse = #c4a484;
	color grass = #023020;
	color clouds = #f2f0df;
	color white = #ffffff;
	color black = #000000;
	
	background(sky);
	
	// stars
	stroke(white);
	fill(white);
	circle(150, 220, 40);
	circle(50, 25, 30);
	circle(25, 190, 10);
	fill(stars);
	circle(350, 50, 50);
	circle(290, 80, 20);
	circle(250, 20, 30);
	circle(180, 20, 15);
	circle(150, 10, 18);
	circle(140, 120, 10);
	circle(150, 220, 7);
	circle(100, 70, 25);
	circle(100, 20, 15);
	circle(50, 25, 15);
	circle(75, 200, 20);
	
	// grass and trees
	fill(grass);
	noStroke();
	rect(0, 300, 400, 100);
	
	// clouds
	fill(clouds);
	ellipse(250, 280, 500, 60);
	ellipse(350, 250, 300, 70);
	
	// mountains
	fill(mountains);
	stroke(black);
	ellipse(250, 300, 500, 80);
	
	// town
	fill(lightHouse);
	rect(200, 340, 60, 30);
	triangle(250, 300, 240, 340, 260, 340);
	rect(280, 370, 60, 30);
	rect(350, 340, 40, 30);
	fill(darkHouse);
	rect(230, 370, 50, 30);
	rect(170, 340, 30, 30);
	rect(300, 330, 50, 40);
	
	noStroke();
	fill(plant);
	triangle(80, 20, 50, 400, 140, 400);
	triangle(130, 230, 50, 400, 180, 400);
}
```
:::
