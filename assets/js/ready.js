function startGame() {
    document.querySelectorAll('.container button').forEach(function(button) {
      button.style.display = 'none';
    });

    document.body.style.backgroundImage = 'url("/MihirCS/images/sprite/TANKLOADINGSLIDE.gif")';
    document.getElementById("gameContainer").style.display = 'block';

    setTimeout(function() {
        document.documentElement.style.background = 'linear-gradient(to right, #4D62BC, #BC574D)';
      }, 1150);

    // Set a timeout to delay the fade-in effect
    setTimeout(function() {
      document.getElementById("gameContainer").style.opacity = 1;
      // Start the game loop
      setInterval(drawImage, 10);
    }, 1000); // Adjust the delay time (in milliseconds) as needed
  }

function openSettings() {
  document.getElementById('settingsOverlay').style.display = 'block';
}

function closeSettings() {
  document.getElementById('settingsOverlay').style.display = 'none';
}

function openInstructions() {
  document.getElementById('instructionsOverlay').style.display = 'block';
}

function closeInstructions() {
  document.getElementById('instructionsOverlay').style.display = 'none';
}


var slider = document.getElementById("myRange");

slider.addEventListener('input', function() {
  var value = slider.value;
  if (value == 1) {
    console.log("1")
    location.replace("/MihirCS//2024/02/04/tanktestdrawing.html")
  }

  else if (value == 2) {
    console.log("2")
  }
})

window.addEventListener("keydown", function(e) { if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) { e.preventDefault(); } }, false);

var canvas = document.getElementById("box").getContext("2d");
document.addEventListener ("keydown", keyDownHandler, false);
document.addEventListener ("keyup", keyUpHandler, false);

let tank1 = new Image();
tank1.src = "/MihirCS/images/sprite/tank1.png";

let tank2 = new Image () ;
tank2.src = "/MihirCS/images/sprite/tank0.png";

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let zeroPressed = false;
let wPressed = false;
let sPressed = false;
let dPressed = false;
let aPressed = false;
let spacePressed = false;
let slasPressed = false;
let qPressed = false;
let started = false;

let gameEnded = false;

//controls for player one and two
function keyDownHandler(e)
{
    if (e.keyCode == 38)
    {
        upPressed = true;
    }

    if(e.keyCode == 40)
    {
        downPressed = true;
    }

    if(e. keyCode == 37)
    {
        leftPressed = true;
    }

    if(e.keyCode == 39)
    {
        rightPressed = true;
    }

    if(e.keyCode == 32)
    {
        spacePressed = true;
    }

    if(e.keyCode == 87)
    {
        wPressed = true;
    }

    if(e.keyCode == 65)
    {
        aPressed = true;
    }

    if(e.keyCode == 83)
    {
        sPressed = true;
    }

    if(e.keyCode == 68)
    {
        dPressed = true;
    }

    if(e.keyCode == 96)
    {
        zeroPressed = true;
    }

    //bulletsa
    if(e.keyCode == 191)
    {
        slasPressed = true;
    }

    if(e.keyCode == 81)
    {
        qPressed = true;
    }
}

function keyUpHandler(e)
{
    if (e.keyCode == 38)
    {
        upPressed = false;
    }

    if(e.keyCode == 40)
    {
        downPressed = false;
    }

    if(e. keyCode == 37)
    {
        leftPressed = false;
    }

    if(e.keyCode == 39)
    {
        rightPressed = false;
    }

    if(e.keyCode == 32)
    {
        spacePressed = false;
    }

    if(e.keyCode == 87)
    {
        wPressed = false;
    }

    if(e.keyCode == 65)
    {
        aPressed = false;
    }

    if(e.keyCode == 83)
    {
        sPressed = false;
    }

    if(e.keyCode == 68)
    {
        dPressed = false;
    }

    if(e.keyCode == 96)
    {
        zeroPressed = false;
    }

    if(e.keyCode == 191)
    {
        slasPressed = false;
    }

    if(e.keyCode == 81)
    {
        qPressed = false;
    }
}

