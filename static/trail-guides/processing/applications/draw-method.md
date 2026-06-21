---
title: The Animation Loop
authors: Gary Lupton, Jon Stapleton
description: Learn how to create simple animations using the `draw()` and the Processing animation loop.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
In this tutorial, we'll cover how to create an **animation loop** using the Processing `draw()` method. The introduction of the `draw()` method represents a significant change in how you might use Java Processing to create programs. With the `draw()` method, static images will become animations. Check out the program below:

:::code-and-image{name="First Animation" src="/images/TODO:"}
```java
// declare variables you want to use in both setup() and draw()  
float xPos;  
float yPos;  
int circSize;  
color bg;  
color circColor;  
  
void setup(){  
  // set the size of the canvas  
  size(800, 600);  
  // initialize variables used in draw()  
  xPos = 50;  
  yPos = 50;  
  circSize = 100;  
  bg = color(135, 206, 235);  
  circColor = color(255, 255, 255);  
}  
  
void draw(){  
  // draw the scene using current variable values  
  background(bg);  
  fill(circColor);  
  noStroke();  
  circle(xPos, yPos, circSize);  
  xPos += 1.33;  
  yPos += 1;  
}
```
:::

Some of this program will be familiar to you (can you find the `setup()` method?) and some will be unfamiliar. The program has three sections: the **variable declaration** section, the **setup method**, and the **draw method**. Read on to learn about each section.

## The Variable Declaration Section

The top section of the program above has declarations for each of the variables and objects that the computer will need to use in the program. 

```java
// Declare variables & objects
float xPos;  
float yPos;  
int circSize;  
color bg;  
color circColor;

void setup() {
	// ... see above for full example
```

