---
title: Keyboard Input Variables
authors: Jon Stapleton
description: Learn how to access information from keystroke inputs via global variables like `keyCode` and `lastKey`. This tutorial covers `keyCode` and `lastKey`, and explains the relationship between `keyCode` values and individual keys.
type: tutorial
---
:::quick-take
The `keyCode` and `lastKey` variables contain information about the last key the computer sensed being pressed by the user. These variables are global, which means you do not have to initialize them or set their values.

:::p5sketch
```javascript
function setup() {
	new Canvas(200,200)
}

function draw() {
	background(255)
	text(keyCode, 50, 100)
	text(lastKey, 150, 100)
}
```

These variables are really useful for reacting to user input, but they aren't all that helpful on their own. Read the [[keydown-input|tutorial on reacting to keystroke conditions]] for information on how you might use `keyCode` and `lastKey` in your games.
:::