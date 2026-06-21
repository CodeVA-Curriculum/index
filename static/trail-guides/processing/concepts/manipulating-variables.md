---
title: Manipulating Variables
authors: Gary Lupton, Jon Stapleton
description: Learn how to have the computer recall and modify the values of variables using assignment and arithmetic operators.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
A major advantage of using variables instead of writing number values explicitly is the fact that you can have the computer update the values variables while it runs the program. Changing a variable requires the use of mathematical expressions. Check out the example below:

:::code-and-image{name="Changing Circle Size" src="/images/TODO:"}
```java
void setup(){  
	size(800, 600);  
	// change the any of these values to see how the output changes  
	color firstCirc = color(255, 0, 0);  
	color secondCirc = color(0, 0, 255);  
	
	int circSize = 100;  

	// Display the first circle
	fill(firstCirc);  
	circle(100, 100, circSize);  
	
	circSize = 200;  // update the variable

	// Display the second circle
	fill(secondCirc);  
	circle(100, 250, circSize);  
}
```
:::

> **Practice:** Try changing the `100` or the  `200` on lines 7 and 13. How does the output of the program change?

After the computer initializes the `circSize` variable with a value of `100` on line 7, it uses that variable to set the diameter of the first red circle. Then, the computer changes the value of the `circSize` variable to `200` uses that value to display second ball which is blue and twice as big.

A variable can only store one value at a time. In the example above, the computer changes the value of `circSize` *absolutely*, erasing the old value of `100` and replacing it with `200`.

## Relative Value Changes

You can also have computer modify variables *relatively*. With a relative value change, the computer uses the existing value of the variable as part of a mathematical process to find the new value of the variable. Here's an example:

:::code-and-image{name="Relative Position Change" src="/images/TODO:"}
```java
void setup(){  
	size(800, 600);  
	 
	color firstCirc = color(255, 0, 0);  
	color secondCirc = color(0, 0, 255);  
	
	int circSize = 100;  
	int circX = 50;  
	int circY = 50;  
	
	fill(firstCirc);  
	circle(circX, circY, circSize);  
	
	circX = circX + ballSize;  // update the variable
	fill(secondCirc);  
	circle(circX, circY, circSize);  
	
	circX = circX + ballSize;  // update the variable
	fill(firstCirc);  
	circle(circX, circY, circSize);  
	
	circX = circX + ballSize;  // update the variable
	fill(secondCirc);  
	circle(circX, circY, circSize);  
}
```
:::

In the example above, the variable `circX` starts with a value of `50`. The computer modifies the value of `circX` several times throughout the program, increasing it by the value of `circSize` after displaying each new circle. This approach makes the computer display each new circle next to the previous one on the screen. The color of the ball alternates between two colors (`firstCirc` and `secondCirc`) as the program progresses as well.

Making relative changes to variables is helpful for variables that need to change as the program progresses. We'll return to this concept when we [animate the positions, sizes, and colors of shapes](/tutorials/applications/draw-method) later on.

### Assignment Operators

A helpful shortcut to use when changing a variable value relative to its current value is to use **assignment operators**. Here's an example:

```java
void setup(){  
  size(800, 600);  
  float xPos = 50;  
   
  // this is the standard way to add 20 to the existing value for xPos  
  xPos = xPos + 20;  
   
  // this uses an assignment operator to add 20 to xPos  
  xPos += 20;  
}
```

The example above makes use of the **addition assignment operator** (`+=`). There are four assignment operators you might want to know about; here are some examples (assume `xPos` starts with a value of `50`):

| Operator       | Code Example | Description                                                                         |
| -------------- | ------------ | ----------------------------------------------------------------------------------- |
| Addition       | `xPos += 20` | Add `20` to `xPos` to get a result of `70`, then store the result in `xPos`.        |
| Subtraction    | `xPos -= 20` | Subtract `20` from `xPos` to get a result of `30`, then store the result in `xPos`. |
| Multiplication | `xPos *= 20` | Multiply `xPos` by 20 to get a result of `1000`, then store the result in `xPos`.   |
| Division       | `xPos /= 20` | Divide `xPos` by 20 to get a result of `2.5`, then store the result in `xPos`.      |

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Modifying Variable Values"}
Which of the following sets the value of an integer variable `sunWidth` to `80` regardless of the current value stored by the variable?

- [x] `sunWidth = 80;`
- [ ] `sunWidth = sunWidth + 80;`
- [ ] `sunWidth == 80;`
- [ ] `sunWidth += 80;`
:::

:::practice-question{name="Assignment Operators"}
Which of the following adds `10` the value of an integer variable `sunWidth`? (Select all correct answers)

- [x] `sunWidth += 10;`
- [ ] `sunWidth = 10;`
- [ ] `sunWidth *= 10;`
- [x] `sunWidth = sunWidth + 10;`
:::