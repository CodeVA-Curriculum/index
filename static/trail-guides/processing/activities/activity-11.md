---
title: Activity 11
authors: Gary Lupton, Jon Stapleton
description: "TODO:"
type: tutorial
---

Using the program below as a starting point, update the code to use variables to establish values used in the code instead of “hardcoding” those values into the commands. The logo displayed should look the same after the the code has been updated:

:::code-and-image{src="/images/TODO:"}
```java
void setup(){
  size(400, 400);
  background(0);
  
  fill(255);
  noStroke();
  circle(200, 150, 250);
  
  fill(0);
  arc(100, 150, 150, 300, PI * -.30, PI * .30);
  arc(300, 150, 150, 300, PI * .70, PI * 1.30);
  
  fill(255);
  arc(90, 150, 150, 300, PI * -.27, PI * .27);
  arc(310, 150, 150, 300, PI * .73, PI * 1.27);
  
  stroke(0);
  strokeWeight(10);
  line(200, 25, 200, 280);
  line(75, 150, 325, 150);
  
  stroke(255);
  strokeWeight(2);
  line(75, 300, 325, 300);
  textSize(44);
  text("BASKETBALL", 80, 340);
  line(75, 353, 325, 353);
}
```
:::

## Solution

```java
void setup(){
  int bgColor = 0;
  int lineColor = 255;
  int ballX = 200;
  int ballY = 150;
  int ballSize = 250;
  int CurveY = 150;
  int CurveWidth = 150;
  int CurveHeight = 300;
  int leftCurveX = 100;
  float leftCurveStart = PI * -.30;
  float leftCurveEnd = PI * .30;
  float leftCurveInnerStart = PI * -.27;
  float leftCurveInnerEnd = PI * .27;
  int rightCurveX = 300;
  float rightCurveStart = PI * .70;
  float rightCurveEnd = PI * 1.30;
  float rightCurveInnerStart = PI * .73;
  float rightCurveInnerEnd = PI * 1.27;
  int lineThickness = 10;
  int vertLineX = 200;
  int vertLineStartY = 25;
  int vertLineEndY= 280;
  int horLineY = 150;
  int horLineStartX = 75;
  int horLineEndX = 325;
  int outline = 2;
  int textLineStartX = 75;
  int textLineEndX = 325;
  int topLineY = 300;
  int botLineY = 353;
  String txt = "BASKETBALL";
  int txtSize = 44;
  int textX = 80;
  int textY = 340;
  
  size(400, 400);
  background(bgColor);
  
  fill(lineColor);
  noStroke();
  circle(ballX, ballY, ballSize);
  
  fill(bgColor);
  arc(leftCurveX, CurveY, CurveWidth, CurveHeight, leftCurveStart, leftCurveEnd);
  arc(rightCurveX, CurveY, CurveWidth, CurveHeight, rightCurveStart, rightCurveEnd);
  
  fill(lineColor);
  arc(leftCurveX - 10, CurveY, CurveWidth, CurveHeight, leftCurveInnerStart, leftCurveInnerEnd);
  arc(rightCurveX + 10, CurveY, CurveWidth, CurveHeight, rightCurveInnerStart, rightCurveInnerEnd);
  
  stroke(bgColor);
  strokeWeight(lineThickness);
  line(vertLineX, vertLineStartY, vertLineX, vertLineEndY);
  line(horLineStartX, horLineY, horLineEndX, horLineY);
  
  stroke(lineColor);
  strokeWeight(outline);
  line(textLineStartX, topLineY, textLineEndX, topLineY);
  textSize(txtSize);
  text(txt, textX, textY);
  line(textLineStartX, botLineY, textLineEndX, botLineY);
}

```