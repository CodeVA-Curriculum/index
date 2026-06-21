---
title: Drawing Other Shapes
authors: Gary Lupton, Jon Stapleton
description: Learn how to access the Processing Reference and use other methods like `arc()` and `line()` to draw different shapes in Processing.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
Shapes, like circles, rectangles, and triangles can be useful. However sometimes other shapes would work better for a specific project. The purpose of this tutorial is not to introduce all of the different shapes and permutations of shapes available in Java Processing. Instead, this tutorial will introduce you to a resource published on the Processing Web site ([https://processing.org/reference](https://processing.org/reference)) that provides details about the wide variety of commands available with Java Processing.

## Shapes

The quickest way to find a list of shapes available in Java Processing is to navigate to the “[Shapes](https://processing.org/reference#shape)” section of the [Java Processing Reference Page](https://processing.org/reference). This tutorial will examine two of the shapes presented in the Java Processing Reference that have not been covered in other tutorials in this unit. Both shapes are part of the [2D Primitives](https://processing.org/reference#shape-2d-primitives) subsection of the Java Processing Reference.

### The `arc()` Method

The `arc()` method draws part of a circle.  This could be an arc that looks like a pizza slice, or an arc that looks like a Pac-Man character. The `arc()` method takes either six or seven arguments. The first example uses six arguments. The second uses seven.  Review the [Java Processing Reference](https://processing.org/reference/arc_.html) for more details about the `arc()` method.

:::code-and-image{src="/images/TODO:"}
```java
void setup(){  
  size(800, 600);  
  arc(200, 200, 100, 100, 0, PI/3);  
}
```
:::

The arguments for the `arc()` method are:  `arc(x, y, width, height, start radian, end radian)`. The "start radian" in the example above is `0`, which starts the arc at the right edge of the circle. The bottom edge of the circle is `PI/2`. The left edge is `PI`. The top edge is `PI*3/2`. `PI*2` is the same point as `0`. In the example above, the "end radian" is at `PI/3` which is between `0` and `PI/2`.  

The computer draws the arc in a clockwise direction from the "start radian" value to the "end radian" value. Practicing with different start and end radian values will help make sense of the relationship between arcs and the unit circle.

:::code-and-image{src="/images/TODO:"}
```java
void setup(){  
  size(800, 600);  
  fill(#ffff00);
  arc(100, 100, 50, 50, PI/4, PI * 7/4, PIE);
}
```
:::

In the example above, the arc starts at `PI/4` and ends at `PI * 7/4`. The "start radian" value needs to be smaller than the "end radian" value for the arc shape to display correctly. You might want to use "start radian" values which are less than `0` (such as `-PI/8`) and/or "end radian" values which are greater `2*PI` like we used above.  

The `arc()` method call in the example above also has a seventh argument. This argument defines how the ends of the arc should be connected (called a mode). Other modes described in the Java Processing Reference include `CHORD` and `OPEN`.  

> **Practice:** Experiment with each mode option by replacing `PIE` in the example above with `OPEN` or `CHORD`, as well as not using a mode argument at all, to see how the arc changes.

### The `line()` Method  

The `line()` method does exactly what it sounds like it does: draws a line! The method includes four arguments: `line(x1, y1, x2, y2)`. The `x1`, `y1` arguments represent the coordinates of first point of the line. The `x2`, `y2` arguments represent the second point of the line.

:::code-and-image{src="/images/TODO:"}
```java
void setup(){  
  size(800, 600);  
  stroke(#1190af);  
  strokeWeight(10);  
  line(0, 0, 100, 200);  
}
```
:::

Recall that the top-left corner of the screen is the origin point `(0, 0)`. The line shown in the code example above starts at that point and ends at point `(100, 200)`.

Lines drawn by the `line()` method can be manipulated with the `stroke()` and `strokeWeight()` methods in the same way that [shape outlines](/tutorials/applications/shape-outlines) can be. Check out the example above to see how to change the line color and line thickness using these familiar methods.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Line Placement"}
Which of the following lines of code will draw a line bisects the screen vertically?

```java
void setup(){  
   size(400, 400);  
   // draw bisector line here
}
```

- [x] `line(200, 0, 200, 400);`
- [ ] `line(200, 0, 0, 400);`
- [ ] `line(0, 200, 400, 0);`
- [ ] `line(0, 200, 400, 200);`
:::

:::practice-question{name="End Radius Argument"}
Which of the following is the "end radius" of the arc() method shown here:  

```java
arc(50, 100, 200, 150, 0, PI*2/3, PIE);
```

- [ ] `150`
- [ ] `PIE`
- [ ] `0`
- [x] `PI*2/3`
:::

:::practice-question{name="Shapes in Processing"}
Which of the following shapes can be created with Java Processing?  (Select all that apply)

- [x] Arcs
- [x] Quadrilaterals
- [x] Ellipses
- [x] Lines
:::