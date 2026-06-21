---
title: '"Practice: Editing Shapes"'
---
Use the questions and prompts below to practice placing and editing shapes!

:::prompt{title="Activity 4"}
Using the program below as a starting point, move the existing shapes and adjust the background color in the existing scene to recreate the scene shown in the screenshot below.

![A screenshot of the output of the solution program](sampleScene04_finished.png)

```java
void setup(){
  // draw the canvas
  size(1100, 570); 
  background(180);
  
  // draw the scene
  circle(850, 130, 100);
  circle(0, 120, 100);  
  circle(105, 250, 100);  
  rect(250, -35, 490, 250);
  rect(360, 315, 60, 60);
  rect(1040, 0, 60, 60);
  rect(775, 420, 300, 60);
  circle(745, 540, 160);
  circle(175, 420, 60);
  circle(355, 450, 80);
  circle(415, 550, 80);
  circle(435, 500, 80);
  circle(910, 390, 60);
  circle(1100, 530, 80);
  rect(0, 530, 1100, 40);
}
```
:::

:::prompt{title="Activity 5"}
Using the program below as a starting point, switch out the indicated rectangles for circles while keeping the center point of the rectangle as the center point of the new circle and the size of the circles consistent with the size of the erased rectangles.

```java
void setup(){
  // set canvas size and color
  size(1200, 750);
  background(180);
  
  // draw the scene
  /* do not change these rectangles */
  rect(0, 0, 1200, 150);
  rect(0, 150, 150, 75);
  rect(0, 225, 75, 75);
  rect(675, 150, 150, 75);
  rect(1050, 150, 150, 75);
  rect(1125, 225, 75, 75);
  rect(0, 675, 600, 75);
  rect(750, 675, 450, 75);
  rect(0, 600, 150, 75);
  rect(0, 525, 75, 75);
  rect(750, 600, 150, 75);
  rect(1050, 600, 150, 75);
  rect(1125, 525, 75, 75);
  rect(600, 75, 75, 75);
  
  /* change these rectangles to circles */
  rect(225, 225, 75, 75);
  rect(375, 225, 75, 75);
  rect(225, 375, 75, 75);
  rect(375, 375, 75, 75);
  rect(225, 525, 75, 75);
  rect(375, 525, 75, 75);
  rect(900, 225, 75, 75);
  rect(900, 375, 75, 75);
  rect(900, 525, 75, 75);
  rect(230, 300, 75, 75);
  rect(500, 600, 75, 75);
  rect(825, 365, 75, 75);
  rect(1050, 240, 75, 75);
  rect(630, 240, 75, 75);
}
```
:::

:::prompt{title="Activity 6"}
![[modelImage_sampleScene06.png]]
Create a new Java Processing document with code that creates an abstract version of the screenshot shown in the image above as closely as you can, using only simple shapes.
:::