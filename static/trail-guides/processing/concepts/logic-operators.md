---
title: Logic Operators
authors: Gary Lupton, Jon Stapleton
description: Learn how to combine relational expressions and Boolean values to create complex conditional statements, controlling how the computer makes decisions as it runs your program.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
Logic operators are used to combine boolean values to create a new boolean value. It’s similar to combining numeric values using arithmetic operations but instead of having numbers as operands, logical expressions only have operands with values of `true` or `false`.

There are three logic operators that can be used in Java programs:

| Operator | Symbol | Description                                                                                                                                                                         | Example            |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| AND      | `&&`   | Combines two boolean values to result in a single boolean value - both must be `true` in order to get a result of `true`, otherwise the result of the operation is `false`          | `bool1 && bool2`   |
| OR       | `\|\|` | Combines two boolean values to result in a single boolean value - either boolean can be `true` in order to get a result of `true`, otherwise the result of the operation is `false` | `bool1 \|\| bool2` |
| NOT      | `!`    | Inverts a single boolean value - `true` becomes `false` and `false` becomes `true`                                                                                                  | `!bool1`           |
Check out the example below:

:::code-and-image{src="/images/TODO:"}
```java
int xSpeed, ySpeed, xPos, yPos, size;  
  
void setup(){  
  size(800, 600);  
  xPos = 0;  
  yPos = 0;  
  size = 5;  
  xSpeed = 4;  
  ySpeed = 3;  
}  
  
void draw(){  
  background(#ffffff);  
  if(xPos > 100 && xPos < 400 && yPos < 300){  
    xSpeed = 2;  
  }  
  if(xPos > 400 || yPos > 300){  
    ySpeed = 1;  
  }  
   
  // update the x-position, y-position, and circle size  
  xPos += xSpeed;  
  yPos += ySpeed;  
  size++;  
  if(size > 100){  
    size = 100;  
  }  
   
  // draw the circle  
  fill(0);  
  noStroke();  
  circle(xPos, yPos, size);  
}
```
:::

The example above uses all three kinds of logic operators. The first two use logic operators to control the speed of the fall (via the `ySpeed` variable). In the first, `if(xPos > 100 && xPos < 400 && yPos < 300)`, all of the relational expressions must be true in order for the computer to execute the code in the "if" statement. That means the `xPos` must be between `100` and `400` and the `yPos` must be less than `300`. 

The way this logical expression is designed means there is a specific segment of the canvas that the center of the circle must be within to cause the speed to change to `2`. Once the computer changes `xSpeed` to `2` there’s nothing in the program to direct the computer to change that variable to anything else.
  
The second if statement, `if(xPos > 400 || yPos > 300)`, uses an OR operator. That means once *either* of the relational expressions evaluates to `true` the entire "if" statement condition will also be `true`. Once the center of the circle is on the right half of the screen (`xPos` is greater than `400`) or the bottom half of the screen (`yPos` is greater than `300`), the computer will change the value of `ySpeed` to `1`.  As with `xSpeed`, there is nothing in our code that directs the computer to change the value of `ySpeed` to any other value than `1` after program execution begins.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Tracing 'If' Statements"}
What text message will display on the screen at the conclusion of this code segment?

```java
int xPos = 400;
int yPos = 300;
int size = 50;

if(size == 50 && xPos <= 400 || xPos > 300){  
	xPos += 100;  
	yPos -= 50;
	size *= 4;
}

text("The coordinates are: (" + xPos + "," + yPos + ")", 10, 10);
```

- [x] The coordinates are: (500, 250)
- [ ] The coordinates are: (200, 200)
- [ ] The coordinates are: (400, 300)
- [ ] The coordinates are: (600, 500)
:::

:::practice-question{name="Tracing Variables & 'If' Statements"}
What value will be stored in `txtCol` at the conclusion of this code segment?

```java
int xPos = 100;
int yPos = 200;
color txtCol = #121212;

if(xPos > 400 || yPos <= 300 || txtCol == #121212){
   txtColor = #565656;  
}

if(xPos < 400 && yPos > 300){  
   txtCol = #343434;
}
```

- [x] `#565656`
- [ ] `#343434`
- [ ] `null`
- [ ] `#121212`
:::