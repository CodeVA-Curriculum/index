---
title: '"If/Else" & "Else/If" Statements'
authors: Gary Lupton, Jon Stapleton
description: Learn more about different kinds of "if" statements you can use in your programs!
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
"If" statements alone are a powerful tool for programming! With an "if" statement, the program uses a condition to decide whether to do something or to not do something. There are a couple of ways to extend "if" statements in Java to make them even more useful.

## "If/Else" Statements

If/else statements direct the computer to do one thing when the condition is `true` and a separate thing when the condition is `false`. Check out the example below, where the computer changes the color of the circle based on whether the circle is on the left or right side of the screen:

:::code-and-image{src="/images/TODO:"}
```java
void setup(){  
  size(800, 600);  
  color col;  
  background(#ffffff);  
  int xPos = (int) random(0, width);  
  if(xPos < width/2){  
    col = #ff00ff;  
  } else {  
    col = #00fedc;  
  }  
  fill(col);  
  circle(xPos, height/2, 200);  
}
```
:::

You'll need to run the program above a couple of times to see how the "if/else" statement impacts the output. Here's another version that uses the `draw()` method. Because the `xPos` changes while the computer runs the program, the results of the conditions are different once the `xPos` variable gets high enough:

:::code-and-image{src=TODO:}
```java
int xPos;  
color col;  
  
void setup(){  
  size(800, 600);  
  xPos = 0;  
}  
  
void draw(){  
  background(#ffffff);  
  if(xPos < width/2){  
    col = #ff00ff;  
  } else {  
    col = #00fedc;  
  }  
  fill(col);  
  circle(xPos, height/2, 200);  
  xPos += 5;  
}
```
:::

## "Else/If" Statements

Using "if" statements and "if/else" statements enables coders to create all kinds of interesting functionality for games. They limited to decisions that have a binary outcome--either “this or nothing” in the case of "if" statements or “this or that” in the case of "if/else" statements. Sometimes, you want the computer to decide between more than just two potential outcomes.

Consider the design many fast food restaurants use to order common meal combinations quickly. The customer picks a number that represents the meal. The choice isn’t between two options, it’s between many options.  

To accomplish this concept with a program, the program could use a series of "if" statements. However, this creates some problems.  With multiple "if" statements, the program will check all of the possible values, even after the correct one has been identified and it should skip the remaining options. It can also be difficult to read and test multiple "if" statements in a row. Instead, the computer should test a “list” of possible conditions until it finds the one that evaluates to `true`, at which point it should just ignore the other conditions and move on.
  
To do this, Java provides **"else/if" statements**.  "Else/if" statements are groups of conditions that the computer evaluates one-by-one until it finds a condition that evaluates as `true`. Once that happens, the computer executes code in that part of the "else/if" statements and skips the rest. Check out the example below:

:::code-and-image{src="/images/TODO:"}
```java
int xPos, yPos, diam;  
color col;  
  
void setup(){  
  size(800, 600);  
  diam = 100;  
  xPos = (int) random(diam/2, width/2 - diam/2);  
  yPos = (int) random(diam/2, height/2 - diam/2);  
}  
  
void draw(){  
  background(#ffffff);  
  if(xPos < width/2 && yPos < height/2){  
    col = #ff0000;  
  } else if(xPos < width/2 && yPos >= height/2){  
    col = #00ff00;  
  } else if(xPos >= width/2 && yPos < height/2){  
    col = #0000ff;  
  } else if(xPos >= width/2 && yPos >= height/2){  
    col = #000000;  
  }  
  fill(col);  
  circle(xPos, yPos, diam);  
  xPos++;  
  yPos++;  
}
```
:::

In the example above, the "else/if" statements direct the computer to check which quadrant of the screen the circle will appear in using the randomly-generated `xPos` and `yPos` variable values. Once the computer finds a condition that evaluates to `true`--thus confirming which quadrant the shape’s center point will appear in--the computer sets the `col` variable and ignores any remaining conditions.

## All Together Now

You can also combine "if/else" and "else/if" statements. The result is an **"if/else/else" statement**. These kinds of statements create a fallback, "default" block of code for the computer to execute if all of the other conditions in the statement evaluate to `false`. Here's what that looks like in Java:

```java
if(/* condition #1 */) {
	// run this code if condition #1 is true
} else if(/* condition #2 */) {
	// run this code if condition #1 is false and #2 is true
} else {
	// run this code if all the prior conditions are false
}
```

Check out the program below for an example in Processing:

:::code-and-image{src="/images/TODO:"}
```java
int xPos, diam;  
  
void setup(){  
  size(800, 600);  
  diam = 50;  
  xPos = diam/2;  
}  
  
void draw(){  
  background(#ffffff);  
  noStroke();  
  fill(#4500fe);  
  if(xPos <= 100){  
    circle(xPos, height/2, diam);  
  } else if(xPos <= 300 && xPos > 200){  
    rect(xPos - diam/2, height/2 - diam/2, diam, diam);  
  } else if(xPos <= 500 && xPos > 400){  
    ellipse(xPos, height/2, diam * 2, diam);  
  } else if(xPos <= 700 && xPos > 600){  
    rect(xPos - diam, height/2 - diam/2, diam * 2, diam);  
  } else {  
    triangle(xPos, height/2 - diam/2, xPos - diam/2, height/2 + diam/2, xPos + diam/2, height/2 + diam/2);  
  }  
  xPos++;  
}
```
:::

When the computer runs this program, it displays a circle on the left-edge of the screen. The shape turns into a triangle, then a square, then a triangle, then an ellipse, then a triangle, then a rectangle, then a triangle again. The "if/else/else" statement directs the computer to do this by having it check four specific areas of the screen, and then uses the "else" part of the statement at the end to deal with every other area of the screen that is not accounted for by the other conditions.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Tracing 'If/Else/Else' Statements"}
Which of the following shapes will display on the screen given the following code segment?

```java
String shape = "Circle";

if(shape == "circle"){  
   circle(100, 100, 100);
} else if(shape == "square"){  
   rect(50, 50, 100, 100);  
} else if(shape == "triangle"){  
   triangle(100, 50, 50, 150, 150, 150);  
} else {  
   ellipse(100, 100, 200, 100);  
}
```

- [ ] triangle
- [ ] circle
- [x] ellipse (not a circle)
- [ ] square
:::

:::practice-question{name="Tracing 'Else/If' Statements"}
Which of the following shapes could appear on the screen given the following code segment? (Select all that apply)

```java
if(xPos < 800){  
   circle(100, 100, 100);  
} else if(xPos < 600){  
   rect(50, 50, 100, 100);  
} else if(xPos < 400){  
   ellipse(100, 100, 200, 100);  
} else if(xPos < 200){  
   rect(0, 50, 200, 100);  
}
```

- [ ] ellipse (not a circle)
- [ ] square
- [x] circle
- [ ] rectangle (not a square)
:::

:::practice-question{name="Tracing 'If/Else' Statements"}
Given the following code segment, which answer best describes the shape will appear on the screen?

```java
int num = 100;

if(num % 2 == 0){  
   ellipse(100, 100, 100, 100);  
} else {  
   rect(50, 50, 100, 100);  
}
```

- [ ] circle
- [x] ellipse (not a circle)
- [ ] square
- [ ] rectangle (not a square)
:::