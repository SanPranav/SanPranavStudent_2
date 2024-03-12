---
toc: false
comments: false
layout: post
title: 2D Sprite Sheet Animation
description: A animation of a goblin that has multiple different actions.
type: tangibles
courses: { compsci: {week: 4} }
---

<body>
    <div>
        <canvas id="spriteContainer"> <!-- Within the base div is a canvas. An HTML canvas is used only for graphics. It allows the user to access some basic functions related to the image created on the canvas (including animation) -->
            <img id="goblinSprite" src="{{site.baseurl}}/images/goblinsprites.png">  // change sprite here
        </canvas>
        <div id="controls"> <!--basic radio buttons which can be used to check whether each individual animaiton works -->
            <input type="radio" name="animation" id="attacking" checked>
            <label for="attacking">Attack</label><br>
            <input type="radio" name="animation" id="death">
            <label for="death">Death</label><br>
            <input type="radio" name="animation" id="walking">
            <label for="walking">Walking</label><br>
        </div>
    </div>
</body>

<script>
    // start on page load
    window.addEventListener('load', function () {
        const canvas = document.getElementById('spriteContainer');
        const ctx = canvas.getContext('2d');
        const SPRITE_WIDTH = 106.5;  // matches sprite pixel width
        const SPRITE_HEIGHT = 100; // matches sprite pixel height
        const FRAME_LIMIT = 4;  // matches number of frames per sprite row, this code assume each row is same

        const SCALE_FACTOR = 2;  // control size of sprite on canvas
        canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        class Goblin {
            constructor() {
                this.image = document.getElementById("goblinSprite");
                this.x = 0;
                this.y = 0;
                this.minFrame = 0;
                this.maxFrame = FRAME_LIMIT;
                this.frameX = 0;
                this.frameY = 0;
            }

            // draw goblin object
            draw(context) {
                context.drawImage(
                    this.image,
                    this.frameX * SPRITE_WIDTH,
                    this.frameY * SPRITE_HEIGHT,
                    SPRITE_WIDTH,
                    SPRITE_HEIGHT,
                    this.x,
                    this.y,
                    canvas.width,
                    canvas.height
                );
            }

            // update frameX of object
            update() {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                }
                    else if(this.frameY == 2 && )
                     else {
                    this.frameX = 0;
                }
            }
        }

        // goblin object
        const goblin = new Goblin();

        // update frameY of goblin object, action from idle, bark, walk radio control
        const controls = document.getElementById('controls');
        controls.addEventListener('click', function (event) {
            if (event.target.tagName === 'INPUT') {
                const selectedAnimation = event.target.id;
                switch (selectedAnimation) {
                    case 'attacking':
                        goblin.frameY = 0;
                        goblin.frameX = 1.5;
                        break;
                    case 'death':
                        goblin.frameY = 1.5;
                        goblin.frameX = 1;
                        break;
                    case 'walking':
                        goblin.frameY = 3;
                        goblin.frameX = 1;
                        break;
                    default:
                        break;
                }
            }
        });

        // Animation recursive control function
        function animate() {
            // Clears the canvas to remove the previous frame.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draws the current frame of the sprite.
            goblin.draw(ctx);

            // Updates the `frameX` property to prepare for the next frame in the sprite sheet.
            goblin.update();

            // Uses `requestAnimationFrame` to synchronize the animation loop with the display's refresh rate,
            // ensuring smooth visuals.
            setTimeout(()=>{requestAnimationFrame(animate)}, 140);
        }

        // run 1st animate
        animate();
    });
</script>