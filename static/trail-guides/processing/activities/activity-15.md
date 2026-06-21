---
title: Activity 15
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using only variables and mathematical expressions, finishing setting up the top and bottom borders in the program below. The final result should look like this image:

![[sampleScene15_finished.png]]

You'll need the block image asset--you can download it by [clicking here](/TODO:)

:::code-and-image{src="/images/TODO:"}
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
:::

## Solution

```java
PImage block;

void setup(){
	size(800, 600);
	background(0);
	
	// top brick values
	color brickColor = color(0, 124, 141);
	int brickStartX = 0;
	int brickStartY = 50;
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
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	// second row
	brickXPos = brickStartX - brickWidth/2;
	brickYPos += brickHeight + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	// third row
	brickXPos = brickStartX;
	brickYPos += brickHeight + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	// fourth row
	brickXPos = brickStartX - brickWidth/2;
	brickYPos += brickHeight + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	brickXPos += brickWidth + brickSpacer;
	rect(brickXPos, brickYPos, brickWidth, brickHeight);
	
	// add bottom blocks
	// first row
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	// second row
	blockXPos = blockStartX;
	blockYPos += blockHeight;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
	blockXPos += blockWidth;
	image(block, blockXPos, blockYPos);
}
```

