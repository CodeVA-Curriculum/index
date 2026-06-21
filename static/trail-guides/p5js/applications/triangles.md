---
title: Displaying Triangles
authors: Jon Stapleton
description: Learn how to display triangles in your p5js sketches. This tutorial covers the `triangle(x1,y1,x2,y2,x3,y3)` function, the p5js coordinate system, and reading the p5js documentation.
type: tutorial
---
:::quick-take{src="#example"}
Use the `triangle(x1,y1,x2,y2,x3,y3)` command to instruct the computer to display a triangle. Triangles work differently from [[circles]] and [[rectangles]] in that none of the arguments set the size of the shape; instead, each pair of arguments tells the computer where to put one point of the triangle.

```javascript
function setup() {
	createCanvas(200,200)
	background(255)
	triangle(0, 0, 150, 25, 25, 150)
}
```
:::