Notice that the variables and objects here are declared only, not initialized (meaning they don't have values yet).

## The `setup()` Method

We'll use the `setup()` method to initialize the variables and provide them with their initial values. We also need to define the `size()` of the display window in this section:

```java
// Declare variables & objects
// ...
// see above for full example

void setup() {
	// set the size of the canvas  
	size(800, 600);  
	// initialize variables used in draw()  
	xPos = 50;  
	yPos = 50;  
	circSize = 100;  
	bg = color(135, 206, 235);  
	circColor = color(255, 255, 255);	
}

void draw() {
	// ...
	// see above for full example
```

In the past, you probably included all of your code in the `setup()` method after variable initialization. Now that you're using the `draw()` method, you'll have to write things differently.

## The `draw()` Method

Now, you'll add code to the `draw()` method to direct the computer to display things on the canvas. Here's a simple example to try:

:::code-and-image{src="/images/TODO:"}
```java
// declare variables you want to use in both setup() and draw()  
float xPos;  
float yPos;  
int circSize;  
color bg;  
color circColor;  
  
void setup(){  
  // set the size of the canvas  
  size(800, 600);  
  // initialize variables used in draw()  
  xPos = 50;  
  yPos = 50;  
  circSize = 100;  
  bg = color(135, 206, 235);  
  circColor = color(255, 255, 255);  
}  
  
void draw(){  
  // draw the scene  
  fill(circColor);  
  noStroke();  
  circle(xPos, yPos, circSize);
}
```
:::

The commands in the `draw()` method above should be pretty familiar. Here's what the computer does when it executes the code in the `draw()` section:

1. Draw a background color to the canvas (this covers anything currently on the canvas)
2. Set the fill color for subsequent shapes
3. Remove the outline for subsequent shapes
4. Create a circle at the current value of the `xPos` and `yPos` variables    

That's not all the `draw()` method does, however--it also runs in a constant loop.

## The Animation Loop

The computer executes the code sequence in the `draw()` method over and over again in a loop, never stopping until someone closes the display window. In the example above, it's difficult to tell this is happening. Let's add two more lines of code to the `draw()` method to illustrate what we are able to do now that we've created an animation loop:

:::code-and-image{src="/images/TODO:"}
```java
// declare variables you want to use in both setup() and draw()  
float xPos;  
float yPos;  
int circSize;  
color bg;  
color circColor;  
  
void setup(){  
	// set the size of the canvas  
	size(800, 600);  
	// initialize variables used in draw()  
	xPos = 50;  
	yPos = 50;  
	circSize = 100;  
	bg = color(135, 206, 235);  
	circColor = color(255, 255, 255);  
}  
  
void draw(){  
	// draw the scene
	fill(circColor);  
	noStroke();  
	circle(xPos, yPos, circSize);
	
	// new lines of code!
	xPos += 1.33;  
	yPos += 1;
}
```
:::

The program creates an animation showing the circle "smearing" from the top-left corner of the window to the bottom-right corner. Here's the list of things the computer is doing to make that happen:

1. Set the fill color for subsequent shapes
2. Remove the outline for subsequent shapes
3. Create a circle at the current value of the `xPos` and `yPos` variables    
4. Increase the value of the `xPos` variable by `1.33`
5. Increase the value of the `yPos` variable by `1`
6. **Go back to step #1**

The reason the circle is "smearing" is because the computer is drawing the circle over and over again as it follows step #3, but at slightly different positions each time as the `xPos` and `yPos` variables change in steps #4 and #5. You can make that "smearing" effect go away by adding a `background()`:

:::code-and-image{src="/images/TODO:"}
```java
// ...
// see above for full program
// ...

void draw() {
	background(bg); // add a background to remove smear
	fill(circColor);  
	noStroke();  
	circle(xPos, yPos, circSize);
	
	// new lines of code!
	xPos += 1.33;  
	yPos += 1;
}
```
:::

When the computer runs the `background()` method, it applies the background *over top of all the previous shapes*. This covers up the prior iterations of the `circle()`, hiding the "smear" and making it look like the circle is floating across the screen!

> **Practice:** You can animate any aspect of shapes by using variables and assignment operators. Try recreating the image below by adding this line of code to the `draw()` method: `circSize += 1;`

![An image of the "growing ball" example](/TODO:)

## Other Examples

The strategy you can use to create animations with the `draw()` method is: (1) declare variables and objects, (2) set canvas size and initialize variables and objects in `setup()`, and (3) create code to add background, shapes, and change values in `draw()`. Here are some examples that you can try playing with in your IDE; they might be a little more complicated than other programs you've seen, but don't worry if you have trouble figuring out every detail--look for the variable modification lines to see what is being animated!

:::code-and-image{src="/images/TODO:"}
```java
// declare variables used in both setup() and draw()  
int screenWidth;  
int screenHeight;  
float xPos;  
float yPos;  
int ballSize;  
color bg;  
color ballColor;  
  
void setup(){  
  // set the size of the canvas  
  screenWidth = 800;  
  screenHeight = 600;  
  size(800, 600);  
  // initialize variables used in draw()  
  xPos = 50;  
  yPos = 50;  
  ballSize = 100;  
  bg = color(0, 0, 0);  
  ballColor = color(255, 255, 255);  
}  
  
void draw(){  
  // draw the scene using current variable values  
  background(bg);  
  int r = (int) random(0, 256);  
  int g = (int) random(0, 256);  
  int b = (int) random(0, 256);  
  ballColor = color(r, g, b);  
  ballSize = (int) random(50, 200);  
  xPos = random(ballSize/2, screenWidth - ballSize/2);  
  yPos = random(ballSize/2, screenHeight - ballSize/2);  
  fill(ballColor);  
  noStroke();  
  circle(xPos, yPos, ballSize);  
}
```
:::

:::code-and-image{src="/images/TODO:"}
```java
// declare variables used in both setup() and draw()  
int screenWidth;  
int screenHeight;  
float xPos;  
float yPos;  
int blockWidth;  
int blockHeight;  
color bg;  
color blockColor;  
  
void setup(){  
	// set the size of the canvas  
	screenWidth = 800;  
	screenHeight = 600;  
	size(800, 600);  
	// initialize variables used in draw()  
	xPos = 0;  
	yPos = 550;  
	blockWidth = 40;  
	blockHeight = 10;  
	bg = color(124, 252, 0);  
	blockColor = color(170, 74, 68);  
	background(bg);  
}  
  
void draw(){  
	// draw the scene using current variable values  
	fill(blockColor);  
	stroke(0, 0, 0);  
	rect(xPos, yPos, blockWidth, blockHeight);  
	rect(xPos - blockWidth/2, yPos + blockHeight, blockWidth, blockHeight);  
	rect(xPos, yPos + blockHeight * 2, blockWidth, blockHeight);  
	rect(xPos - blockWidth/2, yPos + blockHeight * 3, blockWidth, blockHeight);  
	rect(xPos, yPos + blockHeight * 4, blockWidth, blockHeight);  
	xPos += blockWidth;  
}
```
:::

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Creating Animations"}
Which of the following are ways that animations can be created with the `draw()` method?  (Select all correct answers)

- [x] Change position of objects
- [x] Change the size of objects
- [x] Change the shape type of objects
- [x] Change the color of objects
:::

:::practice-question{name="How the draw() Method Works"}
Which of the following best describes the way in which the `draw()` method works?

- [ ] Animates objects using descriptive text commands
- [ ] Changes the properties of existing Java Processing objects
- [ ] Uses pre-defined sequences to mimic animations
- [x] Repeatedly calls the commands included in the method in a constant loop
:::

:::practice-question{name="draw() Purpose"}
Which of the following best describes the purpose of the `draw()` method? (Select all that apply)

- [ ] Initialize the variables used in the program
- [ ] Declare variables used in the program
- [ ] Set the size of the canvas
- [x] Call methods to display objects on the canvas
- [x] Modify variable values to create animations
:::