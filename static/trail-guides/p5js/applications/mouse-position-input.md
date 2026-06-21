---
title: Mouse Position Input
authors: Jon Stapleton
description: Learn how to use the mouse position variables built into p5js and the p5play library in your game code. This tutorial covers the `mouseX` and `mouseY` global variables and the `mouse` object.
type: tutorial
---
:::quick-take
The `mouseX` and `mouseY` variables contains values related to the coordinates of the mouse in the game window. These are global variables, which means you don't have to initialize them or set their values.

:::p5sketch
```javascript
let spr
function setup() {
	new Canvas(200,200)
	spr = new Sprite()
	spr.diameter = 15
}

function draw() {
	background(255)
	spr.moveTowards(mouseX, mouseY)
}
```
:::

You can also use the global `mouse.x` and `mouse.y` values in the `mouse` object that comes with p5play. There is no difference between `mouseX` and `mouse.x` or between `mouseY` and `mouse.y`; use whichever you like.
:::