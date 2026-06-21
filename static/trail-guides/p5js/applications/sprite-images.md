---
title: Setting Sprite Images
authors: Jon Stapleton
description: Learn how to load images into `Sprite` objects. This tutorial covers the `preload()` function, uploading images to the p5js web editor, files and filepaths, and setting the `Sprite.image` attribute.
type: tutorial
---
:::quick-take
Sprites, by default, appear as rectangles or circles (depending on the attributes you set; see the [[sprite-basics |Sprite Basics]] tutorial for an example). You can have the computer use an image for the sprite by setting its `image` attribute:

:::p5sketch{link}
```javascript{#example}
let spr
function preload() {
	spr = new Sprite(100,100)
	spr.image = "character.png"
}

function setup() {
	new Canvas(200,200)
}

function draw() {
	background(255)
}
```
:::

Use the `preload()` function so the computer loads up your images before trying to display the Sprite. Make sure you upload the file and type its name/path correctly, otherwise the computer won't be able to find your image.

You can also set Sprite images to emoji symbols instead of images like so: `spr.image = "😃"`. This is useful if you don't have images picked out for your game yet.
:::