---
title: Variables & Data Types
authors: Gary Lupton, Jon Stapleton
description: Learn how to define variables--named containers for numbers and other kinds of data--to help organize and label values in your programs.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
Regardless of the programming language, variables are one of the most foundational concepts new programmers need to learn to use. In programming, a **variable** is a named location in the computer’s memory that stores a value. That value can be used throughout the program to make the program easier to modify and understand.

Here’s an example of how a variable can be used in a program that displays a circle shape on the screen:

:::code-and-image{name="Circle Size Variable", src="/images/TODO:"}
```java
void setup(){  
  size(800, 600);  
  int ballRadius = 50;  
   
  circle(100, 100, ballRadius);  
}
```
:::

 The program above has one variable in it, called `ballRadius`. The code instructs the computer to assign that variable a value of `50`.  In programming, the `=` means:
 
 > Assign the value to the right of the `=` and store it in the variable to the left of the `=`.
 
 In this code segment, the computer stores a value of `50` in the variable `ballRadius`. After this line of code, whenever the computer "sees" the word `ballRadius` it will interpret that word as the number `50`.
 
 Then, on the last line of the program, the computer uses the `ballRadius` variable as the third argument of the `circle(100, 100, ballSize);` method--the argument that sets the radius size of the circle shape. The computer interprets this variable as `50`, meaning it runs the method as if it were `circle(100, 100, 50);`.

:::practice-question{name="Circle Size & Position"}
The program below includes three variables:

```java
void setup(){  
  size(800, 600);  
  int ballRadius = 50;  
  int ballX = 100;  
  int ballY = 250;  
   
  circle(ballX, ballY, ballRadius);  
}
```

Which call to the `circle()` method is equivalent to the command on line 7 of the program above?

- [ ] `circle(50, 50, 50);`
- [ ] `circle(250, 100, 50);`
- [x] `circle(100, 250, 50);`
- [ ] `circle(50, 100, 250);`
:::
## Naming Variables

Take a closer look at the program from the practice question above:

:::code-and-image{name="Circle Size & Position", src="/images/TODO:"}
```java
void setup(){  
  size(800, 600);  
  int ballRadius = 50;  
  int ballX = 100;  
  int ballY = 250;  
   
  circle(ballX, ballY, ballRadius);  
}
```
:::

Notice how the names used for each variable provide a description of the purpose for value stored in that variable. This is an important aspect of working with variables. The name you assign to the variable should provide meaningful information about the variable’s purpose. This makes the program code easier to read for anyone who might need to understand how the code works (and easier for you to figure out what your code is supposed to do if you forget).

## Data Types

Prior to each variable name in the programs above, we use the keyword `int`. This keyword tells the computer what the variable's **data type** is (in this case, `int` stands for "integer"). In Java programs, you always need to tell the computer what type of data it will store in a given variable in order so it can allocate the correct amount of space in memory for that data.

> **Concept Connection:** If you've used [images](/tutorials/applications/adding-images) in your Processing programs, you've already done something like this with the `PImage` object declarations. Variable types work in a similar same way. You need to give the computer the data type when declaring the variable's value.

In the examples above, each variable we've used holds an integer value, which is why we used the `int` keyword. There are a number of other data types (called "primitive" types as opposed to objects, like `PImage`) that can you can use. Here are four common primitive data types that you are likely to use with Java Processing:

