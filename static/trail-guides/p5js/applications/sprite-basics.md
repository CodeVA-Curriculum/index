---
title: Sprite Basics
authors: Jon Stapleton
description: Learn how to initialize and modify the attributes of objects to create "sprites"--game elements that often have their own coordinate values. This tutorial covers the distinction between primitive variables and objects, assigning values to object attributes, and using object values to display sprites in the program window.
type: tutorial
video: https://www.youtube.com/embed/14I8C6FKINQ
---
:::quick-take
Sprites are ***objects*** that represent the different elements of your game. You will need to create a Sprite for each item, character, or landscape element. 

To make a basic sprite, initialize a variable using a name of your choice, then define attributes between `{` and `}` as shown below. Then, you can use the sprite data to display information on the screen.

```javascript{#example}
let spr // I'll use this variable to store my sprite data

function setup() {
	createCanvas(200,200)
	spr = {
		x: 100,
		y: 100,
		radius: 30
	}
}

function draw() {
	background(255)
	circle(spr.x, spr.y, spr.radius)
}
```
:::


By default, Sprites will be squares. You can change the size of a square Sprite by setting its `width` and `height` ***attributes***. If you set the `diameter` attribute, the Sprite will be displayed as a circle.

To set the location of the Sprite in the game window, assign values to the `x` and `y` attributes as shown.

You do not need to write a command to tell the computer to display the sprite like you would with a shape; the computer displays all Sprites automatically by default in the order you created them.
:::