---
title: Boolean Variables & Comparison
authors: Gary Lupton, Jon Stapleton
description: Learn about Boolean data and how to use it in variables. This concept serves as a foundation for a future lesson about writing code that allows the computer to make automated decisions.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---

Boolean data is a foundational concept in the larger discipline of computer science.  This tutorial is *not* intended to probe the depths of how boolean values serve as that foundation. Instead, this tutorial will focus on what a boolean value is and how that value can be stored in a variable with a `boolean` data type.

To start, recall that all variables in Java must include a data type. Most of the variables in previous lessons have used numeric data types--pimarily `int` and `float`--but there have also been some more complex data types, such as `String` and `color`. The `boolean` data type is actually the simplest data type that exists in Java. It can only hold one of two values: `true` or `false`. Check out the program below for an example of what `boolean` variables look like in a Java program:

:::code-and-image{src="/images/TODO:"}
```java
boolean gameStarted;  
  
void setup(){  
	size(800, 600);  
	gameStarted = false;  
}  
  
void draw(){  
	background(111);  
	textSize(50);  
	text("The game has started: " + gameStarted, 100, 200);  
}
```
:::

> **Practice:** What is the name of the Boolean variable in the program above? What value does the computer give that variable? Where is that variable used in the program? If you have trouble with these questions, consider checking out the tutorials on the [basics of variables](concepts/variables-types) and the tutorial on [manipulating variables](concepts/manipulating-variables).

There are only two values that can be stored in the `gameStarted` variable: `true` or `false`. Try changing the value assigned to the variable on line 5 to an `int` like `10` or a `String` like `"words"` and you’ll notice that a “Type mismatch” error occurs. This error means that the program has told the computer to store a value in a variable that does not match its data type, which isn't allowed in Java.

The range of uses for a `boolean`-type variable by itself are fairly limited. In the example above, the value stored in `gameStarted` is displayed on the screen when the game starts. For now this might seem fairly useless, but once a few additional pieces of coding content are added to this concept the importance of `boolean` values will be much more apparent.

## Comparison Operators & Relational Expressions

The layer of coding content you need to learn in order to understand why Boolean data is so important in programming is **comparison operators**, also called **relational operators**. You have probably heard of comparison operators in math. Here are the comparison operators you need to know to write code with Java:

| Operator                 | Symbol | Description                                                          | Example        |
| ------------------------ | ------ | -------------------------------------------------------------------- | -------------- |
| Equal To                 | `==`   | Value on the left is equivalent to the value on the right            | `num1 == num2` |
| Not Equal To             | `!=`   | Value on the left is not equivalent to the value on the right        | `num1 != num2` |
| Less Than                | `<`    | Value on the left is less than the value on the right                | `num1 < num2`  |
| Greater Than             | `>`    | Value on the left is greater than the value on the right             | `num1 > num2`  |
| Less Than or Equal To    | `<=`   | Value on the left is less than or equal to the value on the right    | `num1 <= num2` |
| Greater Than or Equal To | `>=`   | Value on the left is greater than or equal to the value on the right | `num1 >= num2` |
The relationship between comparison operators and Boolean values is that a comparison operator takes two values (often numbers) and produces a Boolean value as a result. Check out the example below:

:::code-and-image{src="/images/TODO:"}
```java
int lives;  
int health;  
int score;  
  
void setup(){  
  size(800, 600);  
  lives = 3;  
  health = 100;  
  score = 10;  
}  
  
void draw(){  
  background(111);  
  textSize(50);  
  text("You have are out of lives: " + (lives <= 1), 65, 200);  
  text("You have full health: " + (health == 100), 110, 270);  
  text("You've score over 25 points: " + (score >= 25), 40, 340);  
}
```
:::

When the computer compares two values to each other using a comparison operator, it's called a **relational expression**. In the example above there are three relational expressions:  `lives <= 1`, `health == 100`, and `score >= 25`.  Given the values stored in each variable at the beginning of the program, those expressions will result in `false`, `true`, and `false` respectively. Here’s why:

- The variable `lives` contains the integer value `3` when the computer evaluates the relational expression `lives <= 1`. You can read that expression as "Is `lives` less than or equal to `1`?".  Since 3 is *not* less than or equal to `1`, the computer evaluates the relational expression as `false`.
- The variable `health` contains the integer `100` when the computer evaluates the relational expression `health == 100`. Since `100` *is* equal to `100`, the computer evaluates the relational expression evaluates as `true`.
- The variable `score` contains the integer `10` when the computer evaluates the relational expression `score >= 25`.  Since `10` is *not* greater than or equal to `25`, the computer evaluates the relational expression evaluates as `false`.

This is a little more helpful than simply storing a Boolean value in a variable, but it’s still limited in terms of functionality.

## Why This Matters

Perhaps the simplest way to understand why this concept matters is to go to the [tutorial about "if" statements](/concepts/if-statements).  Even though the next lesson introduces a concept that is one of the most fundamentally important to all of programming, the fact of the matter is that Boolean values and relational expressions are the backbone that supports that concept.  

You’ll use these concepts a lot, just not in the exact way presented here. Mastering the concepts of Boolean values and relational expressions enables the programmer to create wide ranging functionality in a program through the use of layered decision making--something all games (and many other kinds of software) require.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Tracing Boolean Variables"}
What text would display on the screen as a result of the following code segment?

```java
boolean levelUp = false;

text("Are you ready to level up? "  + levelUp + "!", 10, 40);
```

- [ ] You are ready to level up: true!
- [x] You are ready to level up: false!
- [ ] You are ready to level up: levelUp!
- [ ] You are ready to level up: 50!
:::

:::practice-question{name="Tracing Relational Expressions"}
What text would display on the screen as a result of the following code segment?

```java
int lives = 1;

text("You are out of lives: " + (lives <= 1), 20, 100);
```

- [ ] You are out of lives: false
- [ ] You are out of lives: 20
- [x] You are out of lives: true
- [ ] You are out of lives: 120
:::

:::practice-question{name="Initializing Boolean Variables"}
Which of the following correctly declares and initializes a Boolean variable to true?

- [x] `boolean progress = true;`
- [ ] `boolean running = "true";`
- [ ] `int num = 1;`
- [ ] `bool val = true;`
:::


:::prompt{title="Activity 19"}
Using the program below as a starting point, add logic that checks to see if the center point of the circle is (1) on the top half of the screen and (2) on the left side of the screen.  Update the text to display the appropriate Boolean value.  

*Run the code multiple times to ensure it works correctly.

```java
int xPos, yPos, size;
color col;

void setup(){
  size(800, 600);
  size = (int) random(50, 200);
  xPos = (int) random(size, 800 - size);
  yPos = (int) random(size, 600 - size);
  col = color(random(0, 255), random(0, 255), random(0, 255));
}

void draw(){
  background(111);
  fill(col);
  circle(xPos, yPos, size);
  
  fill(255);
  textSize(30);
  text("The circle is on the top half of the screen: ", 5, 30);
  text("The cirlce is on the left side of the screen: ", 5, 590);
}
```
:::

:::prompt{title="Activity 20"}
Using the program below as a starting point, modify the code so the circle set in the middle of the screen grows constantly. Display a message on the screen that tells the user if the circle fits inside of the screen.

```java
float xPos, yPos, size;

void setup(){
  size(600, 600);
  xPos = 300;
  yPos = 300;
  size = 10;
}

void draw(){
  background(255);
  fill(#9242af);
  circle(xPos, yPos, size);
}
```
:::