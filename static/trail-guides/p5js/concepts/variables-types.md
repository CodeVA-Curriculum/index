---
title: Variables & Data Types
authors: Jon Stapleton
description: Learn how to have the computer initialize, modify, and read the values of `number` and `String` variables. This tutorial covers the `=` assignment operator, the `let` keyword, and the difference between objects like Sprites and primitive variables
type: tutorial
---
:::quick-take
***Variables*** are like containers that the computer uses to store information. The computer can set the value of a variable using the assignment operator (`=`) and then use the variable in place of a number or `String` somewhere in the program (rather than using a ***literal*** value).

:::code-example{src=TODO:}
```javascript
let x = 100
let message = "Hello!"
function setup() {
	createCanvas(200,200)
}
function draw() {
	background(255)
	circle(x, 100, 50)
	text(message, 100, 100)
}
```
:::

Variables are useful because they allow you to give a piece of data a *name* in your program. This can help make it easier to read your code, plus it allows the computer to *change* the value of the variable over the course of the program's runtime. Read more about that in the [manipulating variables](/concepts/manipulating variables) tutorial.
:::

In coding, **variables** are absolutely fundamental. They allow you to create *named containers* for different **primitive values**, like numbers or text. You can then use those named containers *as if they were the values themselves anywhere in your program*. You can even have the computer update those values for you. Variables are very powerful and useful in lots of situations, and you'll see them all over the place in this guide.

## Variable Basics

In p5js, the first thing you can do with variables is *initialize* them. Here's an example of a simple program with one variable:

:::code-example{src=TODO:}
```js
let x = 100 // this is a variable!

function setup() {
	createCanvas(200,200)
}
function draw() {
	background(255)
	circle(x, 100, 20)
}
```
:::

The first line of the program is where you should focus your attention--line 1 of the program initializes a variable called `x`, and tells the computer to set its value to the number `100`. That first line has a lot of new syntax, so here's a breakdown:

![Annotated screenshot of line 1 from the program above, labeling its parts](TODO:)

- `let` is a keyword that tells the computer that the next word is the name of a new variable.
- `x` is the name of the variable in the program. Variables can be named whatever you want--they just have to be one continuous word with no spaces and no special characters.
- `=` is the **assignment operator**. It tells the computer that the next thing it reads after the `=` is the value it should assign to the variable `x`
- `100` is the value assigned to the variable. When the computer reads `x`, it will automatically replace it with the number `100`

*Using* the variable is a lot less complicated. Here's the line from the program above where I use the variable called `x`:

```js
circle(x, 100, 20)
```

The code told the computer to give the variable `x` a value of `100`. The program doesn't contain any instructions to change that value, so when the computer sees `x` in the line above, it replaces it with the number `100` and continues as normal.

## Practice Questions

:::practice-question{name="Identifying Variables"}
TODO:
:::

:::practice-question{name="Tracing Variables"}
TODO:
:::

:::practice-question{name="Avoiding Errors"}
TODO:
:::

:::prompt
TODO:
:::