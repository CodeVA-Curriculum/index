---
title: Make an "Asteroids" Game
video: https://www.youtube.com/embed/14I8C6FKINQ # TODO: livestream link
nodes:
    intro:
        - concepts/getting-started.md
        - concepts/calling-functions.md
        - ./asteroids-shapes.md       
    
authors: Jon Stapleton
description: In this project, you'll follow along as Jon walks you through how to create a clone of the classic retro game "Asteroids." In this project, you'll learn the basics of how to create simple games with p5js, including using calling functions, using variables, using objects, and grouping objects together using arrays.
difficulty: 4
icon: 
---

TODO: Long description
variables:
        - $intro
        - concepts/variables-types.md
        - concepts/manipulating-variables.md
        - ./asteroids-variables.md
        - ./asteroids-rotation.md
    objects:
        - $variables
        - concepts/objects.md
        - applications/sprite-basics.md             #   4-5
        - applications/sprite-images.md
        - ./asteroids-sprites.md   
        - applications/sprite-animations.md
        - ./asteroids-basic-animation.md
    movement:
        - $variables
        - applications/sprite-movement.md
        - concepts/if-statements.md             # ✅
        - applications/keycode-lastkey.md
        - ./asteroids-movement.md               # ✅
    collisions:
        - $movement
        - concepts/point-square-collision.md    #   8-9
        - ./asteroids-collisions.md       #

arrays:
        - $collisions
        - concepts/arrays-basics.md             #   9-10
        - applications/object-arrays.md         #   10-11
        - ./asteroids-bullet-arrays.md
        - concepts/randomization.md             #   11-12
        - ./asteroids-obstacle-arrays.md
    animations:
        - $arrays
        - applications/sprite-animations.md     #   12-13
        - ./asteroids-basic-animation.md

    