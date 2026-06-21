---
title: Backgrounds
authors: Jon Stapleton
description: Learn how the p5js backgrounds work. This tutorial covers the `background(color)` method, using the various color options in p5js, and the relationship between the background and the `draw()` function.
type: tutorial
video: https://www.youtube.com/embed/14I8C6FKINQ
---
:::quick-take{src="TODO:"}
Use the `background(color)` command to tell the computer to cover the screen with a particular color.

```javascript
function setup() {
	createCanvas(200, 200)
}

function draw() {
	background(200)
}
```

You can pass a number between `0` and `255` to the `background()` function to have the computer cover the screen with a shade of grey (`0` is black, `255` is white). To have the computer display a real color, pass a color variable to the `background` function as shown in the [[colors]] tutorial.
:::