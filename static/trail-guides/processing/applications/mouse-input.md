---
title: Reacting to Mouse Input
authors: Gary Lupton, Jon Stapleton
description: Learn how to have Processing programs react to user input, including the mouse's screen coordinates or mouse click events.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
At this point, it's like that every activity and program you've seen so far has been a fully automated program--once the program starts, the code provides all the direction the program needs. Needless to say, not all programs are fully automated.

This tutorial will cover ways in which the user can interact with the program while it is running. You'll need to start considering how a user will interact with your program. Will the user use the mouse, the keyboard, or a combination of each? If they need to use the keyboard, which keys? Will the program need to differentiate between a left and right mouse click? There are a lot of considerations!

> **Note:** This tutorial is not intended to cover all of the ways in which Java Processing accepts user input. This tutorial will cover basic concepts, but know there is much more that can be done from where this lesson leaves off.  Visit the [Input Section of the Java Processing Reference Guide](https://processing.org/reference#input) for additional controls that can be implemented with the keyboard and the mouse.

## Mouse Coordinates

TODO:

## The `mouseClicked()` Method

Java Processing uses a unique method to check for events that occur with the mouse: the `mouseClicked()` method. Check out the example below, which displays the x- and y-coordinates of the point on the canvas where the user clicked using the `mouseX` and `mouseY` variables:

:::code-and-image{src="/images/TODO:"}
```java
void setup(){  
  size(800, 600);  
  background(#ffffff);  
}  
  
void draw(){  
  // Nothing here for now! 
}
  
void mouseClicked(){  
  background(#ffffff);  
  String msg = "The mouse was clicked at x: " + mouseX + " and y: " + mouseY;  
  textSize(20);  
  fill(#000000);  
  text(msg, 20, 100);  
}
```
:::

> **Note:** Notice in the example above that the `draw()` method is included in the code despite the fact the method includes no code to execute. The `mouseClicked()` method cannot work without the `draw()` method - this is just a quirk of the way Java Processing is built.

The way this program works requires some explanation. You probably noticed the new method `mouseClicked()`, which defines the sequence of code the computer should execute whenever it senses that the user has clicked the mouse. The computer doesn't run these instructions until it senses a mouse click, but you can still use all of the normal variables, "if" statements, method calls, etc. in that section of your program.

## Mouse Click Collisions

Using `mouseX` and `mouseY` with `mouseClicked()` along with some cleverly constructed "if" statements allows you to have the computer identify which parts of the screen the user clicked, and make decisions based on that data. 

## Rectangle Collision

In order to have the computer execute code based on where the mouse is located during the click event, you'll need to write an "if" statement and a condition. Check out the example below, which shows how to write a condition that evaluates to `true` if the mouse is in the bounds of a rectangle:

:::code-and-image{src="/images/TODO:"}
```java
int xPos, yPos, rad;
boolean light;
  
void setup(){  
  size(800, 600);  
  xPos = width/2;  
  yPos = height/2;  
  rad = 75;
  light = false;
}  
  
void draw(){
	if(light) {
		fill(#00ff00);
	} else {
		fill(#ff0000);
	}
	noStroke();
	rect(xPos-rad, yPos-rad, rad*2, rad*2);
	circle(xPos, yPos, rad * 2);  
}  
  
void mouseClicked(){
	// We've written this on multiple lines
	// to help make it easier to read
	if( mouseX > xPos - rad && 
		mouseX < xPos + rad &&
		mouseY > yPos - rad &&
		mouseY < yPos + rad ) {  
			light = true; 
		} else {
			light = false;
		}
	}  
}
```
:::

When the user clicks the mouse, the computer executes the code written inside the `mouseClicked()` method definition. The condition written there evaluates to `true` if the mouse coordinates are within the boundaries of the rectangle surrounding the circle when the mouse click takes place. If the condition is `true`, the computer sets the variable called `light` to `true`. Otherwise, `light` gets a value of `false`. The computer uses the `light` variable in the `draw()` method to determine what color to use as `fill()`--either `#ff0000` or `#00ff00`. Each time the user clicks the mouse while hovering over the rectangle, the computer changes the `light` variable which consequently changes the `fill()` color for the shapes!

## Circle Collision

If you want to have the computer change the `light` variable in the event that the user clicks on the circle shape, you'll need to write a slightly different condition. You can use the Pythagorean Theorem to create a condition that evaluates to `true` if the mouse is a given distance away from a particular point on the canvas:

:::code-and-image{src="/images/TODO:"}
```java
int xPos, yPos, rad;
boolean light;
  
void setup(){  
  size(800, 600);  
  xPos = width/2;  
  yPos = height/2;  
  rad = 75;
  light = false;
}  
  
void draw(){
	if(light) {
		fill(#00ff00);
	} else {
		fill(#ff0000);
	}
	noStroke();
	rect(xPos-rad, yPos-rad, rad*2, rad*2);
	circle(xPos, yPos, rad * 2);  
} 
  
void mouseClicked(){  
	int xDist = abs(mouseX - xPos);  
	int yDist = abs(mouseY - yPos);  
	float dist = sqrt(xDist * xDist + yDist * yDist);  
   
	if(dist < rad){  
		light = true;  
	} else {
		light = false
	}
}
```
:::

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Processing Variables"}
Which of the following are variables automatically created by Java Processing that can be used to identify the location of the mouse cursor? (Select all that apply)

- [ ] `yPos`
- [ ] `xPos`
- [x] `mouseY`
- [x] `mouseX`
:::

:::practice-question{name="Mouse Click Method"}
What is the name of the method used in Java Processing to recognize a mouse click by the user?

- [ ] `mouseY`
- [ ] `mouseDown()`
- [x] `mouseClicked()`
- [ ] `mouseX`
:::

:::practice-question{name="Tracing 'If/Else/Else' Statements"}
What will appear on the screen when the user clicks the top-right quadrant of the screen?

```java
if(mouseX < width/2 && mouseY < height/2){  
   circle(200, 150, 100);  
} else if(mouseX < width/2 && mouseY >= height/2){  
   rect(200, 450, 100, 100);  
} else if(mouseX >= width/2 && mouseY < height/2){  
   triangle(600, 100, 550, 150, 650, 150);  
} else {  
   ellipse(600, 450, 100, 200);  
}
```

- [ ] ellipse (not a circle)
- [ ] circle
- [ ] square
- [x] triangle
:::