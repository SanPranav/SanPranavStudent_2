---
image: /images/mario_animation.png
toc: false
comments: false
layout: post
title: Single Responsibility Principle. 
description: How we included Single Responsibility principle into our game.
type: hacks
courses: { compsci: {week: 24} }
---
# Single Responsibility Principle
This is the principle that states that a class should have only one reason to change, meaning it should have only one job or responsibility. Basically, this means each function should only do one thing. This principle divides the system into distinct features that do not overlap in functionality.
### Example Code
Below is an example of the Single Responsibility princle in action in the PlayerWinter.js file, which runs the player in our new game level. The handlePlayerReaction function handles the player collision bewtween obstables on the level. Instead of the having one method to say a certain thing when the player colides with anything on the level, the function is split into different cases (which is also a finite state machine), cabin and snowman, which have different reactions if the player colides with them.
### Benifits of SRP
The Single Responsibilty principle not only makes it eaiser to read and understand code, but also makes it easier to change certain parts of the code since you can add on to specific SRP functions without affecting other parts of the code. SRP also makes it easier to debug since you can easily narrow out one part of the code to fix rather than having a huge function. A lot of the time, when a large function breaks, it is only a small part of the code that is actually broken, which can be very annoying to sort through a bunch of working code trying to find what doesnt work, but with SRP in mind, the functions are much smaller and easier to narrow out the broken lines when faced with an error.
```js
handlePlayerReaction() {
        super.handlePlayerReaction(); // calls the super class method
        // handles additional player reactions
        switch (this.state.collision) {
            case "cabin":
                // 1. Caught in tube
                if (this.collisionData.touchPoints.this.top && this.collisionData.touchPoints.other.bottom) {
                    // Position player in the center of the tube
                    this.x = this.collisionData.newX;
                    // Using natural gravity wait for player to reach floor
                    if (Math.abs(this.y - this.bottom) <= GameEnv.gravity) {
                        // Force end of level condition
                        this.x = GameEnv.innerWidth + 1;
                    }
                // 2. Collision between player right and cabin
                } else if (this.collisionData.touchPoints.this.right) {
                    this.state.movement.right = false;
                    this.state.movement.left = true;
                // 3. Collision between player left and cabin
                } else if (this.collisionData.touchPoints.this.left) {
                    this.state.movement.left = false;
                    this.state.movement.right = true;
                }
                break;
            case "snowman":
                if (this.collisionData.touchPoints.this.top && this.collisionData.touchPoints.other.bottom && this.state.isDying == false) {
                    if (GameEnv.goombaBounce === true) {
                        GameEnv.goombaBounce = false;
                        this.y = this.y - 100;
                    }
                    if (GameEnv.goombaBounce1 === true) {
                        GameEnv.goombaBounce1 = false;
                        this.y = this.y - 250
                    }
                } else if (this.collisionData.touchPoints.this.right || this.collisionData.touchPoints.this.left) {
                    if (GameEnv.difficulty === "normal" || GameEnv.difficulty === "hard") {
                        if (this.state.isDying == false) {
                            this.state.isDying = true;
                            this.canvas.style.transition = "transform 0.5s";
                            this.canvas.style.transform = "rotate(-90deg) translate(-26px, 0%)";
                            GameEnv.playSound("PlayerDeath");
                            setTimeout(async() => {
                                await GameControl.transitionToLevel(GameEnv.levels[GameEnv.levels.indexOf(GameEnv.currentLevel)]);
                            }, 900);
                        }
                    } else if (GameEnv.difficulty === "easy" && this.collisionData.touchPoints.this.right) {
                        this.x -= 10;
                    } else if (GameEnv.difficulty === "easy" && this.collisionData.touchPoints.this.left) {
                       this.x += 10;
                    }
                }
```