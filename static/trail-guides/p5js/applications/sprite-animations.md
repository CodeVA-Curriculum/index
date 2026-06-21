---
title: Creating Sprite Animations
authors: Jon Stapleton
description: Learn how to load images and create animations for your game. This tutorial covers files and filepaths, the `loadAni([files])` function, the `Sprite.newAni(name,animation)` method, and the `Sprite.changeAni(name)` function.
type: tutorial
---
:::quick-take
To set an animation for a Sprite, you need to 1) create an animation object using `loadAni(files)`, 2) apply that animation to a Sprite using the `Sprite.newAni(name, animation)` method, and 3) turn on the Sprite's animation using the `Sprite.changeAni(name)` method.

:::p5sketch{src="TODO:" link}
```javascript
let spr
function preload() {
	let a = loadAni('frame1.png', 'frame2.png')
	spr = new Sprite(100,100)
	spr.addAni('walk', a)
	spr.changeAni('walk')
}

function setup() {
	new Canvas(200,200)
}

function draw() {
	background(255)
}
```
:::

Write the `loadAni(files)` function in the `preload()` function to make sure the computer loads your images before the game starts. Make sure you correctly upload all the files required for the animation and write their names correctly when you use the `loadAni(files)` function.
:::