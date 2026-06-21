---
title: Adding Triangles
authors: Gary Lupton, Jon Stapleton
description: Learn how to display triangles using the `triangle()` method
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
Another shape available in Java Processing is the triangle. You can display them using the `triangle()` method. This method has important similarities and differences  compared to the `rect()` and `circle()` methods.  

Recall that the command to draw a rectangle includes four arguments: `rect(x, y, width, height)`.  The `x` and `y` arguments set the location of the top-left corner of the rectangle. The `width` and `height` start from that point to create the sides of the rectangle. The `circle()` method is similar. A method call of `circle(100, 100, 50)` would put the center point of the circle at `x = 100`, `y = 100` with a diameter of `50`.  With both the circle and rectangle shapes, there is an “anchor point” that the computer uses to create the shape.  

The `triangle()` method is different. It takes six arguments; these six arguments represent the `x` and `y` value for all three points needed for the triangle: `triangle(x1, y1, x2, y2, x3, y3)`. Here's an example:

:::code-and-image{src="/images/TODO:"}
```java
void setup(){  
  size(1200, 900);  
  background(100, 200, 50);  
  triangle(50, 100, 25, 150, 75, 150);  
}
```
:::

In the code example above, the three points for the triangle’s corners are `(50, 100)`, `(25, 150)`, and `(75, 150)`.

## Tips for Triangles

The challenge with triangles is that they often require additional planning in order to place each point of the triangle in the correct location. It can be helpful to use graph paper, scratch paper, a whiteboard, or another low-tech tool to identify the points of the triangle before coding the `triangle()` method. The guess-and-check method can often be difficult to implement without a clear vision for where the points of the triangle need to be.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Triangle Placement"}
Which of the following lines of code will create a triangle with on point at `(75, 100)`?

- [x] `triangle(50, 100, 50, 150, 75, 100);`
- [ ] `triangle(50, 75, 100, 125, 100, 75);`
- [ ] `triangle(100, 75, 150, 75, 100, 125);`
- [ ] `triangle(75, 150, 50, 75, 100, 75);`
:::

:::practice-question{name="Comparing Methods"}
Which of the following best describes how the arguments made to create triangles differ from those used to make circles and rectangles?

- [ ] Triangle arguments use an "anchor" point then side length to draw only equilateral triangles.
- [x] Triangle arguments must include all three points to draw the triangle.
- [ ] The `triangle()` method requires fewer arguments than `circle()` or `rect()`.
- [ ] Triangle arguments include the length of each side of the triangle.
:::

:::practice-question{name="Calling Triangles"}
Which of the following lines of code will create a triangle?

- [ ] `tri(100, 100, 0, 200, 200, 200);`
- [ ] `tri(100, 100, 50);`
- [ ] `triangle(100, 100, 50);`
- [x] `triangle(100, 100, 0, 200, 200, 200);`
:::