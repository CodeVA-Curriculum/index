---
title: Sprite Physics Basics
authors: Jon Stapleton
description: Learn how to manipulate the physical characteristics of Sprite objects. This tutorial covers the `world.gravity` global object and attribute, the `Sprite.collider` attribute, the `Sprite.rotation` attribute, and the `Sprite.applyForce(x,y)` method.
type: tutorial
---
:::quick-take
Sprites are subject to physics automatically. You can change their physical characteristics by modifying their attributes.

:::p5sketch
```javascript
let spr1, spr2, spr3
function setup() {
	new Canvas(200,200)
	spr1 = new Sprite(100,100)
	spr1.image = "🪐"
	spr1.collider = "static" // lock sprite in place
	spr2 = new Sprite(0,0)
	spr2.image = "🛸"
	spr3 = new Sprite(100,0)
	spr3.image = "🪨"
	world.gravity = 2 // turn on gravity
}

function draw() {
	background(255)
	spr2.rotation = 0 // lock rotation
	spr3.moveTowards(mouseX, mouseY)
}
```

The `collider` attribute can make the sprites act differently relative to one another. The default value is `"dynamic"`.

- If you set the `collider` attribute to `"static"`, the Sprite will not move.
- If you set the `collider` attribute to `"none"`, the Sprite will not be affected by physics or collisions with other Sprites
- If you set the `collider` to `kinematic`, the Sprite will not be affected by other Sprites (but it will be affected by gravity and other movement commands, and other Sprites will collide with it)

You can read more about all the physical aspects of Sprites in the [p5play documentation](https://p5play.org/learn/sprite.html?page=1)
:::