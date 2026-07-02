---
title: Adapting "Goldilocks and the Three Bears"
authors: Jon Stapleton
video: https://www.youtube.com/embed/14I8C6FKINQ
description: This resource lets you follow along as Jon adapts the story "Goldilocks & the Three Bears" to Twine, adding choices for the reader to make and multiple endings.
type: cache
icon: 
---

:::quick-take{title="Goldilocks Example}
Check out this story, which demonstrates how to tell a story made up of linked passages.

:::code-and-image{src="goldilocks-bowls.gif" tabs}
```intro
Once upon a time, a girl named Goldilocks was wandering in the woods when she came upon a mysterious cabin!

She couldn't resist exploring. Goldilocs creeped through the door and smelled delicious porridge. What a treat! She sat down at the kitchen table to three heaping bowls of delicious, homemade porridge.

> [[Small bowl->cold]]
> [[Medium bowl->bad]]
> [[Large bowl->hot]]
```
```cold
The porridge is too cold! Ugh, awful.

> [[Medium bowl->cold]]
> [[Large bowl->cold]]
> [[Leave->good]]
```
```hot
The porridge is too hot! Ugh, awful.

> [[Small bowl->cold]]
> [[Medium bowl->cold]]
> [[Leave->good]]
```
```good
Goldilocks left the cabin, still gagging on the cold porridge, never meeting the family whose dinner was cooling on the table.
```
```bad
Golidlocks ate the whole bowl up, and suddenly felt very sleepy. She dozed off, and only woke when she heard the cabin door creak open behind her...
```
:::

:::

One fun exercise to practice writing Twine stories with linked passages is to adapt a familiar story to make it a choice-based, "choose-your-own-adventure"-style story game. I'll use *Goldilocks and the Three Bears* as an example.

### Step 1: Write the Intro

I like to start by writing the first passage the reader will see, which should introduce the story and provide a couple of passage links for the reader to choose from:

:::code-and-image{src="goldilocks-intro.png"}
```md
Once upon a time, a girl named Goldilocks was wandering in the woods when she came upon a mysterious cabin!

She couldn't resist exploring. Goldilocs creeped through the door and smelled delicious porridge. What a treat! She sat down at the kitchen table to three heaping bowls of delicious, homemade porridge.

> [[Small bowl->cold]]
> [[Medium bowl->bad]]
> [[Large bowl->hot]]
```
:::

Three choices in the `intro` passage means I need to write three new passages: `cold`, `bad`, and `hot`. Just for the sake of demonstration I'm going to keep the story short--the `bad` passage will lead to the "normal" ending, where Goldilocks is discovered by the bear family, and the others will eventually lead to a new ending (called `good`) where Goldilocks escapes undiscovered:

:::code-and-image{src="goldilocks-bowls.gif" tabs}
```intro
Once upon a time, a girl named Goldilocks was wandering in the woods when she came upon a mysterious cabin!

She couldn't resist exploring. Goldilocs creeped through the door and smelled delicious porridge. What a treat! She sat down at the kitchen table to three heaping bowls of delicious, homemade porridge.

> [[Small bowl->cold]]
> [[Medium bowl->bad]]
> [[Large bowl->hot]]
```
```cold
The porridge is too cold! Ugh, awful.

> [[Medium bowl->cold]]
> [[Large bowl->cold]]
> [[Leave->good]]
```
```hot
The porridge is too hot! Ugh, awful.

> [[Small bowl->cold]]
> [[Medium bowl->cold]]
> [[Leave->good]]
```
```good
Goldilocks left the cabin, still gagging on the cold porridge, never meeting the family whose dinner was cooling on the table.
```
```bad
Golidlocks ate the whole bowl up, and suddenly felt very sleepy. She dozed off, and only woke when she heard the cabin door creak open behind her...
```
:::

You can play the story [here](TODO) if you want!

:::prompt{title="Goldilocks Modify"}
Take the story below and add new scenes: 

- Goldilocks tries the different beds in the cabin before falling asleep
- The bears arrive and decide what to do with Goldilocks
:::

:::prompt{title="Goldilocks Make"}
Choose another familiar story to adapt into an interactive Twine game. Your story should include:

- At least two unique endings available to the reader based on their choices
- A story length of at least 3 passages (meaning the shortest path through the story is at least 3 passages/two clicks long)
:::