function drawimgrotation(img, x, y, width, height, deg)
{
    let rad = deg * Math.PI / 180;
    canvas.translate( x + width / 2, y + height / 2 );
    canvas.rotate(rad);
    canvas.drawImage( img, width / 2 * -1, height / 2 * -1, width, height);
    canvas.rotate(rad * -1);
    canvas.translate( (x + width / 2) * -1, (y + height / 2) * -1 );
}

function controls() {
    // Player 1 movement
    if (leftPressed) {
        player1.rotation -= 1;
    }

    if (rightPressed) {
        player1.rotation += 1;
    }

    let player1NewX = player1.x;
    let player1NewY = player1.y;

    if (upPressed) {
        let newX = player1.x + Math.cos(player1.rotation * Math.PI / 180);
        let newY = player1.y + Math.sin(player1.rotation * Math.PI / 180);
        if (!checkMazeCollision(newX, newY, player1.w, player1.h)) {
            player1NewX = newX;
            player1NewY = newY;
        }
    }

    if (downPressed) {
        let newX = player1.x - Math.cos(player1.rotation * Math.PI / 180);
        let newY = player1.y - Math.sin(player1.rotation * Math.PI / 180);
        if (!checkMazeCollision(newX, newY, player1.w, player1.h)) {
            player1NewX = newX;
            player1NewY = newY;
        }
    }

    // Player 2 movement
    if (aPressed) {
        player2.rotation -= 1;
    }

    if (dPressed) {
        player2.rotation += 1;
    }

    let player2NewX = player2.x;
    let player2NewY = player2.y;

    if (wPressed) {
        let newX = player2.x + Math.cos(player2.rotation * Math.PI / 180);
        let newY = player2.y + Math.sin(player2.rotation * Math.PI / 180);
        if (!checkMazeCollision(newX, newY, player2.w, player2.h)) {
            player2NewX = newX;
            player2NewY = newY;
        }
    }

    if (sPressed) {
        let newX = player2.x - Math.cos(player2.rotation * Math.PI / 180);
        let newY = player2.y - Math.sin(player2.rotation * Math.PI / 180);
        if (!checkMazeCollision(newX, newY, player2.w, player2.h)) {
            player2NewX = newX;
            player2NewY = newY;
        }
    }

    player1.x = player1NewX;
    player1.y = player1NewY;

    player2.x = player2NewX;
    player2.y = player2NewY;
}

function checkMazeCollision(x, y, w, h) {
    // Check border collision
    if (x < 0 || x + w > 1472 || y < 0 || y + h > 828) {
        return true; // Colliding with border
    }

    // Define maze rectangles (adjust dimensions as needed)
    let rectangles = [
        // Maze walls
        { x: 147, y: 0, width: 0, height: 138 }, // drawLine1
        { x: 0, y: 276, width: 147, height: 0 }, // drawLine2
        { x: 294, y: 138, width: 441, height: 0 }, // drawLine3
        { x: 294, y: 276, width: 147, height: 0 }, // drawLine4
        { x: 0, y: 552, width: 147, height: 0 }, // drawLine5
        { x: 294, y: 414, width: 0, height: 294 }, // drawLine6
        { x: 147, y: 414, width: 0, height: 138 }, // drawLine7
        { x: 147, y: 690, width: 294, height: 0 }, // drawLine8
        { x: 436, y: 276, width: 0, height: 138 }, // drawLine9
        { x: 294, y: 552, width: 294, height: 0 }, // drawLine11           
        { x: 588, y: 272, width: 0, height: 285 }, // drawLine12
        { x: 735, y: 133, width: 0, height: 138 }, // drawLine13
        { x: 730, y: 276, width: 152, height: 0 }, // drawLine14
        { x: 882, y: 0, width: 0, height: 138 }, // drawLine15
        { x: 1029, y: 138, width: 443, height: 0 }, // drawLine16
        { x: 1176, y: 138, width: 0, height: 138 }, // drawLine17 
        { x: 1029, y: 276, width: 0, height: 138 }, // drawLine18 
        { x: 1024, y: 414, width: 299, height: 0 }, // drawLine19 
        { x: 1323, y: 276, width: 0, height: 143 }, // drawLine20
        { x: 735, y: 414, width: 147, height: 0 }, // drawLine21
        { x: 882, y: 409, width: 0, height: 143 }, // drawLine22
        { x: 877, y: 552, width: 436, height: 0}, // drawLine23
        { x: 1176, y: 690, width: 0, height: 138}, // drawLine24
        { x: 1171, y: 690, width: 152, height: 0 }, // drawLine25
        { x: 735, y: 552, width: 0, height: 138 }, // drawLine26
        { x: 730, y: 690, width: 152, height: 0 }, // drawLine27
        { x: 1029, y: 690, width: 0, height: 138 }, // drawLine28
        { x: 588, y: 690, width: 0, height: 138 }, // drawLine29 
    ];

    // Check collision with each maze rectangle
    for (let rect of rectangles) {
        if (x < rect.x + rect.width &&
            x + w > rect.x &&
            y < rect.y + rect.height &&
            y + h > rect.y) {
            return true; // Colliding with maze wall
        }
    }

    return false; // Not colliding with maze wall
}

