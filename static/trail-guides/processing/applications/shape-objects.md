---
title: Shape Objects
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Consider what is required to [display a rectangle](/tutorials/applications/rectangles) in Processing. To code a rectangle in Java Processing, you can use the `rect()` method along with four arguments. Those arguments represent the x-position, y-position, width, and height for the rectangle.  Those four values--x-position, y-position, width, and height--are the four values needed to represent a rectangle. Even though a rectangle can have other features (such as a fill color and outline color), those four are the most necessary to make a rectangle shape.  

Notice that the four attributes for the `rect()` method are all primitive numeric values with a [data type](/tutorials/concepts/variables-types) of either `int` or `float`. You can think of those numbers for `x`, `y`, `width`, and `height` as "belonging" to the rectangle. Java allows us to "bundle" those related values together into an [object](/tutorials/concepts/object-basics) that represents our particular rectangle with its own unique `x`, `y`, `width`, and `height` values.

## Custom Shape Objects & the `shape()` Method

To create an object which represents a shape, you'll need to use the `createShape()` method to create a `PShape` object:

:::code-and-image{src="/images/TODO:"}
```java
void setup(){  
	size(200, 200);

	// Create a red square object
	fill(255, 10, 0);  
	PShape sq = createShape(RECT, 0, 0, 80, 80);

	// Display the shapes
	fill(0);
	shape(sq, 100, 100);
	circle(100, 100, 100);
}
```
:::

The important lines to note in the example above are lines 6 and line 10. On line 6 we use the `createShape()` method to create data for a rectangle, and then we have the computer store that data in a `PShape` object called `sq`. On line 10, we have the computer display the rectangle represented by the `sq` object by passing it as a parameter to the `shape()` method.

Notice that we use the `fill()` method *before* declaring and initializing the `PShape` object called `sq`. The computer sets the color of the shape when it creates the `PShape` object, and stores that color in the object *permanently*. That's why the `fill(0)` command on line 9 doesn't affect the fill color of the square displayed using the `shape()` method on line 10--the `sq` object keeps the fill value from when the computer initialized it. The other two parameters to the `shape()` method set the location (`x` and `y` coordinates) where the computer will display the rectangle represented by the `PShape` object `sq`.

Here's another example that uses two shape objects and some `color` objects (read more about `color` objects in [this tutorial](/tutorials/applications/color-objects)):

:::code-and-image{src="/images/TODO:"}
```java
void setup(){  
	size(800, 600);  
	// change the any of these values to see how the output changes  
	color rectRed = color(255, 10, 0);  
	color circBlue = color(10, 20, 240);  
	
	// Create the shapes
	fill(rectRed);  
	PShape sq = createShape(RECT, 0, 0, 80, 80);  
	fill(circBlue);  
	PShape circ = createShape(ELLIPSE, 0, 0, 80, 80);  

	// Display the shapes
	shape(sq, 100, 100);  
	shape(circ, 220, 140);
	shape(sq, 260, 100);  
	shape(circ, 380, 140);  
}
```

The `createShape()` method takes five arguments in the examples above. The arguments are: shape type, x-position, y-position, width, and height. Use the [Java Processing Reference](https://processing.org/reference/createShape_.html) for more details about the `createShape()` method and the type of shapes it can store as a `PShape` object.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Initializing Shape Objects"}
Which of the following commands creates a shape object without adding it to the screen? (Select all correct answers)

- [ ] `shape(block, 0, 0);`
- [ ] `shape(ball, 400, 300);`\
- [x] `PShape ball = createShape(ELLIPSE, 20, 20, 50, 50);`
- [x] `PShape block = createShape(RECT, 0, 0, 100, 30);`
:::

TODO: more questions