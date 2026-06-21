---
title: Activity 10
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Use the Java Reference Guide to learn how to use additional shapes in order to recreate the scene in the image below:

![[modelImage_sampleScene10.png]]

*Hint: The picture mostly uses simple shapes, but it also uses an image. You can download the image here.*
## Solution

```java
PImage poster;

void setup(){
  
  // setup the canvas size and color
  size(1200, 600);
  background(205, 240, 255);
  poster = loadImage("Processing_2021_logo.png");
  
  /* draw a face with a speech bubble */
  
  // draw the poster
  stroke(15);
  fill(255);
  rect(85, 35, 300, 300);
  image(poster, 100, 50);
  
  // draw the hair
  noStroke();
  fill(15);
  triangle(600, 200, 500, 300, 700, 300);
  triangle(500, 230, 730, 330, 450, 400);
  triangle(700, 230, 470, 330, 750, 400);
  triangle(450, 300, 600, 300, 460, 380);
  triangle(750, 300, 600, 300, 740, 380);
  
  // draw the body
  noStroke();
  fill(128, 0, 128);
  rect(400, 530, 400, 170, 90);
  
  // draw the head
  noStroke();
  fill(176, 108, 73);
  circle(600, 400, 300);
  
  // draw the eyes
  fill(250, 249, 246);
  ellipse(550, 370, 60, 40);
  ellipse(650, 370, 60, 40);
  
  // draw the pupils
  fill(125,149,109);
  circle(550, 370, 30);
  circle(650, 370, 30);
  
  // draw the nose
  stroke(136, 68, 33);
  fill(176, 108, 73);
  triangle(600, 400, 575, 450, 625, 450);
  
  // draw the mouth
  noStroke();
  fill(227,93,106);
  arc(600, 480, 150, 50, 0, PI);
  
  // draw the ears
  noStroke();
  fill(176, 108, 73);
  ellipse(450, 400, 20, 80);
  ellipse(750, 400, 20, 80);
  
  /* draw the speech bubble */
  
  // draw the shadow
  noStroke();
  fill(45);
  ellipse(810, 130, 300, 200);
  triangle(700, 300, 710, 130, 810, 130);
  
  // draw the top bubble
  fill(255);
  ellipse(800, 120, 300, 200);
  triangle(700, 300, 700, 120, 800, 120);
  
  // draw the text in the bubble
  fill(2, 5, 90);
  textSize(60);
  text("Hello", 735, 110);
  text("World!", 720, 170); 
}
```