---
title: Manipulating Variables
authors: Gary Lupton, Jon Stapleton
description: Learn how to have the computer recall and modify the values of variables using assignment and arithmetic operators.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
A major advantage of using variables instead of writing number values explicitly is the fact that you can have the computer update the values variables while it runs the program. Changing a variable requires the use of mathematical expressions. Check out the example below:

:::code-and-image{name="Changing Circle Size" src="/images/TODO:"}
```java
void setup(){  
	size(800, 600);  
	// change the any of these values to see how the output changes  
	color firstCirc = color(255, 0, 0);  
	color secondCirc = color(0, 0, 255);  
	
	int circSize = 100;  

	// Display the first circle
	fill(firstCirc);  
	circle(100, 100, circSize);  
	
	circSize = 200;  // update the variable

	// Display the second circle
	fill(secondCirc);  
	circle(100, 250, circSize);  
}
```
:::

> **Practice:** Try changing the `100` or the  `200` on lines 7 and 13. How does the output of the program change?

After the computer initializes the `circSize` variable with a value of `100` on line 7, it uses that variable to set the diameter of the first red circle. Then, the computer changes the value of the `circSize` variable to `200` uses that value to display second ball which is blue and twice as big.

A variable can only store one value at a time. In the example above, the computer changes the value of `circSize` *absolutely*, erasing the old value of `100` and replacing it with `200`.

## Relative Value Changes

You can also have computer modify variables *relatively*. With a relative value change, the computer uses the existing value of the variable as part of a mathematical process to find the new value of the variable. Here's an example:

:::code-and-image{name="Relative Position Change" src="/images/TODO:"}
```java
void setup(){  
	size(800, 600);  
	 
	color firstCirc = color(255, 0, 0);  
	color secondCirc = color(0, 0, 255);  
	
	int circSize = 100;  
	int circX = 50;  
	int circY = 50;  
	
	fill(firstCirc);  
	circle(circX, circY, circSize);  
	
	circX = circX + ballSize;  // update the variable
	fill(secondCirc);  
	circle(circX, circY, circSize);  
	
	circX = circX + ballSize;  // update the variable
	fill(firstCirc);  
	circle(circX, circY, circSize);  
	
	circX = circX + ballSize;  // update the variable
	fill(secondCirc);  
	circle(circX, circY, circSize);  
}
```
:::

In the example above, the variable `circX` starts with a value of `50`. The computer modifies the value of `circX` several times throughout the program, increasing it by the value of `circSize` after displaying each new circle. This approach makes the computer display each new circle next to the previous one on the screen. The color of the ball alternates between two colors (`firstCirc` and `secondCirc`) as the program progresses as well.

Making relative changes to variables is helpful for variables that need to change as the program progresses. We'll return to this concept when we [animate the positions, sizes, and colors of shapes](/tutorials/applications/draw-method) later on.

### Assignment Operators

A helpful shortcut to use when changing a variable value relative to its current value is to use **assignment operators**. Here's an example:

```java
void setup(){  
  size(800, 600);  
  float xPos = 50;  
   
  // this is the standard way to add 20 to the existing value for xPos  
  xPos = xPos + 20;  
   
  // this uses an assignment operator to add 20 to xPos  
  xPos += 20;  
}
```

The example above makes use of the **addition assignment operator** (`+=`). There are four assignment operators you might want to know about; here are some examples (assume `xPos` starts with a value of `50`):

| Operator       | Code Example | Description                                                                         |
| -------------- | ------------ | ----------------------------------------------------------------------------------- |
| Addition       | `xPos += 20` | Add `20` to `xPos` to get a result of `70`, then store the result in `xPos`.        |
| Subtraction    | `xPos -= 20` | Subtract `20` from `xPos` to get a result of `30`, then store the result in `xPos`. |
| Multiplication | `xPos *= 20` | Multiply `xPos` by 20 to get a result of `1000`, then store the result in `xPos`.   |
| Division       | `xPos /= 20` | Divide `xPos` by 20 to get a result of `2.5`, then store the result in `xPos`.      |

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Modifying Variable Values"}
Which of the following sets the value of an integer variable `sunWidth` to `80` regardless of the current value stored by the variable?

- [x] `sunWidth = 80;`
- [ ] `sunWidth = sunWidth + 80;`
- [ ] `sunWidth == 80;`
- [ ] `sunWidth += 80;`
:::

