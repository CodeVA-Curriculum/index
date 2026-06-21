---
title: Adding Circles
authors: Gary Lupton, Jon Stapleton
description: Learn how to add circles to your Processing sketches using the `circle()` method
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
Another shape that Java Processing can produce is a circle.  The `circle()` method is the easiest way to create a circle.  The program below shows that the `circle()` method takes three arguments:  circle center x-position, circle center y-position, and circle diameter.

```java
void setup(){  
  size(800, 600);  
  background(#1AB3D9);  
  circle(100, 100, 200);  
}
```

> **Practice:** Run the program above and see what it does. Then, try changing the arguments for the `circle(100, 100, 200);` command. What happens when you set the third parameter to a much higher number? What happens if you set the second parameter to `200` instead of `100`?

When the computer runs the program above, the circle is positioned so that the left and top edges of the circle are touching the screen border at `x = 0` and `y = 0`;  This checks out mathematically because the center point of the circle is 100 pixels form the left and 100 pixels from the top. Since the diameter is 200, that means each radius is 100.  As a result, the circle edges touch the left and top borders of the canvas.

![An image showing the pixel measurements of the circle(100, 100, 200) method](/TODO:)

Remember--unlike other shape methods like `rect()`, the first two arguments of the `circle()` method tell the computer where to place the *center* of the circle, not the top-left corner like the first two arguments of the `rect()` method.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Circle Errors"}
Which method draws a circle on the canvas without an error?

- [x] `circle(100, 100, 100);`
- [ ] `circ(100, 100, 50, 50);`
- [ ] `circle(100, 100, 50, 50);`
- [ ] `circ(100, 100, 100);`
:::

:::practice-question{name="Circle Radius"}
Which of the following will create a circle with a radius of 100?

- [x] `circle(100, 100, 200);`
- [ ] `circle(200, 100, 100);`
- [ ] `circle(100, 200, 100);`
- [ ] `circle(100, 100, 100);`
:::

:::practice-question{name="Circle Placement"}
Which of the following code segments will create a circle in the center of canvas 800 pixels wide by 600 pixels tall?

- [x] `circle(400, 300, 100);`
- [ ] `circle(350, 250, 100);`
- [ ] `circle(300, 200, 100);`
- [ ] `circle(800, 600, 100);`
:::