---
title: Sprite Movement Basics
authors: Jon Stapleton
description: Learn how to direct the computer to move Sprites around the game scene. Covers the `Sprite.moveTowards(x,y)`, `Sprite.moveTo(x,y)`, and the `Sprite.velocity` and `Sprite.bearing` attributes.
type: tutorial
---
:::quick-take
There are a couple of basic commands you can use to have the computer move Sprites around the screen. The easiest ones are `moveTowards(x,y,speed)` and `moveTo(x,y,speed)`.

- The `moveTowards(x,y,speed)` command makes the Sprite start moving toward the coordinate specified by the `x` and `y` arguments. It will not stop once it gets to the coordinates.
- The `moveTo(x,y,speed)` command makes the Sprite move toward the coordinate specified by the `x` and `y` arguments until it reaches the target. Then, it will stop.

:::p5sketch
```javascript
let spr1, spr2
function setup() {
	new Canvas(200,200)
	spr1 = new Sprite(30, 50)
	spr1.image = "🌵"
	spr2 = new Sprite(30, 150)
	spr2.image = "🌷"

	spr1.moveTowards(150, 50, 8)
	spr2.moveTo(150, 150, 4)
}

function draw() {
	background(255)
}
```
:::

You can also make sprites move by setting their `velocity.x`, `velocity.y`, and `bearing` attributes. Usually, it's easier to just use the methods, though.
:::