function checkbulletWallCollisionx(x, y, w, h) {
    let rectangles = [
        // Maze walls
        { x: 147, y: 0, width: 0, height: 138 }, // drawLine1
        { x: 0, y: 276, width: 147, height: 0 }, // drawLine2
        { x: 294, y: 138, width: 441, height: 0 }, // drawLine3
        { x: 294, y: 276, width: 147, height: 0 }, // drawLine4
        { x: 0, y: 552, width: 147, height: 0 }, // drawLine5
        { x: 294, y: 414, width: 0, height: 294 }, // drawLine6
        { x: 147, y: 414, width: 0, height: 138 }, // drawLine7
        { x: 147, y: 690, width: 294, height: 0 }, // drawLine8
        { x: 436, y: 276, width: 0, height: 138 }, // drawLine9
        { x: 294, y: 552, width: 294, height: 0 }, // drawLine11           
        { x: 588, y: 272, width: 0, height: 285 }, // drawLine12
        { x: 735, y: 133, width: 0, height: 138 }, // drawLine13
        { x: 730, y: 276, width: 152, height: 0 }, // drawLine14
        { x: 882, y: 0, width: 0, height: 138 }, // drawLine15
        { x: 1029, y: 138, width: 443, height: 0 }, // drawLine16
        { x: 1176, y: 138, width: 0, height: 138 }, // drawLine17 
        { x: 1029, y: 276, width: 0, height: 138 }, // drawLine18 
        { x: 1024, y: 414, width: 299, height: 0 }, // drawLine19 
        { x: 1323, y: 276, width: 0, height: 143 }, // drawLine20
        { x: 735, y: 414, width: 147, height: 0 }, // drawLine21
        { x: 882, y: 409, width: 0, height: 143 }, // drawLine22
        { x: 877, y: 552, width: 436, height: 0}, // drawLine23
        { x: 1176, y: 690, width: 0, height: 138}, // drawLine24
        { x: 1171, y: 690, width: 152, height: 0 }, // drawLine25
        { x: 735, y: 552, width: 0, height: 138 }, // drawLine26
        { x: 730, y: 690, width: 152, height: 0 }, // drawLine27
        { x: 1029, y: 690, width: 0, height: 138 }, // drawLine28
        { x: 588, y: 690, width: 0, height: 138 }, // drawLine29 
    ];

    for (let rect of rectangles) {
        if (rect.width == 0 && x >= rect.x - 1 && x <= rect.x + 1 && y >= rect.y && y <= rect.y + rect.height) {
            return true;
        }
    }
    return false;
}

