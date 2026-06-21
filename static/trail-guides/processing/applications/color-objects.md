---
title: Color Objects
authors: Gary Lupton, Jon Stapleton
description: Learn how to use objects to store complex data representing colors, making use of the `color()` method.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
[Objects](/tutorials/concepts/object-basics) are a powerful way to organize and label data in your programs. One easy-to-use object in Java Processing is the `color` object. Recall from the tutorials on [background colors](/tutorials/applications/background-colors) and [`fill()`](/tutorials/applications/shape-colors) that RGB colors are made up of a combination of three values: one for red, one for green, and one for blue. The computer can use these three values together to create a single data structure that represents a color--abstract representation (the digital color in the form of an object) of a real-world concept (color).

The example below shows how you can have the computer store and recall color values by creating some `color` objects:

:::code-and-image{name="Color Object", src="/images/TODO:"}
```java
void setup(){  
  size(800, 600);  
  // change the any of these variables to see how the output changes  
  int rectWidth = 220;  
  int rectHeight = 50;  
  int startX = 20;  
  int startY = 20;  
  color rectCol = color(10, 200, 250);  
   
  int wordSize = 40;  
  int wordY = 60;  
  String msg = "Hello, World!";  
  color wordCol = color(250, 150, 10);  
   
  fill(rectCol);  
  rect(startX, startY, rectWidth, rectHeight);  
   
  textSize(wordSize);  
  fill(wordCol);  
  text(msg, startX, wordY);  
}
```
:::

Notice there are two `color` objects in the example above. The first is named `rectCol` and is used in the first `fill()` method to set the fill color for the rectangle. The second is named `wordCol` and is used in the second `fill()` method to set the text color.

In both cases, the `color` object takes the place of the RGB Color code that you'd normally use, as in the [tutorial about using `fill()` from the Scene Design unit](/tutorials/applications/shape-colors). The two programs below are equivalent--one uses an object, and one uses an RGB value in the `fill()` method:

:::code-and-image{name="Comparing Objects & Primitives" src="/images/TODO:" tabs}
::name[primitives]
```java
void setup() {
	size(100, 100);
	fill(255, 0, 0);
	ellipse(50, 50, 25, 25);
}
```
::name[object]
```java
void setup() {
	size(100, 100);
	color ellipseFill = color(255, 0, 0);

	fill(ellipseFill);
	ellipse(50, 50, 25, 25);
}
```
:::

The version that uses objects is longer and maybe a little harder to interpret. You might be asking yourself why you'd ever want to use `color` objects at all! Of course, there's no requirement to use `color` objects. However, if you find yourself repeating the same `fill()` commands over and over, you might be able to simplify things by creating a *reusable* `color` object. Here's a simplistic example:

TODO: example

Using the color object allows the programmer to quickly and easily reuse a color throughout a program’s code without having to recall the exact color code each time!

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Initializing Color Objects"}
Which of the following creates a `color` object in Java Processing?

- [ ] `Color blueShape = Color(50, 75, 90);`
	::feedback[Be careful about capitalization! The `color` method uses a lowercase `c`]
- [ ] `Col rectColor = (100, 50, 255);`
- [ ] `color = color(200, 175, 25);`
	::feedback[This option is missing a name for the `color` object]
- [x] `color redCircle = color(100, 200, 150);`
:::

TODO: more questions