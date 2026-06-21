---
title: Setting Shape Colors
authors: Gary Lupton, Jon Stapleton
description: Learn how to set the fill colors of shapes using the `fill()` and `noFill()` methods.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
Adding shapes to the screen is an important skill needed to build scenes. You'll also need to set shape colors later on when you create more complex software art, like animations and games. When the computer displays a shape, it uses a default color of "white".  Fortunately, that color can be changed and customized to meet the needs of the program.

![A screenshot showing a white circle with a thin black outline on a tan field](/TODO:)

You can see in the screenshot above that we've added a background color, but the two shapes are the default color: white with a thin black outline.  This lesson will cover how to change those defaults to create shapes with different colors.

## The `fill()` Method

You can use the `fill()` method change the color of a shape. Just like many other Java Processing methods, the `fill()` method uses arguments to specify what the method does (in this case, to specify which color to use for the shape).

```java
void setup(){  
  size(800, 600);  
  background(254,241,210);  
  

  fill(100);  
  rect(0, 500, 800, 100);  
  circle(400, 300, 100);  
}
```

Notice first that we've written the `fill()` method *before* the `rect()` and `circle()` methods. This means the `fill()` method will affect the shapes produced by the `rect()` and `circle()` methods because the `fill()` method affects the shapes that come after it in the code.

### Layering Colors

Try changing the order of the three methods in the code and running the program in the Java IDE to see how the color of each shape changes. In addition to the example above, try the code sequences shown below:

:::code-and-image{name="Middle fill() Order"}
```java
void setup(){   
  rect(0, 500, 800, 100);  
  fill(100);  
  circle(400, 300, 100);  
}
```
:::

:::code-and-image{name="Last fill() Order"}
```java
void setup(){   
  rect(0, 500, 800, 100);  
  circle(400, 300, 100);  
  fill(100);  
}
```
:::

Notice that in the *Middle fill() Order* example, only the circle is filled with the gray color.  That’s because the `fill()` comes before the circle. The rectangle is not affected by the `fill()` method because the computer runs the `rect()` method before it runs the `fill()` method.

In the *Last fill() Order* example, neither shape is affected by the `fill()` method. Since the computer runs both shape methods before running the `fill()` method, the fill color doesn’t affect either shape and the computer uses the default fill value.
### Fill Colors

In the examples above, the fill values we've used result in a shade of gray corresponding to a `fill()` value of `100`. You can change the fill color to any shade of gray from white to black by using a value from `0` to `255`. You can use other non-grayscale colors by using RGB or hex values, like in the example below:

:::code-and-image{name="Using RGB with fill()", src="/images/TODO:"}
```java
void setup(){  
  fill(255, 0, 0);  
  circle(400, 300, 100);  
  noFill();  
  rect(0, 500, 800, 100);  
}
```
:::

For more details about using RGB and Hex values, see the lesson on [Background Colors](/tutorials/applications/background-colors).

## The `noFill()` Method

Look again at the code example above--you may have noticed a new method, `noFill()`. When the computer runs the program, it fills the circle with red because the `fill()` method has an RGB value as an argument corresponding to a shade of red (`255, 0, 0`). The rectangle, however, is the same color as the background. The rectangle isn’t red because of the `noFill()` method called before `rect()`.

The `noFill()` method clears the fill value set by the prior `fill()` method call, which is why the rectangle isn’t red like the circle. The shapes displayed after the `noFill()` method have no fill color, which means they appear to have the same color as the background.  
  
Adding shapes that should use the same fill color in consecutive lines of code can save time and minimize repetitive lines of code. Check out the program below for an example. The comments in the code describe the purpose for each section of commands.

:::code-and-image{name="Tress with fill()", src="/images/TODO:"}
```java
void setup(){  
  size(800, 600);  
  background(254,241,210);  
   
  // draw the ground  
  fill(0, 128, 0);  
  rect(0, 500, 800, 100);  
   
  // draw the trunks of the trees  
  fill(#964B00);  
  rect(190, 350, 20, 150);  
  rect(385, 200, 30, 300);  
  rect(588, 300, 24, 200);  
   
  // draw the tops of the trees  
  fill(42, 170, 138);  
  circle(200, 350, 125);  
  circle(400, 200, 150);  
  circle(600, 300, 100);  
}
```
:::

> **Practice:** Run the code above to test it. Then, try changing the program so the trees appear to be a different color.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Adding Shape Colors"}
Which command adds a color to a shape in Java Processing?

- [x] `fill();`
- [ ] `color();`
- [ ] `shapeFill();`
- [ ] `shapeColor();`
:::

:::practice-question{name="Fill Sequencing"}
After which line in the code segment shown would you add the line `fill(100, 200, 50);` to change the color of the circle only?

```java
void setup() {
	size(800,600);
	fill(255, 255, 0);
	rect(100, 100, 50, 50);
	circle(175, 125, 50);
}
```

- [ ] 1
- [ ] 2
- [x] 3
- [ ] 4
:::

:::practice-question{name="Setting Color"}
Which of the following values will NOT change the color of the circle in the following code segment to a shade of blue?

```java
fill(<value>);  
circle(200, 100, 45);
```

- [x] `"blue"`
- [ ] `#0000ff`
- [ ] `0, 0, 255`
- [ ] `#1111ff`
:::

:::practice-question{name="Identifying Colors"}
What color will fill the rectangle in the code segment shown when run with Java Processing?

```java
void setup(){
   size(800, 600);
   fill(100, 0, 0);  
   circle(200, 300, 75);  
   noFill();  
   rect(100, 100, 60, 40);
   fill(0, 100, 0);
   circle(50, 50, 50);
}
```

- [ ] Red
- [x] Transparent
- [ ] Green
- [ ] Unknown
:::