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

For more details about using RGB and Hex values, see the lesson on [Background Colors](applications/background-colors.md).

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

:::prompt{title="Activity 7"}
Using the program below as a starting point, create an alternative color scheme to the one in the existing program.

```java
void setup(){
  // draw the canvas, including color
  size(1100, 570); 
  background(161, 174, 255);
  
  // draw the scene
  /* See the model image used to create this scene */
  
  fill(50, 79, 4);
  circle(1040, 55, 100);
  circle(20, 80, 100);
  circle(45, 350, 100);
  fill(18, 242, 19);
  rect(200, 35, 490, 250);
  fill(100, 200, 40);
  rect(360, 315, 60, 60);
  rect(875, 100, 60, 60);
  rect(775, 320, 300, 60);
  fill(243, 143, 209);
  circle(645, 540, 160);
  fill(0, 100, 119);
  circle(225, 500, 60);
  fill(227, 50, 198);
  circle(355, 500, 80);
  circle(415, 500, 80);
  circle(475, 500, 80);
  circle(1010, 500, 80);
  fill(17, 171, 71);
  circle(810, 500, 60);
  fill(25, 201, 19);
  rect(0, 530, 1100, 40);
}
```
:::

## The `stroke()` and `noStroke()` Methods


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