| Data Type | Description                                                                                                                                                                                                             | Example   |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `int`     | holds integer (whole number) values between approximately negative two billion and positive two billion                                                                                                                 | `102`     |
| `float`   | holds fractional values that extend to 6 or 7 decimal places. Can also hold integers (e.g., `25` or `25.0`).                                                                                                            | `3.14`    |
| `boolean` | hold one of two values, true or false                                                                                                                                                                                   | `true`    |
| `String`  | stores character values including letters, words, and special symbols. `String` is not technically a primitive type in Java, but it is a commonly used data type for variables that will be useful with Java Processing | `"Hello"` |
> **Practice:** The example below uses data types for a variety of purposes. Test out the program to see what it does. Try changing the variable values to see how the program changes. The program has some methods you might not be familiar with. Check out the [Processing Reference](https://processing.org/reference/) page for details if you're curious!

```java
void setup(){  
  size(800, 600);  
  // change the any of these variables to see how the output changes  
  int rectWidth = 220;  
  int rectHeight = 50;  
  int startX = 20;  
  int startY = 20;  
  float wordSize = 40.25;  
  float wordY = 60.25;  
  String msg = "Hello, World!";  
  float boolTextY = 100.5;  
  boolean textShows = true;  
   
  rect(startX, startY, rectWidth, rectHeight);  
  textSize(wordSize);  
  fill(100);  
  text(msg, startX, wordY);  
  text("The text is in a box: " + textShows, startX, boolTextY);  
}
```
## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Data Type Errors"}
Which of the following variable declarations and initializations would run without error?

- [x] `float ballSize = 25;`
	::feedback[The number 25 can be a "float" or an "int"; either would be fine here.]
- [ ] `ballSize = 25;`
	::feedback[This option is missing the data type; "int" or "float" would both be appropriate for a value of "25".]
- [ ] `int = 25;`
	::feedback[This option is missing a name for the variable--it only includes the data type "int".]
- [ ] `var ballSize = 25;`
	::feedback["var" isn't an acceptable data type in Java.]
:::

:::practice-question{name="Variable Declaration"}
Which of the following variable declarations is most appropriate for the x-position of a square that represents a rectangular brick in a game?

- [ ] `int brickWidth = 50;`
- [ ] `String brick = 200;`
- [x] `int brickX = 250;`
- [ ] `float brickSize = 150;`
:::

:::practice-question{name="Data Types"}
Which of the following variable data types is not a primitive type in Java?

- [ ] `int`
- [ ] `float`
- [ ] `boolean`
- [x] `String`
:::

:::prompt{title="Activity 11"}
Using the program below as a starting point, update the code to use variables to establish values used in the code instead of “hardcoding” those values into the commands. The logo displayed should look the same after the the code has been updated:

:::code-and-image{src="sampleScene11_Image.png"}
```java
void setup(){
  size(400, 400);
  background(0);
  
  fill(255);
  noStroke();
  circle(200, 150, 250);
  
  fill(0);
  arc(100, 150, 150, 300, PI * -.30, PI * .30);
  arc(300, 150, 150, 300, PI * .70, PI * 1.30);
  
  fill(255);
  arc(90, 150, 150, 300, PI * -.27, PI * .27);
  arc(310, 150, 150, 300, PI * .73, PI * 1.27);
  
  stroke(0);
  strokeWeight(10);
  line(200, 25, 200, 280);
  line(75, 150, 325, 150);
  
  stroke(255);
  strokeWeight(2);
  line(75, 300, 325, 300);
  textSize(44);
  text("BASKETBALL", 80, 340);
  line(75, 353, 325, 353);
}
```
:::

:::

:::prompt{title="Activity-12"}
Using the program below as a starting point, update the grayscale colors to make a more colorful version of the scene. The only requirement is that the elements of the scene that are currently the same grayscale color one another need to stay the same color. Use the current current grayscale value as the “number” to identify all the elements that will change to the same new color.

:::code-and-image
```java
void setup(){
	size(800, 600);
	background(255);
	
	stroke(10);
	strokeWeight(3);
	fill(200);
	rect(0, 0, 100, 50);
	rect(100, 0, 300, 50);
	fill(250);
	rect(400, 0, 200, 50);
	fill(100);
	rect(600, 0, 200, 125);
	fill(200);
	rect(0, 50, 70, 100);
	rect(0, 150, 70, 200);
	fill(250);
	rect(0, 350, 70, 200);
	fill(200);
	rect(0, 550, 220, 50);
	fill(50);
	rect(70, 50, 330, 250);
	fill(0);
	rect(70, 300, 150, 130);
	fill(200);
	rect(70, 430, 150, 120);
	rect(220, 300, 180, 65);
	rect(220, 365, 180, 65);
	fill(0);
	rect(220, 430, 180, 65);
	fill(250);
	rect(220, 495, 90, 105);
	fill(200);
	rect(310, 495, 90, 105);
	fill(250);
	rect(400, 50, 200, 125);
	fill(200);
	rect(400, 175, 100, 125);
	rect(500, 175, 100, 125);
	rect(400, 300, 200, 65);
	fill(100);
	rect(400, 365, 200, 130);
	fill(50);
	rect(400, 495, 200, 105);
	rect(600, 125, 200, 125);
	fill(200);
	rect(600, 250, 200, 50);
	rect(600, 300, 100, 140);
	rect(700, 300, 100, 140);
	fill(250);
	rect(600, 440, 200, 110);
	rect(600, 550, 200, 50);
}
```
:::

:::