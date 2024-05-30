---
image: /images/mario_animation.png
toc: false
comments: false
layout: post
title: JavaScript Objects
description: Javascript Objects in our code, blog 1. 
type: hacks
courses: { compsci: {week: 24} }
---

# JavaScript Objects
A JavaScript object is like a container that holds related pieces of information together. For example, you could have a name like "Snowman" and a piece of information related to that such as the hitbox.
So, now that we understand what an object is, we can add it into our games. We added a game object namead "snowman". Which we extended off of the enemy.js file for our new game level.
Below is the code that we used to define snowman:
```js
    Snowman: {
    src: "/images/platformer/sprites/snowman.png",
    width: 308,
    height: 327,
    scaleSize: 60,
    speedRatio: 0.7,
    xPercentage: 0.6,
    hitbox: { widthPercentage: 0.0, heightPercentage: 0.2 },
    left: { row: 0, frames: 0, idleFrame: { column: 0, frames: 0 } }, // Left Movement
    idle: { row: 0, frames: 0 }, // Stop the movement
    right: { row: 0, frames: 0, idleFrame: { column: 0, frames: 0 } }, // Right Movement
    },
```
Snowman is then later called in our level setup:
```js
{ name: 'snowman', id: 'snowman', class: Snowman, data: this.assets.enemies.Snowman, xPercentage: 0.2, minPosition: 0.1, difficulties: ["normal", "hard", "impossible"] },
```

Here, we are creating an object. Lets see what this object can do, and how it does it.
 - name: Snowman
 - id: snowman (used to call the object in other files like gameSetup)
 - class: defines the properties of the object (It is defined as a snowman.)
 - data: The coordinates and other properties of the object such as hitbox.
 - Xpercentage: horizontal position of object relative to the size of the canvas.
 - Xminposition: The movement minimum that the object can move (be present at) relative to the size of the canvas.
So, we see what an object does and how it functions using the many values that are related to it.