---
title: Activity 14
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

The shapes in the program below should make a design that looks like a simplification of a scene from a classic video game. In the lines of code identified with comments, manipulate the values stored in the appropriate variables to fix mistakes in the code.

:::code-and-image{src="/images/TODO:"}
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

## Solution

:::code-and-image{src="/images/TODO:"}
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
	circle(livesX + livesRadius + spacer * 2, livesY, livesRadius); // shift to be next to first ball with a small space in between
	circle(livesX + livesRadius * 2 + spacer * 4, livesY, livesRadius); // shift to be next to second ball with a small space in between
	
	// Bricks
	noStroke();
	fill(red);
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	xPos += brickWidth + spacer; // move the next x-position for next brick to go in a new column with a small space in between
	rect(xPos, yPos, brickWidth, brickHeight);
	
	xPos = startX;
	yPos += brickHeight + spacer; // move the next y-position for bricks to start a new row with a small space in between
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
	yPos += brickHeight + spacer; // move the next y-position for bricks to start a new row with a small space in between
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
	yPos += brickHeight + spacer; // move the next y-position for bricks to start a new row with a small space in between
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
	yPos += brickHeight + spacer; // move the next y-position for bricks to start a new row with a small space in between
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