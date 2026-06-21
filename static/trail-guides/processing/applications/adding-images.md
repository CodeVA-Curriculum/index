---
title: Adding Images
authors: Gary Lupton, Jon Stapleton
description: Learn how to insert images into your Processing sketches using the `loadImage()` and `image()` methods, along with the basics of how to define objects in Java.
video: https://youtube.com/embed/Mu8VDPhdPdw
type: tutorial
---
Drawing images with Java Processing is a little different from adding shapes. Shapes require a single method call (using methods like `rect()`, `circle()`, and `triangle()`). Displaying an image is more involved.

The first step of the process is creating an image **object**. Check out the code below for an example:

:::code-and-image{name="Image Objects", src="/images/TODO:"}
```java
PImage ghost;  
PImage guy;  
PImage wolf;  
  
void setup(){  
  size(800, 600);  
  background(100, 0, 200);  
}
```
:::

Running this code won’t do anything more than display a canvas with a purple background, however, the first three lines of code are very important to drawing an image on the canvas.

Notice the first three lines of code are actually outside of the `setup()` method.  Each line represents a different image. This program will be able to draw three different images with this approach.  Each of these lines **declares** (i.e. creates) a `PImage` object.  For a more in-depth explanation of objects, check out the [Object Basics](/tutorials/concepts/object-basics) tutorial. For now, it’s important to know that objects allow the programmer to have the computer store data in the program. In this case, that data is an image file.

## Initializing the `PImage` Object

Now that we've declared some `PImage` objects, the next step is to associate some image files with those objects. This step is called **initialization**. The example below shows how to initialize each of the three `PImage` objects declared in the previous section:

:::code-and-image{name="Object Initialization", src="/images/TODO:"}
```java
PImage ghost;  
PImage guy;  
PImage wolf;  
  
void setup(){  
  size(800, 600);  
  background(100, 0, 200);  
   
  ghost = loadImage("ghostWarrior.png");  
  guy = loadImage("walkingGuy.png");  
  wolf = loadImage("wolfWarrior.png");  
}
```
:::

The code segment shown here uses the `loadImage()` method. This method takes the data from an image file and stores it in a `PImage` object. There are two additional requirements to make this code functional:

1. An image file with the name written in the `loadImage()` method argument
2. The image file must contain the right kind of image data (e.g., `.png` or `.jpg`)

>The [tutorial on attribution](/tutorials/concepts/attribution) provides important information about using images found on the Internet. Be sure to check it out to make sure you're using images appropriately.

The next step is to make sure the image is saved in the same location as the Java Processing program. The image below shows provides details about where the files should be located:

![A GIF showing where to find the folder to store images within for use in Processing sketches](/TODO:)

The name of the Java Processing program file is `threeImages`. Each of the image files referenced in the sketch (`ghostWarrior.png`, `walkingGuy.png`, and `wolfWarrior.png`) are in the same folder as the Java Processing program file. Given the three files and the file structure shown, if `threeImages` contains the code shown in the *Object Initialization* example above, the program will run without error but will not yet include any images on the screen. There’s just one more step required.

## The `image()` Method

The final step is to add the image to the canvas using the `image()` method. This step works in a similar way to the `rect()` method. Check out the example below:

:::code-and-image{name="Displaying Images", src="/images/TODO:"}
```java
PImage ghost;  
PImage guy;  
PImage wolf;  
  
void setup(){  
  size(800, 600);  
  background(100, 0, 200);  
   
  ghost = loadImage("ghostWarrior.png");  
  guy = loadImage("walkingGuy.png");  
  wolf = loadImage("wolfWarrior.png");  
   
  image(ghost, 50, 50);  
  image(guy, 50, 200);  
  image(wolf, 150, 50);  
}
```
:::

The `image()` method requires three arguments. The first is the `PImage` object you want the computer to display. The object name must match the object name used in the declaration and initialization steps. The second argument is the x-position, and the third argument is the y-position.

> **Practice:** Download the sketch and the images above by [clicking here](/TODO:). Run the program, and try adjusting coordinates to move the images around the display window.
  
Note that the `image()` method does not require width and height arguments in the same way the `rect()` method does. This is because the width and height are determined by the width and height of the image file by default.

## File Structure Best Practice

The model for including files in the same location as the Java Processing program file shown in this lesson will work without issue. However, a best practice for working with images is to save the images in their own “images” folder. The screenshot below shows an example:

![A GIF showing an folder called "images" next to the threeImages Processing sketch, and the three images from the code examples above within it](/TODO:)

Keeping the images in their own folder helps with file organization, which is important for all projects but especially for larger projects with many files.

After you make a change like this, you need to update the code to account for the new image file location. Here's what that change looks like:

```java
PImage ghost;  
PImage guy;  
PImage wolf;  
  
void setup(){  
  size(800, 600);  
  background(100, 0, 200);  
   
  ghost = loadImage("images/ghostWarrior.png");  
  guy = loadImage("images/walkingGuy.png");  
  wolf = loadImage("images/wolfWarrior.png");  
   
  image(ghost, 50, 50);  
  image(guy, 50, 200);  
  image(wolf, 150, 50);  
}
```

Note that the arguments for each `loadImage()` method now includes `images/` before the file name. This changes the location (called the **path**) the computer uses to find the file. Now, instead of checking the folder the sketch is located within, the computer will look for the image files inside the `images` folder. 

Review this article to learn more about [file paths on the Windows Operating System](https://learn.microsoft.com/en-us/dotnet/standard/io/file-path-formats).  Path types can be relative or absolute.  Either approach can be used to locate an image file so long as the path leads to an actual file.

## Practice Questions

Use these practice questions to assess your skills! If you have trouble getting them right, try reviewing some of the material above.

:::practice-question{name="Image Method"}
Which of the following lines of code will draw an image to the canvas of a Java Processing program?

- [ ] `PImage("block.png", 100, 100);`
- [ ] `block = loadImage("images/block.png");`
- [ ] `PImage block;`
- [x] `image(block, 100, 100);`
:::

:::practice-question{name="Image Declaration"}
Which of the following lines of code will declare an image object to be used in the Java Processing program?

- [ ] `block = loadImage("images/block.png");`
- [ ] `PImage("block.png", 100, 100);`
- [x] `PImage block;`
- [ ] `image(block, 100, 100);`
:::

:::practice-question{name="Image Initialization"}
Which of the following lines of code will initialize (or store) an image file in an image object?

- [ ] `PImage block;`
- [x] `block = loadImage("images/block.png");`
- [ ] `image(block, 100, 100);`
- [ ] `PImage("block.png", 100, 100);`
:::