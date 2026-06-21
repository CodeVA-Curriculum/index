---
title: Getting Started
authors: Gary Lupton, Jon Stapleton
description: Learn how to set up the Processing IDE to run programs and create the display window using the `size()` method.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
start: true
---
When you first open the Java Processing application, you'll see something like this:

![A screenshot of an empty Processing IDE editor](/TODO:)

This is the **Java Processing Integrated Development Environment (IDE)**.  An **IDE** is a program that includes multiple features needed to develop software programs into a single tool.  The Java Processing IDE includes a text editor, a compiler, and an output (or display) window.  This allows the developer to write code (using the text editor), turn code into machine executable commands (using the compiler), and view the output produced from the code (using the output window).

For more information about the Java Processing IDE, visit [https://processing.org/environment/](https://processing.org/environment/).

## The `setup()` Method

The first section of code that you need to write using the Java Processing IDE is a predefined Java Processing "method" that includes the instructions the computer will execute first when it runs.  This special method is the `setup()` method.  An easy way to think about this method right now is that the setup() method contains instructions, and the computer will follow those instructions first thing as soon as you have it run your program. The code snippet below shows what you need to type to create the `setup()` method:

```java
void setup(){  
  
}
```

With all programming languages, there are rules about how to enter your code.  Java Processing is no exception--there are some specific rules you need to follow to make Java Processing work correctly.  We call this the language’s **syntax**.  Syntax includes the keywords, symbols, and the way you organize your code. We'll be sure to highlight and explain syntax rules when we come across them.

Here are some quick things to note to avoid errors when you write the `setup()` method:

- Before the `setup()` method name, be sure to include the word `void`.  We'll explain that term in more detail later on.  For now, just know that keyword is necessary to avoid getting an error message.
- The word `setup()` always includes the open and close parentheses “`()`” after it.  This tells Java that "setup" is a method and not a different programming concept. If you forget to include the parentheses, then Java will display an error message.
- You are going to add some more code to the `setup()` method in a moment; when you do, make sure you write it between the "opening" and "closing" curly braces "`{ }`". Not using the curly braces correctly will result in an error message or cause the program to not work as expected.

## The `size()` Method

The code segment below uses the `setup()` method as well as a second method: `size()`. The `size()` method tells the computer to create an output window to show the results of your code and allows you to set that window's width and height.

```java
void setup(){  
  size(800, 600);  
}
```

You might notice that the `size()` method and the `setup()` method are written very differently from one another. You'll learn more about this distinction later on, but for now you can think of the `setup()` method as a "container" to hold our instructions for the computer to follow. In the code snippet above, the `setup()` method only has one instruction--the `size()` method.

> **Practice:** Copy the program above and write it into your Processing IDE editor. Then, click the "Play" button near the top left corner of the application (see the screenshot below). What does the computer do?

![A screenshot of the Processing IDE toolbar with the "play" button highlighted](/TODO:)

Notice three things about the `size()` method:

- The keyword `size()` is all lower case. This should always be the case.  The word `size` is different from the word `Size` or the word `SIZE` in Java.  This is because Java is a case-sensitive language.
- We've used two number values with the `size()` method (called **arguments**).  The first tells the computer how wide to the make the display window. The second sets the display window height. When you write coordinate pairs, the common nomenclature is (x, y). This is very similar. The x-coordinate is replaced with width (both horizontal) and the y-coordinate is replaced with height (both vertical).
- The method ends with a semicolon. This is syntax that must be included at the end of commands in Java. Without a semicolon, Java will display an error message.

The example above uses `size()` to create an output window that is `800` pixels wide by `600` pixels tall. You can use any positive number in place of these values.

To test the output window size, click the **play button** in the Java Processing IDE.  The play button is the blue triangle pointing to the right side of the screen inside an off-white circle towards the top left of the screen as shown above.

> **Practice:** Try changing the numbers for the width and height of the window and test your changes by clicking the "play" button. What do you notice?

The Processing IDE can create all sorts of things if you use different commands after `size()`. Check out some of the other tutorials on [the map](/map) to see what you can do!

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Avoid Errors"}
Which of the following `setup()` methods will run without producing an error? The `...` represent additional parameters or commands.

- [ ] `void setup {} ( ... );`
- [ ] `setup( ... );`
- [x] `void setup() { ... }`
- [ ] `setup() { ... }`
:::

:::practice-question{name="Display Dimensions"}
Which of the following correctly identifies the dimensions of the output window as shown in this program:

```java
void setup(){  
   size(400, 300);  
}
```

- [ ] height of 100, width of 100
- [x] width of 400, height of 300
- [ ] width of 700, height of 700
- [ ] height of 400, width of 300

	:::feedback
		The first argument is width (400) and the second argument is height (300).
	:::
:::

:::prompt={title="Activity 1"}
Using the code below, resize the screen so that all elements in the code are displayed on the screen.  *Do not try to move the elements to fit them into the existing screen size*

```java
void setup(){
  // draw the canvas
  size(600, 400); 
  
  // draw the scene
  rect(960, 5, 125, 90);
  rect(-30, 25, 125, 90);
  rect(-5, 325, 125, 90);
  rect(200, 35, 490, 250);
  rect(360, 315, 60, 60);
  rect(875, 100, 60, 60);
  rect(775, 320, 300, 60);
  rect(0, 530, 1100, 40);
  rect(200, 480, 50, 50);
  rect(325, 470, 220, 60);
  rect(560, 460, 165, 70);
  rect(780, 470, 65, 60);
  rect(950, 470, 120, 60);
}
```
:::