function checkbulletWallCollisiony(x, y, w, h) {
    let rectangles = [
        // Maze walls
        { x: 147, y: 0, width: 0, height: 138 }, // drawLine1
        { x: 0, y: 276, width: 147, height: 0 }, // drawLine2
        { x: 294, y: 138, width: 441, height: 0 }, // drawLine3
        { x: 294, y: 276, width: 147, height: 0 }, // drawLine4
        { x: 0, y: 552, width: 147, height: 0 }, // drawLine5
        { x: 294, y: 414, width: 0, height: 294 }, // drawLine6
        { x: 147, y: 414, width: 0, height: 138 }, // drawLine7
        { x: 147, y: 690, width: 294, height: 0 }, // drawLine8
        { x: 436, y: 276, width: 0, height: 138 }, // drawLine9
        { x: 294, y: 552, width: 294, height: 0 }, // drawLine11           
        { x: 588, y: 272, width: 0, height: 285 }, // drawLine12
        { x: 735, y: 133, width: 0, height: 138 }, // drawLine13
        { x: 730, y: 276, width: 152, height: 0 }, // drawLine14
        { x: 882, y: 0, width: 0, height: 138 }, // drawLine15
        { x: 1029, y: 138, width: 443, height: 0 }, // drawLine16
        { x: 1176, y: 138, width: 0, height: 138 }, // drawLine17 
        { x: 1029, y: 276, width: 0, height: 138 }, // drawLine18 
        { x: 1024, y: 414, width: 299, height: 0 }, // drawLine19 
        { x: 1323, y: 276, width: 0, height: 143 }, // drawLine20
        { x: 735, y: 414, width: 147, height: 0 }, // drawLine21
        { x: 882, y: 409, width: 0, height: 143 }, // drawLine22
        { x: 877, y: 552, width: 436, height: 0}, // drawLine23
        { x: 1176, y: 690, width: 0, height: 138}, // drawLine24
        { x: 1171, y: 690, width: 152, height: 0 }, // drawLine25
        { x: 735, y: 552, width: 0, height: 138 }, // drawLine26
        { x: 730, y: 690, width: 152, height: 0 }, // drawLine27
        { x: 1029, y: 690, width: 0, height: 138 }, // drawLine28
        { x: 588, y: 690, width: 0, height: 138 }, // drawLine29 
    ];

    for (let rect of rectangles) {
        if (rect.height == 0 && y >= rect.y - 1 && y <= rect.y + 1 && x >= rect.x && x <= rect.x + rect.width) {
            return true;
        }
    }
    return false;
}


function Player(x, y, rotation, w, h)
{
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.w = w;
    this.h = h;
    this.canfire = true;
    this.hit = false;
    this.score = 0;
}

let lastFireTime2 = 0;
const fireCooldown2 = 500;



function player2Bullet() {
    if (qPressed && Date.now() - lastFireTime2 > fireCooldown2) 
    {
        lastFireTime2 = Date.now();

        let rad = 5;
        let posx = player2.x+23;
        let posy = player2.y+23;
        
        //velocity
        let radang = player2.rotation * Math.PI / 180;
        let speed = 150;
        let velx = speed * Math.cos(radang);
        let vely = speed * Math.sin(radang);

        function draw_and_update() {
            canvas.beginPath();
            canvas.arc(posx, posy, rad, 0, 2 * Math.PI);
            canvas.fill();
            canvas.fillStyle = "black";

            posx += velx / 60;
            posy += vely / 60;

            if (posx + rad >= 1472 || posx - rad <= 0) {
                velx = -velx;
            }

            if (posy + rad >= 828 || posy - rad <= 0) {
                vely = -vely;
            }

            if (Date.now() - lastFireTime2 >= 10000) {
                return;
            }
            if (gameEnded) {
                return;
            }

            if (checkbulletWallCollisionx(posx, posy, rad, rad)) {
                console.log("momo");
                console.log(posx);
                velx = -velx;
            }

            if (checkbulletWallCollisiony(posx, posy, rad,rad)){
                console.log("mama");
                console.log(posy)
                vely = -vely;
            }

            if (Date.now() - lastFireTime2 >= 2000) {
                if (
                    posx >= player2.x &&
                    posx <= player2.x + player2.w &&
                    posy >= player2.y &&
                    posy <= player2.y + player2.h
                ) {
                    console.log('player 2 has been hit');
                    endGame();
                }
            }
            if (
                    posx >= player1.x &&
                    posx <= player1.x + player1.w &&
                    posy >= player1.y &&
                    posy <= player1.y + player1.h
                ) {
                    console.log('player 1 has been hit by player 2 bullet');
                    endGame();
                }
            
            requestAnimationFrame(draw_and_update);
        }
        requestAnimationFrame(draw_and_update);
    }

}

