---
title: Calling Functions
authors: Jon Stapleton
description: Learn how to call functions in Javascript. This tutorial covers reading library documentation, calling functions, and passing arguments.
type: tutorial
---
:::quick-take
***Functions*** are instructions that tell the computer to do something. You ***call*** functions when you use any of the p5js library commands. For example, you might call the `createCanvas(200, 200)` function to tell the computer to make a game window, and the `circle()` function to tell the computer to display a circle:

:::code-example{src="TODO:"}
```javascript
function setup() {
	createCanvas(200,200)
}
function draw() {
	circle(100, 100, 50)
}
```
:::

The numbers in the parentheses are called ***arguments***. They control *how* the computer follows the command. Every function has its own arguments that control a different thing about the command. Check out the [shapes documentation in the p5js reference library](https://p5js.org/reference/) for some examples.
:::

So far, you've probably noticed the word `function` in your p5js programs. In code, a **function** is a named set of instructions that you, the programmer, can have the computer execute on command. You've seen functions in two contexts:

- **Function definitions,** like `setup()` and `draw()`
- **Function calls,** like `createCanvas(x,y)` and `background(color)`

You'll learn more about **function definitions** later on. For now, you'll only use them by creating the `setup()` and `draw()` sections of your programs.

## Calling Functions

To call a function, you have to write its name, and (often) provide **arguments**. Arguments are the values that you write between the `(` and `)` after the name of the function. Here's an example:

:::code-example{src="TODO:"}
```js
function setup() {
	createCanvas(200,200)
}
function draw() {
	background(220)
	circle(100, 100, 20)
}
```
:::

The program above has three commands, each with its own set of **arguments**:

- `createCanvas()` has two arguments, both of them set to `200`. These represent the width and height of the program window (see the [Game Setup](getting-started.md) tutorial or the [p5js reference](TODO:) for more details about this particular command).
- `background()` has one argument, set to `220`. This argument controls the color of the program window background. See the [p5js reference](TODO:) for more details about this command.
- `circle()` has three arguments. The first two are both set to `100`; these control the position of the circle in the program window. The last one controls the radius of the circle. See the [p5js reference](TODO:) for more details.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Identifying Arguments"}
In the program below, which of the following is an **argument**?

```js
function setup() {
	createCanvas(200,200)
}
function draw() {
	background(220)
	circle(100,100,30)
}
```

- [x] The number `220` in the command `background(220)`
- [ ] The word `circle` in the command `circle(100,100,30)`
- [ ] The word `function`
- [ ] There are no arguments in this program
:::

:::practice-question{name="Identifying Function Calls"}
In the program below, which of the following is a **function call**?

```js
function setup() {
	createCanvas(200,200)
}
function draw() {
	background(220)
	circle(100,100,30)
}
```

- [ ] Line 1, which says `function setup() {`
- [ ] Lines 4-7, which contain the complete `draw()` section
- [ ] Line 5, which says `background(220)`
- [ ] There are no function calls in this program
:::

:::prompt
Try copying the program below into your editor and changing some of the **arguments**. Try all kinds of numbers to see how they affect the results of the program.

:::code-example{src=TODO:}
```js
function setup() {
	createCanvas(200,200)
}
function draw() {
	background(220)
	circle(50, 100, 20)
}
```
:::

After you've done some experimentation, try modifying the program to meet the following criteria:

- [ ] The window is wider than it is tall
- [ ] The background is a dark grey color
- [ ] Add three more circles to create a pair of eyes (see the picture below for an example)

![An image with a black background and grey eyes](TODO:)
:::