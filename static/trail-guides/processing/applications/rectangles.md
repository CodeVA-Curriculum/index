---
title: Adding Rectangles
authors: Gary Lupton, Jon Stapleton
description: Learn how to use the `rect()` method to display rectangle shapes in your Processing sketches.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
While there are many shapes and other elements you can add with Java Processing, rectangles are a very useful place to start. Just think about all the rectangular shapes that exist in classic 2D video games.  Read the code segment below, and look for the line of code that uses `rect(100, 200, 300, 50);`:

```java
void setup(){  
  size(800, 600);  
  rect(100, 200, 300, 50);  
}
```

> **Practice:** Copy the program above into your IDE and click the "play" button to test it. What do you see? Try changing some of the numbers on the `rect()` line and click "play" again to see what happens after those changes; what do you notice?

Notice that `rect()` has four values inside the parentheses. The programming term used for the values in the parentheses is **arguments**.  Arguments are values that specify how a method should behave. For the `size()` method, the first argument is the value for the width and the second argument is the value for the height.  Here’s a breakdown of the arguments for the `rect()` method:

- The first argument is the x-position of the top-left corner of the rectangle.
- The second argument (200) is the y-position of the top-left corner of the rectangle.
- The third argument (300) is the width of the rectangle.
- The fourth argument (50) is the height of the rectangle.

In short, the `rect()` method has the following definition: `rect(x-pos, y-pos, width, height)`.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Rectangle Arguments"}
Which of the following methods will draw a rectangle with a width of 100 and height of 50?

- [x] `rect(50, 100, 100, 50);`
- [ ] `rec(50, 100);`
- [ ] `rect(100, 50, 200, 100);`
- [ ] `rect(100, 50);`
:::

:::practice-question{name="Rectangle Location"}
Which of the following methods will draw a rectangle with the **center** of rectangle at x = 100 and y = 100?

- [ ] `rect(100, 100, 50, 50);`
- [x] `rect(50, 50, 100, 100);`
- [ ] `rect(100, 100, 100, 100);`
- [ ] `rect(50, 50, 50, 50);`
:::

:::practice-question{name="Rectangle Errors"}
Which of the following methods will draw a rectangle without producing an error message?

- [ ] `rect(100, 50);`
- [x] `rect(100, 100, 50, 50);`
- [ ] `rectangle(100, 100, 50, 50);`
- [ ] `rectangle(100, 50);`
:::