---
title: Modular Design
authors: Gary Lupton, Jon Stapleton
description: Learn how to define your own methods as you create modular, reusable sequences of code.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
In Java, methods make things happen. That’s a big idea that is fundamental to using Java Processing. Want to make a circle? Use the `circle()` method.  Want to make something green? Use the `fill()` method.  Want to change the size of the canvas? Use the `size()` method inside of the `setup()` method. Methods are everywhere in Java Processing, but there’s even more that they can do!

This tutorial will demonstrate how **developer-defined methods** are used to create small, reusable code segments that can make the program’s code easier to read while also helping to simplify the process of creating larger programs with many different pieces of functionality.

## Developer-Defined Methods

Java Processing uses lots of methods. With most of those methods, what’s happening in the “background” when those methods are called is invisible to you, the programmer. With methods like `rect()`, `circle()`, `fill()`, and `noStroke()`--as well as many others--there is no way for you to see what steps the computer follows as it executes those methods to produce the desired output. Java Processing just does it "behind the scenes".

Java Processing also has other methods, such as `setup()`, `draw()`, `mouseClicked()`, and `keyPressed()`, that are a little bit different. These methods contain instructions written by the programmer that tell the computer what to do whenever the method is triggered. Developer-defined methods are more similar to these methods with one major difference. The methods mentioned above are defined by the programmer, but triggered, or **called**, automatically by the inner workings of Java Processing. Developer-defined methods need to be defined and called by you, the programmer. Here's an example of what that looks like:

:::code-and-image{src="/images/TODO:"}
```java
int xPos, yPos, rad;  
  
void setup(){  
  size(800, 600);  
  rad = 50;  
  changePos();  
}  
  
void draw(){  
  background(#000000);  
  fill(#ffffff);  
  circle(xPos, yPos, rad * 2);  
}  
  
void mouseClicked(){  
  changePos();  
}  
  
void changePos(){  
  xPos = (int) random(rad, width-rad);  
  yPos = (int) random(rad, height-rad);  
}
```
:::

The example above show how you create a developer-defined method and one reason why developer-defined methods are helpful. When the computer executes the `changePos()` method, it updates the `xPos` and `yPos` variables. The `draw()` method renders the circle on the canvas using the `xPos` and `yPos` variables updated by `changePos()`.   

The structure of the `changePos()` method is very similar to the structure of `draw()`, `setup()`, and `mouseClicked()`. The first line defines the method’s heading “`void changePos() {`”, and the code inside the method gives directions for the computer to follow each time the method is called.

The program has two called to the `changePos()` method--first in the `draw()` method, then again in the `mouseClicked()` method. Using the `changePos()` method allows the computer to use the same section of code twice without the programmer having to write it twice. Without using the developer-defined method, we'd need to write the `changePos()` sequence twice and include it in both places.  This is one of the benefits of developer-defined methods: it gives you the ability to reuse code segments without repeating the code.

## Readability

Re-usability is only one advantage of developer-defined methods. Another advantage is that the code is easier to read and follow. Check out this example:

:::code-and-image{src="/images/TODO:"}
```java
void setup(){  
  size(800, 600);  
  background(#abcdef);  
  fill(#009900);  
  rect(0, 450, 800, 150);  
}  
  
void draw(){  
}  
  
void keyPressed(){  
  // check for key press of 'C' or 'T'  
  if(keyCode == 'C'){  
    drawCloud();  
  } else if(keyCode == 'T'){  
    drawTree();  
  }  
}  
  
void drawTree(){  
  // draw a tree  
  int xPos = (int) random(100, 700);  
  int yPos = (int) random(360, 500);  
  noStroke();  
  fill(#8b4513);  
  rect(xPos, yPos, 30, 100);  
  fill(#003300);  
  circle(xPos + 15, yPos, 100);  
}  
  
void drawCloud(){  
  // draw a cloud  
  int xPos = (int) random(100, 700);  
  int yPos = (int) random(50, 300);  
  noStroke();  
  fill(#ffffff);  
  ellipse(xPos, yPos, 100, 50);  
}
```
:::

The program above avoids expressing large segments of code in a single method.  The re-usability and readability of this code is greatly improved by incorporating developer-defined methods.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Advantages of Methods"}
Which of the following is ***not*** an advantage of creating developer-defined methods?

- [ ] Less Code
- [x] Faster Peformance
- [ ] Reusability
- [ ] Readability
:::

:::practice-question{name="Processing Methods"}
Which of the following statement is true about developer-defined methods and some existing Java Processing methods like `setup()`, `draw()`, or `mouseClicked()`?

- [x] Developer-defined methods need to be called, Java Processing methods do not
- [ ] Developer-defined methods need to be defined, Java Processing methods do not
- [ ] Neither type of method needs to be defined or called
- [ ] Both types of methods need to be both defined and called
:::

:::practice-question{name="Identifying Methods"}
Which of the following could be a call to a developer-defined method?

- [ ] `size(400, 400);`
- [ ] `puppy();`
- [ ] `mouseClicked();`
- [ ] `draw();`
:::