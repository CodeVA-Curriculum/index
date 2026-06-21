---
title: Generating Random Numbers
authors: Gary Lupton, Jon Stapleton
description: Learn how to have the computer generate random numbers to use in your programs using the `random()` method.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---

Random number generation (RNG) is a common, and in many instances necessary, part of video game development and many other programming disciplines. Creating game elements that happen in an unpredictable way requires randomization. Examples of randomization in video games can include the awarding of power-ups during a game, the location or frequency of enemies, or the amount of damage done when an attack is carried out.

## The `random()` Method

You can use the `random()` method to have the computer generate a random number. The example below uses the `random()` method to set a random size for a circle, and then uses that value to set the location of the circle so that the top and left edges of the circle will touch the edge of the canvas regardless of how big the circle is.

:::code-and-image{src="TODO:}
```java
void setup(){  
	size(800, 600);  
	float circWidth = random(0, 100);  
	float circX = circWidth/2;  
	float circY = circWidth/2;  
	
	circle(circX, circY, circWidth);  
}
```
:::

> **Practice:** Run the example above several times in the Processing IDE. What do you notice about the size of the circle each time you run the program?

The two arguments we used in the example above with the `random(0, 100);` method set the minimum and maximum values that the computer might generate. We used `0` for the minimum and `100` for the maximum, meaning the computer will store a random value from `0` to `100` (but not including `100`) in the variable called `circWidth`.

## Casting & Random Colors

By default, the `random()` method generates `float` values. You can convert those `float` values to `int` values by **casting**, or converting, the `float`s to `int`s. Here's what it looks like to **cast** the random number produced by the `random()` method as an integer value:

```java
int red = (int) random(0, 256);
```

The `(int)` in front of `random(0, 256);` is what tells the computer to convert the result of the method to an integer value before storing the value in the variable called `red`. This kind of thing is really useful if you want the computer to generate random [color objects](/tutorials/applications/color-objects):

:::code-and-image{src="/images/TODO:"}
```java
void setup(){  
	size(800, 600);  

	// Generate random colors //
	int red = (int) random(0, 256);  
	int green = (int) random(0, 256);  
	int blue = (int) random(0, 256);  
	color circCol = color(red, green, blue);  
	
	float circWidth = random(0, 200);  
	float circX = circWidth/2;  
	float circY = circWidth/2;  
	
	fill(circCol);  
	stroke(circCol);  
	circle(circX, circY, circWidth);  
}
```
:::

> **Practice:** Try changing values in the code to see what aspects of the program are easily changed or improved upon.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Random Casting"}
Which of the following would generate a **random integer** starting with a value of `1`, `10`, or any value in between?

- [ ] `random(0, 10);`
- [ ] `(int) random(0, 10);`
- [x] `(int) random(1, 11);`
- [ ] `random(1, 10);`
:::

:::practice-question{name="Random Range"}
Which of the following will store a random number of any whole or decimal value between `-10` and `10` (not including 10) in a variable called `rng`?  (Select all correct answers)

- [x] `float rng = random(-10, 10);`
- [ ] `int rng = random(-10, 10);`
- [ ] `int rng = (int) random(-10, 10);`
- [x] `float rng = random(0, 20) - 10;`
:::