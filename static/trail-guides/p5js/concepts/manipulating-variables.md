---
title: Manipulating Variable Values
authors: Jon Stapleton
description: Learn how to have the computer read and modify the values of primitive variables. This tutorial covers the `+`, `-`, `/`, and `*` with `number` and `String` variables.
type: tutorial
---
:::quick-take
Use arithmetic operators like `+`, `-`, `*`, and `/` with the assignment operator (`=`) to have the computer modify the values of number variables or object attributes (like the location of a Sprite).

:::p5sketch
```javascript
let x = 0
let spr
function setup() {
	new Canvas(200,200)
	spr = new Sprite(100,0)
}

function draw() {
	x = x + 1 // increase x by 1
	spr.diameter = x
	spr.y = spr.y+2 // increase spr.y by 2
}
```
:::

When you have the computer modify variable values in the `draw()` function, you can create simple animations where the Sprites move around based on the variable values.
:::