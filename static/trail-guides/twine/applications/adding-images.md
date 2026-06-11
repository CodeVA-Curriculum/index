---
title: Adding Images to Passages
authors: Jon Stapleton, Michael Taylor
short: Learn how to add images to your Twine passages.
description: Images are a great way of adding new interest to your Twine passages. They can convey a mood, provide additional information for the reader, or even create something for the reader to investigate as they make choices to move the story forward. This tutorial demonstrates how to add images from the web, or custom images you make yourself, to a Twine passage.
video: https://youtube.com/embed/-s3nCDMkPKE __LEGACY__
type: tutorial
layout: location
---

## Finding an Image

The first thing to do if you want to add an image to a Twine passage is to find a *link* to an image. All images on the web have a link to their location, and you can use that link to include the image in your story. Here are some options to check out:

* Search for a stock image on [Unsplash](https://unsplash.com/)
* Find an image from the [Library of Virginia](https://edu.lva.virginia.gov/dbva/) Document Bank
* Make the image yourself! Drawings, photos and digital art you create are yours to use

Just make sure you have permission to use the image from the person who owns it! [Unsplash](https://unsplash.com/) only has stock photos, which means you can use them in your stories no problem. It's important to only use images that you have permission to use!

---

## Getting the Image Link

Once you've found an image you want to use on the internet, you'll need to get the link. The easiest way is to right-click the image and select `Copy image address`. This will copy the image's web location to your clipboard for later.

![A web browser showing the contextual menu open highlighting the option to copy the image address](/image-link.png)

If you're getting an image from [Unsplash](https://unsplash.com/), you'll need to use the normal link, which you can access by clicking `Share`.

![A screenshot of unsplash.com with an arrow pointing to the share button](/unsplash-share.png)

![A screenshot of unsplash.com indicating the link inside the share menu to copy for your Twine story](/unsplash-link.png)

After getting the image link, go ahead and open up the Twine story editor.

---

## Add an Image to a Passage

After you get the image link, open up a Twine passage and add some code like this:

:::code-and-image{name="Passage with Unsplash Image Example"}
```
{embed Unsplash image: 'https://unsplash.com/photos/Na0BbqKbfAo', alt: 'the moon'}

You hear the howls of wolves in the distance.
```
:::

. . . but change a couple of things:

* Change the link (`https://unsplash.com/photos/Na0BbqKbfAo`) to your image link you found earlier. You can "paste" it by right-clicking the editor and selecting "paste", or you can press `Ctrl+V`.
* Change the words after `alt`. My picture is a picture of the moon, but yours probably isn't. Write a short sentence that describes your image.
* If you got your image from somewhere other than [Unsplash](https://unsplash.com/), delete the word `Unsplash` from the line of code and make sure the link ends in `.jpg`, `.png`, or another image format.

Click out of the passage editor, select the passage you added the image to, and click "Test From Here":

![The passage context menu in Twine](/test-from-here.png)

You should see your image in your Twine story!

![A Twine story with an image of a moon](/twine-image.png)

---

## Using Your Own Images

If you can find images you want to use in your story online or on Unsplash, that's all you'll need. However, lots of people like creating their own images for their stories. To use an image you made yourself, you first need to put it somewhere on the web that gives you a *direct image link*. Once you have a direct image link, you can add your custom image to Twine *exactly* like you did with Unsplash.

1. First, you'll need to **identify where your image will be hosted**. Ask your teacher where to upload images for class, as many classes use a shared folder or class website for file hosting. If your class does not use one of these solutions, you can use a *free file hosting resource* like [postimages.org](postimages.org).
<!-- ![SCREENSHOTS/PROCESS OF UPLOADING AND COPYING LINK FROM POSTIMAGES.ORG](TODO:) -->
2. Next, you will **upload your image to that location**. If you are using [postimages.org](postimages.org), click `Upload` and select the image from your computer that you want to use. (be sure that the image doesn't include any private or sensitive personal information before you do this).
3. Now you will **copy the image link**. On [postimages.org](postimages.org) the image link will appear as something like `https://postimg.cc/vxMgCjmC`.
4. Finally, **add the image to your Twine passage**! Everything is the same as above **except for the `image:` field**, delete the word *Unsplash* since the image is not from unsplash, and use the link you retrieved from [postimages.org](postimages.org) or your school's hosting website.

If you have trouble getting this working, check out the video above for a demonstration!