let lastFireTime1 = 0;
const fireCooldown1 = 500;

function player1Bullet() {
    if (slasPressed && Date.now() - lastFireTime1 > fireCooldown1) 
    {
        lastFireTime1 = Date.now();

        let rad = 5;
        let posx = player1.x+23;
        let posy = player1.y+23;

        //velocity
        let radang = player1.rotation * Math.PI / 180;
        let speed = 100;
        let velx = speed * Math.cos(radang);
        let vely = speed * Math.sin(radang);

        function draw_and_update() {
            canvas.beginPath();
            canvas.arc(posx, posy, rad, 0, 2 * Math.PI);
            canvas.fill();
            canvas.fillStyle = "black";

            posx += velx / 60;
            posy += vely / 60;

            if (posx + rad >= 1472 || posx - rad <= 0) {
                velx = -velx;
            }

            if (posy + rad >= 828 || posy - rad <= 0) {
                vely = -vely;
            }

            if (Date.now() - lastFireTime1 >= 10000) {
                return;
            }
            if (gameEnded) {
                return;
            }

            if (checkbulletWallCollisionx(posx, posy, rad, rad)) {
                console.log("momo");
                console.log(posx);
                velx = -velx;
            }

            if (checkbulletWallCollisiony(posx, posy, rad,rad)){
                console.log("mama");
                console.log(posy)
                vely = -vely;
            }


            if (Date.now() - lastFireTime1 >= 2000) {
                if (
                    posx >= player1.x &&
                    posx <= player1.x + player1.w &&
                    posy >= player1.y &&
                    posy <= player1.y + player1.h
                ) {
                    console.log('player 1 has been hit');
                    endGame();
                }
            }
            if (
                    posx >= player2.x &&
                    posx <= player2.x + player2.w &&
                    posy >= player2.y &&
                    posy <= player2.y + player2.h
                ) {
                    console.log('player 2 has been hit by player 1 bullet');
                    endGame();
                }
            requestAnimationFrame(draw_and_update);
        }
        requestAnimationFrame(draw_and_update);
    }
}

let player2 = new Player (50, 50, 90, 46, 46);
let player1 = new Player (1375, 732, 270, 46, 46);

