---
title: Colors in p5js
authors: Jon Stapleton
description: Learn how to use color in p5js. This tutorial covers the `color(r,g,b)` function, storing colors as variables, and using the `fill(color)`, `stroke(color)`, and `noStroke()` functions to set the color of shapes.
type: tutorial
---
:::quick-take{src="TODO:"}
The p5js library has two ways to control the colors of shapes. You can use the `fill(color)` and `stroke(color)` commands to set the colors the computer should use when it displays subsequent shapes. Use the `color(r,g,b)` command to create color variables to use with the `fill(color)` and `stroke(color)` commands:

```javascript
let blue = color(0, 0, 255)
let red = color(255, 0, 0)

function setup() {
	createCanvas(200,200)
}

function draw() {
	background(200) // use a number for a shade of gray
	fill(red)
	stroke(blue)
	circle(100, 100, 50)
}
```

Use the `noStroke()` command to turn off outlines for subsequent shapes.
:::