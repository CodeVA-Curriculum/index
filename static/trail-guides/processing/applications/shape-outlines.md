---
title: Shape Outlines
authors: Gary Lupton, Jon Stapleton
description: Learn how to set the color and weight of shape outlines using the `stroke()`, `noStroke()`, and `strokeWeight()` methods.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---

To change all of the colors in a shape--the fill and the outline--you need to use two different methods. The `fill()` method changes the interior color of the shape, but the stroke will keep its default color of "black" unless you use the `stroke()` method to change it.

:::code-and-image={name="Stroke Color", src="/images/TODO:"}
```java
void setup(){  
  // draw the trunks of the trees
  fill(#964B00);  
  stroke(#5C4033);  
  rect(190, 350, 20, 150);  
}
```
:::

Check out the example above to see how to use the `stroke()`method to set the outline color of subsequent shapes. Just like [`fill()`](/tutorials/applications/shape-colors) and [`background()`](/tutorials/applications/background-colors), you can use grayscale values (`0` to `255`), RGB values, or hex codes as arguments.

## The `strokeWeight()` Method

The `stroke()` method changes the outline color. To change the thickness of the outline, you need to use the `strokeWeight()` method.

:::code-and-image{name="Stroke Weight", src="/images/TODO:"}
```java
void setup(){  
  // draw the trunks of the trees  
  fill(#964B00);  
  stroke(#5C4033);  
  strokeWeight(10);  
  rect(190, 350, 20, 150);  
  rect(385, 200, 30, 300);  
  rect(588, 300, 24, 200);  
}
```
:::

In the example above, we used `strokeWeight()` to make the outline of the rectangles thicker. The larger the argument you use with the `strokeWeight()` method, the bolder the outline will be.

## The `noStroke()` Method

The final stroke method we'll discuss here is the `noStroke()` method. As the name implies, `noStroke()` will remove the outline from the shapes that come after it. To add the stroke back to the shapes, you'll need to call a new `stroke()` method.

:::code-and-image{name="Trees with Strokes", src="/images/TODO:"}
```java
void setup(){  
  size(800, 600);  
  background(254,241,210);  
   
  // draw the ground  
  fill(0, 128, 0);  
  noStroke();  
  rect(0, 500, 800, 100);  
   
  // draw the trunks of the trees  
  fill(#964B00);  
  stroke(#5C4033);  
  strokeWeight(10);  
  rect(190, 350, 20, 150);  
  rect(385, 200, 30, 300);  
  rect(588, 300, 24, 200);  
   
  // draw the tops of the trees  
  fill(42, 170, 138);  
  noStroke();  
  circle(200, 350, 125);  
  circle(400, 200, 150);  
  circle(600, 300, 100);  
}
```
:::

The example above shows how you can use `stroke()`, `strokeWeight()`, and `noStroke()` to create a scene where some shapes have outlines and others do not.

> **Practice:** Try changing the order of the `fill()`, `stroke()`, and `noStroke()` methods to adjust the colors of the scene above.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Outline Color"}
Which of the following lines of code will cause any shapes drawn after it is run have a blue outline?

- [ ] `fill(0, 0, 190);`
- [x] `stroke(0, 0, 190);`
- [ ] `strokeWeight(0, 0, 190);`
- [ ] `strokeFill(0, 0, 190);`
:::

:::practice-question{name="Code Tracing"}
Which of the following lines of code will complete the code segment show and produce a green rectangle and a circle with no outline color?

```java
fill(0, 230, 0);  
rect(100, 100, 50, 50);  
// <missing code>  
circle(175, 125, 50);
```

- [x] `noStroke();`
- [ ] `noFill();`
- [ ] `strokeWeight(-1);`
- [ ] `stroke(0);`
:::