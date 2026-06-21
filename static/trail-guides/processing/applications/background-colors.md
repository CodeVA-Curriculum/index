---
title: Background Colors
authors: Gary Lupton, Jon Stapleton
description: Learn how to change the background of the Processing display window using the `background()` method.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
Adding colors to the scene is a simple way to add character to a scene. The scene’s background is a good place to add color when starting a new scene, animation, or game. To add a background color, use the `background()` method.

```java
void setup(){  
  size(800, 600);  
  background(100);  
}
```

The program above shows that the `background()` method takes a single argument - in this case `100`. This is the simplest way to add a background color. When a single integer value is used, the only argument values available are from 0 to 255. Those values will produce colors that are black (0), white (255), and shades of gray (1-254).

> **Practice:** Copy the program above into your editor, and click the "play" button to test it. Then, change `100` to something else and run the program again. What do you notice?

## Different Color Approaches

The example above is a great approach to create backgrounds using shades of gray!  However, another approach is needed when more colors are required. There are two additional approaches for using color presented here.

### RGB Colors

The first approach uses **RGB colors**. This approach uses three values - all between 0 and 255. The first value represents the amount of red. The second value is the amount of green. The third value is the amount of blue. The computer takes those three values--red, green, and blue--and mixes them together to make a background color. This is why it’s called R(ed)G(reen)B(lue) color.

> **Practice:** Try out the following code segment in the Java Processing IDE to create a background that is a shade of blue. Then, change the colors to try to make a shade of green instead.

```java
void setup(){  
  size(800, 600);  
  background(17,0,152);  
}
```

### Hex Colors

The second approach uses **hex color codes**. Hex colors are very similar to RGB values even though it might not appear so at first glance.  With hex colors there will always be six values preceded by a hash (`#`) symbol.  The values can be any value from `0` to `9` as well as letters `A`, `B`, `C`, `D`, `E`, and `F`.

```java
void setup(){  
  size(800, 600);  
  background(#110098);  
}
```

> **Practice:** Copy the program above into your IDE and press the "play" button to run the program. Then, try changing the numbers in the hex code on line 3 to something else and running the program again. What do you notice?

When the computer runs this program, the hex code (#110098) used here generates the same color as the RGB values shown in the prior section (`17, 0, 152`).  That’s because the interprets those values the same as one another despite the fact that they are represented differently. The hex code has three sets of color values that match the RGB values. In the hex example, the first two digits `11` are equivalent to RGB’s first value of `17`, `00` in hex is equivalent to `0`, and `98` in hex is equivalent to `152`.

Most online color code generators, such as [https://htmlcolorcodes.com/](https://htmlcolorcodes.com/), will give you both the RGB and hex values. If you’d like to learn more about the relationship between RGB colors and hex values, check out [this blog post](https://www.pluralsight.com/blog/tutorials/understanding-hexadecimal-colors-simple).

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Changing the Background"}
Which method is used to change the background color of the canvas in Java Processing?

- [ ] `bgcolor();`
- [x] `background();`
- [ ] `color();`
- [ ] `background-color();`
:::

:::practice-question{name="Color Shades"}
Which of the following methods will set the color of the canvas to a shade of red?

- [x] `background(150, 0, 0);`
- [ ] `background(red);`
- [ ] `background(#00AACC);`
- [ ] `background(100);`
:::