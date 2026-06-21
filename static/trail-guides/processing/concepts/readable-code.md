---
title: Writing Readable Code
authors: Gary Lupton, Jon Stapleton
description: Learn some best practices for writing readable code.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---

Who reads a program’s code? The two simplest answers to this question are (1) the coder and (2) the computer. The reality usually isn’t quite this simple. It is very common for many people different to read a program’s code. Another programmer might need to understand how a program works in order to use that program in a new context, add functionality to the program, or fix a bug. Sometimes another programmer might read a program’s code just to learn how the it processes data so that they can use a similar idea for a different program. Even if someone else isn't reading your code, if you leave it for a long time and come back to it, you will need to read what you wrote and interpret it. If your code is hard to read, even *you* might not be able to figure out how what you created works!

This tutorial focuses on three approaches to writing readable code that all coders should follow. Future tutorials will build on these approaches.

## Code Indentation

First, correct indentation is important. The only indented code identified so far in this course is the code inside the setup() method.  Indenting code in this situation happens virtually by default with the Java Processing IDE, however it is possible to indent code poorly in this case. As an example of poor indentation, consider the program below:

```java
void setup(){  
  size(800, 600);  
  background(100, 0, 200);  
   
  rect(100, 100, 50, 50);  
circle(175, 175, 50);  
rect(200, 200, 50, 50);  
  circle(275, 275, 50);  
}
```

The two lines that are not following the indentation should stand out here.  Proper indentation shows that all of the code is clearly in the same method. This piece of information is very helpful to another person reading the code. 

Incorrect indentation can confuse the reader and make them think the code is doing something it might not be. The importance of proper code indentation will become more clear as you learn more coding concepts. For now, make sure all code in the setup() method is indented one level.

## Code Grouping

Code grouping keeps related pieces of code together. For example, program code in previous lessons consistently includes a space between the size() and background() methods and the methods used to add other elements to the screen. Consider the example below:

:::code-and-image{src="/images/TODO:"}
```java
PImage player;  
  
void setup(){  
  size(800, 600);  
  background(100, 0, 200);  
   
  rect(100, 100, 50, 50);  
  circle(175, 175, 50);  
  rect(200, 200, 50, 50);  
  circle(275, 275, 50);  
   
  player = loadImage("images/walkingGuy.png");  
  image(player, 90, 25);  
}
```
:::

The blank lines create three separate sections of code, an obvious grouping that another programmer will notice right away. The computer doesn’t care about blank lines. It runs the code the same way regardless of blank lines. Grouping lines of code is all about human readability, which other humans will really appreciate if and when they have to read your program.

## Comments

The final best practice is to use **comments**. Comments are lines of text in your code that the computer will ignore when it runs a program’s code. There are two types of comments discussed here: single-line comments and multi-line comments.

Single-line comments are comments that appear on a single line. Use double forward slashes to add a single-line comment:

```java
PImage player;  // declare a player object  
  
void setup(){  
  // set the size and background  
  size(800, 600);  
  background(100, 0, 200);  
   
  rect(100, 100, 50, 50);  
  circle(175, 175, 50);  
  rect(200, 200, 50, 50);  
  circle(275, 275, 50);  
   
  player = loadImage("images/walkingGuy.png");  
  image(player, 90, 25);  
}
```

Notice how in the example above that single line comments can be placed on their own line (line 4) or be included after a command (line 1).  The computer will ignore everything after the “//” symbols, making that text something that is needed for human readers.
  
The other type of comment is a multi-line comment.  This type of comment starts with `/*` and ends with `*/`. Check out the program below for some examples of multi-line comments:

```java
PImage player;  // declare a player object  
  
void setup(){  
  // set the size and background  
  size(800, 600);  
  background(100, 0, 200);  
   
  /* add the objects for the player to jump on  
  this includes rectangles and circles

  the shapes are positioned diagonally going down */  
  rect(100, 100, 50, 50);  
  circle(175, 175, 50);  
  rect(200, 200, 50, 50);  
  circle(275, 275, 50);  
   
  /* add the main character  
  who starts on the top block facing screen right*/  
  player = loadImage("images/walkingGuy.png");  
  image(player, 90, 25);  
}
```

Comments are an important way to inform the reader about the purpose and approach used in specific sections of code.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Reasons for Readable Code"}
Which of the following is NOT a reason to write code that is easy to read?

- [x] Allows the computer to execute the code more efficiently
- [ ] Allows other programmers to more easily fix errors in a program
- [ ] Helps other programmers to more quickly find specific functionality in a program
- [ ] Helps other programmers to more quickly understand the purpose of a program
:::

:::practice-question{name="Single-Line Comment"}
Which of the following creates a single-line comment?

- [ ] `#`
- [ ] `/*`
- [x] `//`
- [ ] `***`
:::

:::practice-question{name="Techniques for Readable Code"}
Which of the following is an effective approach used to make program code more readable?  (Select all that apply)

- [ ] code scripting
- [x] comments
- [x] code grouping
- [x] code indentation
:::