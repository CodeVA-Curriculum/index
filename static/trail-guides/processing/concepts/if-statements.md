---
title: '"If" Statements'
authors: Gary Lupton, Jon Stapleton
description: Learn how to write instructions which allow the computer to make automated decisions based on comparisons between variables! This is a crucial component of creating games with Processing.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---

**"If" statements** are a core concept in programming. "If" statements allow the program to make a decision based on values stored in variables in the program.  The fact that the values stored in the variables can change over the course of the program (as covered in the tutorial on [manipulating variables](/concepts/manipulating-variables) and the [`draw()` method](/applications/draw-method)) means that the program will not always react the same way.

Boolean values are required to make an "if" statement work. The simplest way to control an "if" statement is with a boolean variable.  Check out the example below:

:::code-and-image{src="/images/TODO:"}
```java
boolean powerUp;  
int speed, xPos;  // initialize two `int` variables
  
void setup(){  
  size(800, 600);  
  powerUp = false;  
  xPos = 0;  
  speed = 2;  
}  
  
void draw(){  
  background(#ffffff); 
  if(powerUp){  
    speed = 4;  
  }  
   
  // update the x-position using the speed variable  
  xPos += speed;  
   
  // draw the circle  
  fill(0);  
  noStroke();  
  circle(xPos, 300, 30);  
}
```
:::

In the example above, the statement `if(powerUp) {` is used to check the value stored in the variable `powerUp`. The value of that variable is either `true` or `false`; when you see a Boolean value inside the parentheses of an "if" statement, it is called a **condition**.

If the computer evaluates the condition as `true`, it will execute the code written between the curly brackets (`{` and `}`) after the "if" statement. If the computer evaluates the condition as `false`, the computer will *skip* the code between the curly brackets. In the example above, the value stored in `powerUp` is `false`, so the computer skips the line of code updating the `speed` variable to 4.

> **Practice:** Try changing the variable `powerUp` to `true`. How does the program's behavior change? Why do you think that is?

## "If" Statements & Relational Expressions

A more powerful way to control an "if" statement is to have the computer generate a boolean value based on a relational expression (check out the [tutorial about Boolean data and relational expressions](/concepts/booleans-comparisons) if these are new to you). When you use a relational expression inside of an "if" statement, the relational expression is the condition for the "if" statement. When you use relational expressions with "if" statements, the computer can modify a variable while running your program to change how it functions without stopping the program:

:::code-and-image{src="/images/TODO:"}
```java
int speed, xPos;  
  
void setup(){  
  size(800, 600);  
  xPos = 0;  
  speed = 2;  
}  
  
void draw(){  
  background(#ffffff);  
  if(xPos > 200){  
    speed = 4;  
  }  
  if(xPos > 600){  
    speed = 2;  
  }  
   
  // update the x-position using the speed variable  
  xPos += speed;  
   
  // draw the circle  
  fill(0);  
  noStroke();  
  circle(xPos, 300, 30);  
}
```
:::

In the example above, the two "if" statements use relational expressions to check the value stored in the `xPos` variable. The `speed` starts at `2` and `xPos` starts with a value of `0`, meaning that the computer will skip the lines of code inside the two "if" statements initially. But once `xPos` is greater than `200`, the computer runs the code in the first "if" statement and updates the variable called `speed` to `4`. Then, once `xPos` is greater than `600`, the computer runs the code in the second "if" statement to update the `speed` to `2`. The "if" statements have the effect of causing the circle to speed up and then slow down as it moves across the screen.

Using relational expressions enables the computer to execute commands at various times while the program is running. With this concept, the program can do things like check the number lives a player has, check to see if a game is finished, check to see if a power-up has been activated, identify when a collision between two game entities has occurred, and much more!

Using conditionals and "if" statements creates many new possibilities for making complex animations and interactive scenes. A future lesson will deal more with collecting user input so that a human has some control over what’s happening in your program. For now, working on using "if" statements to control a range of functionality in a program is a vital step in learning how to create the complex controls and have the computer make decisions as it executes your program.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Tracing 'If' Statements"}
What will be the values stored in "size" and "speed" once the follow code segment has executed?

```java
int size = 10;
int speed = 5;

if(size > 10){  
   speed = 10;  
}

if(speed < 10){  
   size = 5;
}
```

- [x] `size = 10; speed = 5;`
- [ ] `size = 10; speed = 10;`
- [ ] `size = 5; speed = 5;`
- [ ] `size = 5; speed = 10;`
:::

:::practice-question{name="Conditions"}
Which of the follow data types must the variable "running" be in order for the variable speed to be set to 10?

```java
if(running){  
	speed = 10;  
}
```

- [ ] `float`
- [ ] `String`
- [ ] `int`
- [ ] `boolean`
:::

:::prompt{title="Activity 21"}
Using the program below as a starting point. modify the code to make shape in the scene to move around the screen and change direction when it hits a “border” to keep the shape inside of the specified area.

```java
int size, xPos, yPos, initSpeed, xSpeed, ySpeed;

void setup(){
  size(800, 600);
  size = 30;
  xPos = size;
  yPos = size;
  initSpeed = 2;
  xSpeed = initSpeed;
  ySpeed = initSpeed;
}

void draw(){
  background(#012345);
  circle(xPos, yPos, size);
  xPos += xSpeed;
  yPos += ySpeed;
}
```
:::

:::prompt{title="Activity 24"}
Using the starter code below, create an animation that moves from one scene to another as the animation progresses. Use well-defined events in the animation to cause the scene to switch from one to another.

```java
int level = 0;
void setup() {
	size(200, 200)
}
void draw() {
	background(255)
	if(level == 0) {
		// Draw level 0
	}
	if(level == 1) {
		// Draw level 1
	}
	// etc...
}
```
:::