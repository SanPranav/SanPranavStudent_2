---
image: /images/mario_animation.png
toc: false
comments: false
layout: post
title: Finite State Machines
description: FSM and its purpose in our game level. 
type: hacks
courses: { compsci: {week: 24} }
---
# Finite State Machines
A Finite State Machine (FSM) is a machine that has different "states". By states we mean that they are different phases that something can be in.
For example, think of a traffic light: it has states like "green," "yellow," and "red," and it changes from one state to another. There can only be one state active at once.
### Code Example
In this past sprint, we changed the PlayerBase.js file to allow the player to have smooth animations. Lets take an example; in playerbase.js, the updateMovement function controls how the player moves when it is in two different states, jumping or idle. UpdateAnimationState funtion assignes different states based on key inputs then updateAnimations function switches the states based on then key states.
The states are:
 - Idle
 - Jump
 - Walk
 - Run
Each of these states have an action related to them as idle will make the character freeze in place.
```js
updateMovement() {
    switch (this.state.animation) {
        case 'idle':
            break;
        case 'jump':
            // Check condition for player to jump
            if (this.state.movement.up && !this.state.movement.falling) {
                // jump
                GameEnv.playSound("PlayerJump");
                this.yv = this.bottom * -0.06;
                // start falling
                this.state.movement.falling = true;
            }
            // break is purposely omitted to allow default case to run
        default:
            // Player is moving left
            if (this.state.direction === 'left' && this.state.movement.left && 'a' in this.pressedKeys) {
                // Decrease the player's x position according to run or walk animation and related speed
                if (this.state.animation === 'run') {
                    this.xv -= this.runSpeed;
                } else {
                    this.xv -= this.speed;
                }
            // Player is moving right
            } else if (this.state.direction === 'right' && this.state.movement.right && 'd' in this.pressedKeys){
                // Increase the player's x position according to run or walk animation and related speed
                if (this.state.animation === 'run') {
                    this.xv += this.runSpeed;
                } else {
                    this.xv += this.speed;
                }
            }
    }
    this.xv *= 0.875;
    this.x += this.xv;
    this.setX(this.x);
    this.yv *= 0.875;
    this.y += this.yv;
    this.setY(this.y);
}
updateAnimation() {
    switch (this.state.animation) {
        case 'idle':
            this.setSpriteAnimation(this.playerData.idle[this.state.direction]);
            break;
        case 'walk':
            this.setSpriteAnimation(this.playerData.walk[this.state.direction]);
            break;
        case 'run':
            this.setSpriteAnimation(this.playerData.run[this.state.direction]);
            break;
        case 'jump':
            this.setSpriteAnimation(this.playerData.jump[this.state.direction]);
            break;
        default:
            console.error(`Invalid state: ${this.state.animation}`);
    }
}
updateAnimationState(key) {
    switch (key) {
        case 'a':
        case 'd':
            this.state.animation = 'walk';
            break;
        case 'w':
            if (this.state.movement.up == false) {
            this.state.movement.up = true;
            this.state.animation = 'jump';
            }
            break;
        case 's':
            if ("a" in this.pressedKeys || "d" in this.pressedKeys) {
                this.state.animation = 'run';
            }
            break;
        default:
            this.state.animation = 'idle';
            break;
    }
}
```