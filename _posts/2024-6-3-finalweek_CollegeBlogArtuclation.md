---
image: /images/mario_animation.png
toc: false
comments: false
layout: post
title: College Blog Articulation
description: Trimester 3, Pranav Santhosh - My Understanding on SRP, FSM, FSM, GCC, and DrawIO.
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

# Game Control Code 
Game Setup is a file inside platformer.3x that is responsible for the game objects. It uses javascript objects to run game levels. An object literal is a way to define and create objects in programming languages like JavaScript, using a list of key-value pairs enclosed in curly braces. It's a straightforward and concise method for creating objects without needing to define a separate class or constructor function. For example the code:
```
{name: "Derek", health: 100, level: 50}
```
This code is an example of how an object literal works as it defines the object without other complicated files. This is exactly the way Gamesetup.js works with javascript objects. A real example for this is how most enemies are defined in the gamesetup.js code. 
```
{ name: 'snowman', id: 'snowman', class: Snowman, data: this.assets.enemies.Snowman, xPercentage: 0.2, minPosition: 0.1, difficulties: ["normal", "hard", "impossible"] },
```
This is how our enemy named "snowman" is called inside of gamesetup when the level is being processed/constructed. Before is it defined inside of the level it's "blueprint" is defined in the new Gamesetter.winter.js.
```
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
```
This code defines the javascript object inside of the game levle allowing for the enemy to have the correct properties. The properties are listed in the code which are:

 - File location
 - Width and Height of File
 - Scale Size of Image inside of the Game
 - Speed and Hitbox of the Enemy
 - Animation using frames (If it applies)

After the object is defined and referenced inside of Gamesetup.js, then it will be constructed inside of GameLevel.js. Gamelevel.js will call all of the objects that are inside of the code for the level and then constructs them using the code below:
```
},
try {
	var  objFile  =  null;
	for (const  obj  of  this.gameObjects) {
		if (obj.data.file) {
			// Load the image for the game object.
			objFile  =  obj.data.file;
			console.log(objFile);
			obj.image  =  await  this.loadImage(obj.data.file);
			// Create a new canvas for the game object.
			const  canvas  =  document.createElement("canvas");
			canvas.id  =  obj.id;
			document.querySelector("#canvasContainer").appendChild(canvas);
			// Create a new instance of the game object.
			new  obj.class(canvas, obj.image, obj.data, obj.xPercentage, obj.yPercentage, obj.name, obj.minPosition);
			}
		}
	} catch (error) {
console.error('Failed to load one or more GameLevel objects: '  +  objFile, error);
	}
}
```
This constructs the object when the Gamelevel "winter" is called and places all of the objects onto the users screen. 

### GameLevel and GameControl
The code below shows how the game creates multiple different levels and puts them into a game array. This is only one of the many possible ways that you can organize them by. This shows how the level is constructed and the game objects are added inside of the Game levels. This is where our game is called in Gamelevel.js.
```
async  transitionToLevel(newLevel) {
this.inTransition  =  true;

	// Destroy existing game objects
	GameEnv.destroy();

	// Load GameLevel objects
	if (GameEnv.currentLevel  !==  newLevel) {
		GameEnv.claimedCoinIds  = [];
	}
	await  newLevel.load();
	GameEnv.currentLevel  =  newLevel;
	
	// Update invert property
	GameEnv.setInvert();
	
	// Trigger a resize to redraw canvas elements
	window.dispatchEvent(new  Event('resize'));

	this.inTransition  =  false;
},
```
The code ```await newLevel.load();``` is used to wait for each level. As it states, the code waits for the player to complete the level before the newLevel. Then after the newLevel is loaded it will redraw the canvas and call all of the objects that is inside of our GameSetterExampleLvl.js file. 
### Game level to and Array of GameLevels
The game levels are put into an array of gamelevels by using the file named GameEnv.js. The code is a simple one line that calls the gamelevels. 
```
static  levels  = [];
static  currentLevel  =  null;
```
The levels are then put into an array of game levels. This code is called everytime someone reloads the page as it displays the array of game levels on the menu and as well as when the player plays the game. This is why the word ```static``` is in this one line, as it calls it as a passive property loading it as soon as the game starts up. The second line is calling the currentLevel that the player is either inside of or the next level that is being constructed inside of the game. 

### Game Control Structure (Conditional Statements and Loops)
GameControl.js has a very intricate and crucial structure. The game uses the loops and conditional statements in order to function. This is also displayed on the topics above,  but this is a general breakdown on how game control functions. Below is the code for the game loop (Also has Conditional Statements):
```
gameLoop() {
	// Turn game loop off during transitions
	if (!this.inTransition) {

		// Get current level
		GameEnv.update();
		const  currentLevel  =  GameEnv.currentLevel;

		// currentLevel is defined
		if (currentLevel) {
				// run the isComplete callback function
				if (currentLevel.isComplete  &&  currentLevel.isComplete()) {
					const  currentIndex  =  GameEnv.levels.indexOf(currentLevel);
					// next index is in bounds
					if (currentIndex  !==  -1  &&  currentIndex  +  1  <  GameEnv.levels.length) {
						// transition to the next level
						this.transitionToLevel(GameEnv.levels[currentIndex  +  1]);
					}
				}
			// currentLevel is null, (ie start or restart game)
			} else {
				// transition to beginning of game
				this.transitionToLevel(GameEnv.levels[0]);
			}
		}
		// recycle gameLoop, aka recursion
		requestAnimationFrame(this.gameLoop.bind(this));
	},
};
```
Below is a breakdown of the code below:
This `gameLoop` function:

1.  Checks if the game is not transitioning. `if (currentLevel) { ... }`
2.  Updates the game environment. 
3.  Checks if there's a current level and if it's complete.
4.  If the level is complete, transitions to the next level.
5.  If there's no current level (at the game's start), transitions to the first level.
6.  Continues to loop by scheduling itself to run again.

### Inspecting Canvas Items
The gif file below shows how the players properties are changing while the player is moving up and down across the level. 
![Platformer Game v3 0 _ Platformer 3 0 - Google Chrome 2024-05-31 13-39-44 (1)](https://github.com/SanPranav/PranavSanStudent/assets/150724587/bd3b1688-f09b-4a01-a052-fb706104578c)

# DrawIO
![CollegeBlogArticulation](https://github.com/nighthawkcoders/platformer3x/assets/150724587/0b130ba5-c820-4946-8327-3b3923b0faa8)


# My Analytics
![image](https://github.com/nighthawkcoders/platformer3x/assets/150724587/a6b392d7-b019-4e0c-9762-b734709a0190)
### Pull requests that I worked on:
[Animations Group-New Mini Level + Code Organization](https://github.com/nighthawkcoders/platformer3x/pull/85)

[Transitions Updated, and Improved](https://github.com/nighthawkcoders/platformer3x/pull/64)

[Integrating Winter Level](https://github.com/nighthawkcoders/platformer3x/pull/60)

[Platformer-3x Game Level Transitions Working](https://github.com/nighthawkcoders/platformer3x/pull/10)