function drawLine1() {

    let x1 = 147;
    let y1 = 0;

    let x2 = 147;
    let y2 = 138;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine2() {

    let x1 = 0;
    let y1 = 276;

    let x2 = 147;
    let y2 = 276;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine4() {

    let x1 = 294;
    let y1 = 276;

    let x2 = 441;
    let y2 = 276;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine3() {

    let x1 = 294;
    let y1 = 138;

    let x2 = 735;
    let y2 = 138;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine5() {

    let x1 = 0;
    let y1 = 552;

    let x2 = 147;
    let y2 = 552;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine11() {

    let x1 = 294;
    let y1 = 552;

    let x2 = 588;
    let y2 = 552;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine6() {

    let x1 = 142;
    let y1 = 414;

    let x2 = 142;
    let y2 = 552;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine7() {

    let x1 = 294;
    let y1 = 414;

    let x2 = 294;
    let y2 = 690;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine8() {

    let x1 = 147;
    let y1 = 690;

    let x2 = 441;
    let y2 = 690;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine9() {

    let x1 = 436;
    let y1 = 276;

    let x2 = 436;
    let y2 = 414;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine10() {

    let x1 = 436;
    let y1 = 276;

    let x2 = 436;
    let y2 = 414;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine12() {

    let x1 = 588;
    let y1 = 272;

    let x2 = 588;
    let y2 = 557;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine13() {

    let x1 = 735;
    let y1 = 133;

    let x2 = 735;
    let y2 = 414;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine13() {

    let x1 = 735;
    let y1 = 133;

    let x2 = 735;
    let y2 = 276;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine14() {

    let x1 = 730;
    let y1 = 276;

    let x2 = 882;
    let y2 = 276;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine15() {

    let x1 = 882;
    let y1 = 0;

    let x2 = 882;
    let y2 = 138;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine16() {

    let x1 = 1029;
    let y1 = 138;

    let x2 = 1472;
    let y2 = 138;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine17() {

    let x1 = 1176;
    let y1 = 138;

    let x2 = 1176;
    let y2 = 276;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine18() {

    let x1 = 1029;
    let y1 = 276;

    let x2 = 1029;
    let y2 = 414;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine19() {

    let x1 = 1024;
    let y1 = 414;

    let x2 = 1323;
    let y2 = 414;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine20() {

    let x1 = 1323;
    let y1 = 276;

    let x2 = 1323;
    let y2 = 419;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine21() {

    let x1 = 735;
    let y1 = 414;

    let x2 = 882;
    let y2 = 414;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine22() {

    let x1 = 882;
    let y1 = 409;

    let x2 = 882;
    let y2 = 552;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine23() {

    let x1 = 877;
    let y1 = 552;

    let x2 = 1323;
    let y2 = 552;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine24() {

    let x1 = 1176;
    let y1 = 690;

    let x2 = 1176;
    let y2 = 828;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine25() {

    let x1 = 1171;
    let y1 = 690;

    let x2 = 1323;
    let y2 = 690;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine26() {

    let x1 = 735;
    let y1 = 552;

    let x2 = 735;
    let y2 = 690;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine27() {

    let x1 = 730;
    let y1 = 690;

    let x2 = 882;
    let y2 = 690;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine28() {

    let x1 = 1029;
    let y1 = 690;

    let x2 = 1029;
    let y2 = 828;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawLine29() {

    let x1 = 588;
    let y1 = 690;

    let x2 = 588;
    let y2 = 828;

    canvas.beginPath();

    canvas.moveTo(x1, y1);

    canvas.lineTo(x2, y2);

    canvas.strokeStyle = "black";

    canvas.lineWidth = 10;

    canvas.stroke();
}

function drawImage()
{
    canvas.clearRect(0, 0, 1472, 828);

    controls();

    player1Bullet();

    player2Bullet();

    drawLine1();
    drawLine2();
    drawLine3();
    drawLine4();
    drawLine5();
    drawLine6();
    drawLine7();
    drawLine8();
    drawLine9();
    drawLine10();
    drawLine11();
    drawLine12();
    drawLine13();
    drawLine14();
    drawLine15();
    drawLine16();
    drawLine17();
    drawLine18();
    drawLine19();
    drawLine20();
    drawLine21();
    drawLine22();
    drawLine23();
    drawLine24();
    drawLine25();
    drawLine26();
    drawLine27();
    drawLine28();
    drawLine29();

    if(!player1.hit)
    {
        drawimgrotation(tank1, player1.x, player1.y, player1.w, player1.h, player1.rotation);
    }

    if(!player2.hit)
    {
        drawimgrotation(tank2, player2.x, player2.y, player2.w, player2.h, player2.rotation);
    }
}
setInterval(drawImage, 5);

function endGame() {
    player2 = new Player (25, 25, 90, 46, 46);
    player1 = new Player (1355, 715, 270, 46, 46);

    document.getElementById("gameContainer").style.opacity = 0;
    document.documentElement.style.background = '#97ae89';
    document.body.style.backgroundImage = 'url("/MihirCS/images/sprite/TANKLOADINGBLANK.png")';

    gameEnded = true;

    document.querySelectorAll('.container button').forEach(function(button) {
        button.style.display = 'block';
      });
}