:::practice-question{name="Assignment Operators"}
Which of the following adds `10` the value of an integer variable `sunWidth`? (Select all correct answers)

- [x] `sunWidth += 10;`
- [ ] `sunWidth = 10;`
- [ ] `sunWidth *= 10;`
- [x] `sunWidth = sunWidth + 10;`
:::

:::prompt{title="Activity 14"}
The shapes in the program below should make a design that looks like a simplification of a scene from a classic video game. In the lines of code identified with comments, manipulate the values stored in the appropriate variables to fix mistakes in the code.

```java
void setup(){
	size(400, 600);
	background(0);
	
	// score and lives values
	color white = #ffffff;
	int scoreSize = 50;
	String score = "000";
	int scoreX = 40;
	int scoreY = 50;
	int livesX = 280;
	int livesY = 35;
	int livesRadius = 25;
	
	// brick values
	int startX = 11;
	int startY = 70;
	int spacer = 2;
	int brickWidth = 40;
	int brickHeight = 10;
	int xPos = startX;
	int yPos = startY;
	color red = #ff0000;
	color orange = #fc6a03;
	color green = #00ff00;
	color yellow = #ffff00;
	
	// ball and paddle values
	int ballX = 200;
	int ballY = 300;
	int ballRadius = 30;
	int paddleX = 150;
	int paddleY = 550;
	int paddleWidth = 100;
	int paddleHeight = 15;
	
	// Score text
	fill(white);
	textSize(scoreSize);
	text(score, scoreX, scoreY);
	
	// Lives icons
	circle(livesX, livesY, livesRadius);
	circle(livesX, livesY, livesRadius); // shift to be next to first ball with a small space in between
	circle(livesX, livesY, livesRadius); // shift to be next to second ball with a small space in between
	
	// Bricks
	noStroke();
	fill(red);
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += 0; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += 0; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += 0; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += 0; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += 0; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += 0; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += 0; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += 0; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	
	xPos = startX;
	yPos += 0; // move the next y-position for bricks to start a new row with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	
	fill(orange);
	xPos = startX;
	yPos += brickHeight + spacer; 
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	
	xPos = startX;
	yPos += 0; // move the next y-position for bricks to start a new row with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	
	fill(green);
	xPos = startX;
	yPos += brickHeight + spacer; 
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	
	xPos = startX;
	yPos += 0; // move the next y-position for bricks to start a new row with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	
	fill(yellow);
	xPos = startX;
	yPos += brickHeight + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	
	xPos = startX;
	yPos += 0; // move the next y-position for bricks to start a new row with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer;
	rect(xPos, yPos, brickWidth, brickHeight);
	
	// paddle and ball
	fill(white);
	circle(ballX, ballY, ballRadius);
	rect(paddleX, paddleY, paddleWidth, paddleHeight);
}
```
:::

:::prompt{title="Activity 13"}
Use a search engine to find some famous paintings of landscapes. For example, check out *Starry Night* by Van Gogh:

![The painting "Starry Night"](famousArtModel.jpg)

After selecting a landscape, use Java Processing to recreate a simplified version of that scene. All values controlling the position, size, and color of the scene should be set with variables and/or objects.
:::

:::prompt{title="Activity 15}
Using only variables and mathematical expressions, finishing setting up the top and bottom borders in the program below. The final result should look like this image:

![[sampleScene15_finished.png]]

You'll need the block image asset--you can download it by [clicking here](/TODO:)

```java
PImage block;

void setup(){
	size(800, 600);
	background(0);
	
	// top brick values
	color brickColor = color(0, 124, 141);
	int brickStartX = 0;
	int brickStartY = 30;
	int brickWidth = 50;
	int brickHeight = 15;
	int brickSpacer = 2;
	int brickXPos = brickStartX;
	int brickYPos = brickStartY;
	
	// bottom block values
	block = loadImage("images/bottomBlock.png");
	int blockStartX = 0;
	int blockStartY = 540;
	int blockXPos = blockStartX;
	int blockYPos = blockStartY;
	int blockWidth = 40;
	int blockHeight = 40;
	
	// add top bricks
	fill(brickColor);
	// first row
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	// second row
	brickXPos = brickStartX - brickWidth/2;
	brickYPos += brickHeight + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	
	// add bottom blocks
	// first row
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	// second row
	blockXPos = blockStartX;
	blockYPos += blockHeight;
	image(block, blockXPos, blockYPos);
}
```
