---
title: Activity 24
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Create an animation that moves from one scene to another as the animation progresses. Use well-defined events in the animation to cause the scene to switch from one to another.

## Solution

:::code-and-image{src="/images/TODO:"}
```java
int level, timer, speed, levelCount;
boolean showScene;

void setup(){
  size(800, 600);
  level = 0;
  timer = 0;
  speed = 100;
  levelCount = 5;
  showScene = true;
}

void draw(){
  // change scene
  
  if(level == 0){
    background(#000000);
    
    // message
    fill(#ffffff);
    textSize(50);
    text("Somewhere in the mountains...", 80, 250);
    showScene = false;
  } else if(level == 1){
    background(#abcdef);
    
    // sun
    noStroke();
    fill(#ffff33);
    circle(150, 100, 130);
    
    // clouds
    fill(255);
    ellipse(130, 170, 110, 80);
    ellipse(220, 160, 160, 110);
    ellipse(300, 130, 130, 95);
    showScene = true;
  } else if(level == 2){
    background(#000000);
    
    // message
    fill(#ffffff);
    textSize(50);
    text("Later That Evening...", 190, 250);
    showScene = false;
  } else if(level == 3){
    background(#234567);
    
    // moon
    noStroke();
    fill(#ffffff);
    circle(450, 150, 80);
    showScene = true;
  } else if(level == 4){
    background(#000000);
    
    // message
    fill(#ffffff);
    textSize(50);
    text("The End", 310, 250);
    showScene = false;
  }
  
  // add scene elements
  if(showScene){
    fill(#00b800);
    rect(0, 420, 800, 180);
    
    // mountains with snow
    fill(153);
    triangle(-20, 420, 150, 240, 320, 420);
    triangle(110, 420, 320, 200, 530, 420);
    triangle(400, 420, 540, 270, 680, 420);
    fill(255);
    triangle(100, 290, 150, 240, 200, 290);
    triangle(270, 250, 320, 200, 370, 250);
    triangle(490, 320, 540, 270, 590, 320);
    
    // tree
    fill(#a52a2a); // set shape color  
    rect(710, 360, 20, 100);   
    fill(#005400); 
    circle(720, 350, 100);
  }
  
  timer++;
  if(timer % speed == 0 && level < levelCount){
    level++;
  }
  
}
```
:::