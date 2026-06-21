---
title: Setting Up a Game Project
authors: Jon Stapleton & Gary Lupton
video: https://www.youtube.com/embed/14I8C6FKINQ
description: Learn how to create a blank game project that uses p5js and the p5play library. This tutorial explains how the "setup" and "draw" functions work, how to test your program, how the p5js coordinate system works, and how to save your work.
type: tutorial
---

:::quick-take{src="TODO:"}
Games made with p5js require at least two ***functions*** to be defined in the code: the `setup()` function, and the `draw()` function. 

- The computer performs the instructions written in `setup()` *once* at the beginning of the program. Your `setup()` function must contain a `createCanvas(width, height)` command to set the size of the game window.
- After running the `setup()` code, the computer begins running the instructions written in `draw()` *over and over again*, repeating the instructions until you click the "stop" button

Check out the example for a basic, blank program.
:::

When you first open the [p5js editor](https://editor.p5js.org), you'll see something like this:

![A screenshot of an empty p5js editor](/TODO:)

This is the **p5js editor**. It allows the developer to write code (using the text editor), turn code into machine executable commands (using the compiler), and view the output produced from the code (using the output window).

The program doesn't start blank--instead, it starts you off with some **boilerplate** (starter code) that you can use to begin your program. Here's what you'll see when you first open a new p5js project:

```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
```

This starter program doesn't do much, but you can test it out. Click the "Play" button near the top-right corner (see the screenshot below), and the computer will read your code and follow the instructions.

![A screenshot of the p5js toolbar with the "play" button highlighted](/TODO:)

You should see a gray square appear to the right. This gray square is the visual that the code told the computer to create. Kind of boring, honestly. Here's some more info about what's going on in the starter code (don't worry, we'll make it more interesting soon enough).

## The `setup()` Function

The first section of code that you'll see in the editor is the `setup()` function.  An easy way to think about this function right now is that the `setup()` function contains instructions, and the computer will follow those instructions first thing as soon as you have it run your program. The code snippet below shows what you need to type to create the `setup()` function:

```js
function setup(){
	createCanvas(400,400)
  // Your code goes here
}
```

The line that says `// Your code goes here` isn't code that the computer will do anything with. Any line that begins with `//` is called a **comment**, and the computer will ignore it. Comments are good for leaving notes or deactivating lines of code you don't want the computer to execute. You'll see comments in many of the examples in this guide.

With all programming languages, there are rules about how to enter your code. P5js is no exception--there are some specific rules you need to follow to make your program work correctly. We call this the language’s **syntax**. Syntax includes the keywords, symbols, and the way you organize your code. We'll be sure to highlight and explain syntax rules when we come across them.

Here are some quick things to note to avoid errors when you write the `setup()` function:

- Before the word `setup()`, be sure to include the word `function`.  We'll explain that term in more detail later on.  For now, just know that keyword is necessary to avoid getting an error message.
- The word `setup()` always includes the open and close parentheses "`()`" after it.  This tells p5js that "setup" is a function and not a different programming concept. If you forget to include the parentheses, then the editor will display an error message.
- You are going to add some more code to the `setup()` function in a moment; when you do, make sure you write it between the "opening" and "closing" curly braces "`{ }`". Not using the curly braces correctly will result in an error message or cause the program to not work as expected.

## The `createCanvas(x, y)` Command

The code segment below uses the `setup()` function as well as a command: `createCanvas()`. The `createCanvas()` command tells the computer to create an output window to show the results of your code. It also allows you to set that window's width and height using numbers typed between the parentheses (below, we're using `300` for the width, and `200` for the height).

```js
function setup(){  
  createCanvas(300, 200);  
}
```

You'll learn more about the relationship between the `setup()` function and commands like `createCanvas()` later on, but for now you can think of the `setup()` function as a "container" to hold our instructions for the computer to follow. In the code snippet above, the `setup()` function only has one instruction--the `createCanvas()` command.

> **Practice:** Replace the `setup()` function in your program with the function above. Then, click the "Play" button near the top left corner of the application (see the screenshot below). What does the computer do?

Notice three things about the `createCanvas()` command:

- The keyword `createCanvas()` is all lowercase except for the `C` in `Canvas`. This should always be the case. The word `createCanvas` is different from the word `CreateCanvas()` or the word `createcanvas()` in Javascript.  This is because Javascript is a "case-sensitive" language.
- We've used two number values with the `createCanvas()` command (called **arguments**). The first tells the computer how wide to the make the display window. The second sets the display window height. When you write coordinate pairs, the common nomenclature is (x, y). This is very similar. The x-coordinate is replaced with width (horizontal) and the y-coordinate is replaced with height (vertical).
- The command ends with a semicolon. This is *optional* syntax. The code works exacly the same without a semicolon.

The example above uses `createCanvas()` to create an output window that is `300` pixels wide by `200` pixels tall. You can use any positive number in place of these values. Here's an example:

:::code-example{src=TODO:}
```js
function setup() {
    createCanvas(200,600)
}
```
:::

> **Practice:** Try changing the numbers for the width and height of the window and test your changes by clicking the "play" button. What do you notice?

P5js can create all sorts of things if you use different commands after `createCanvas()`. Check out some of the other tutorials on [the map](/map) to see what you can do!

## The `draw()` Function

The other piece of boilerplate you'll see when you first open the p5js editor is the `draw()` function:

```js
function draw() {
	background(220)
	// Your code goes here
}
```

The draw function is a little more complicated than the `setup()` function. Instead of the computer running the code in `draw()` *once* like it does with the code in `setup()`, the computer executes the `setup()` code first, followed by the `draw()` code. Then, it *keeps running the `draw()` code over and over again*. This will become more important later on--for now, just think of the `setup()` section as the code responsible for getting the computer ready, and then the `draw()` code as the instructions responsible for the rest of the work.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Avoid Errors"}
Which of the following `setup()` functions will run without producing an error? The `...` represent additional parameters or commands.

- [ ] `function setup {} ( ... );`
- [ ] `setup( ... );`
- [x] `function setup() { ... }`
- [ ] `setup() { ... }`
:::

:::practice-question{name="Display Dimensions"}
Which of the following correctly describes the dimensions of the output window as shown in this program:

```js
function setup(){  
  createCanvas(400, 300);  
}
```

- [ ] height of 100, width of 100
- [x] width of 400, height of 300
- [ ] width of 700, height of 700
- [ ] height of 400, width of 300

	:::feedback
		The first argument is width (400) and the second argument is height (300).
	:::
:::

:::prompt
Here's the boilerplate p5js program again.

```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
```

Run the program to see what it does. Then, modify the program so the program window is very tall, but very thin.
:::