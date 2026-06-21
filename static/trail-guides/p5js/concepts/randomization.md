---
title: Basic Randomization
authors: Jon Stapleton
description: Learn how to have the computer generate random numbers to use in your game. This tutorial covers the `random(min,max)`, `Math.floor(n)`, `Math.ceil(n)`, and `Math.round(n)`
type: tutorial
---
:::quick-take
Use the `random(min,max)` function to tell the computer to generate a random decimal number from the `min` number to the `max` number. This is useful for creating random variation between Sprites or shapes. Use variables to have the computer store the random numbers, then use them in your sketch:

:::p5sketch
```javascript
let spr
function setup() {
	new Canvas(200,200)
	spr = new Sprite(100,100)
	spr.diameter = random(30, 100)
}
function draw() {
	let rX = random(200,200)
	let rY = random(200,200)
	spr.moveTowards(rX, rY)
}
```
:::

You can use math functions to make the random decimal numbers easier to work with if you want; `Math.floor(r)` returns a rounded-down version of `r`, `Math.ceil(r)` returns a rounded-up version, and `Math.round(r)` returns a version of `r` rounded to nearest whole number in the normal way.
:::