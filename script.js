//gameover screen
let rendergameover = false;

//player variables
let playerX = 80;
let playerY = 50;
let playerFallSpeed = -8;
const playerWidth = 45;
const playerHeight = 45;
const playerHitboxX = 5;
const playerHitboxY = 10;
let points = 0;
const flyValue = 5;
const playerImage = new Image();
playerImage.src = "assets/player.png";

//player object
let player = {
    x : playerX,
    y : playerY,
    width : playerHeight,
    height : playerHeight,
    veloY : playerFallSpeed
}

//pipes config
let pipeSpeed = 2;

const pipeWidth = 40;
const pipeHeight = 400; 
const numberOfPipes = 1000;
const initialX = 370;
const verticalGap = 120;
const horizontalGap = 175;
let whichImage = true;

const bottomPipeImage = new Image();
bottomPipeImage.src = "assets/bottomPipe.png";

const upperPipeImage = new Image();
upperPipeImage.src = "assets/upperPipe.png";

const backgroundImage = new Image();
backgroundImage.src = "assets/background.png";

window.onload = () => {
    board = document.getElementById("mycanvas");
    board.width = 360;
    board.height = 480;
    context = board.getContext("2d"); 
    requestAnimationFrame(update);
    addEventListener("keydown", keydown);
    window.addEventListener('click', () => {
        player.veloY = flyValue;
     });
}

const update = () => {
    //clear canvas
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    context.fillStyle = "rgb(22, 148, 217)";
    context.drawImage(backgroundImage, 0, 0, board.width, board.height);
    
    //new frame
    checkFly();
    context.drawImage(playerImage, player.x, player.y, player.width, player.height);
    pipeSpeed += .0002;
    pipesArray.forEach(pipe => {
        pipe.x -= pipeSpeed;
        if (whichImage) {
            context.drawImage(upperPipeImage, pipe.x, pipe.y, pipe.width, pipe.height);
            whichImage = false;
        }
        else {
            context.drawImage(bottomPipeImage, pipe.x, pipe.y, pipe.width, pipe.height);
            whichImage = true;
        }
        
    });
    context.fillStyle = "black";
    context.fillRect(10, 5, 20, 25);
    context.fillStyle = "white";
    context.font = "22px Tsuki Typeface";
    context.fillText(points, 15, 25);
    context.fillText(pipeSpeed, 15, 45);


    //render gameover screen
    if (rendergameover) {
        context.fillStyle = "rgb(17, 17, 17)";
        const gameoverWidth = 200;
        const gameoverHeight = 170;
        const gameoverX = board.width/2 - (gameoverWidth/2);
        const gameoverY = board.height/2 - (gameoverHeight /2);
        context.fillRect(gameoverX, gameoverY, gameoverWidth, gameoverHeight);
    }


    checkBottomCol();
    pipeCols();
}

const checkFly = () => {
    if (player.veloY <= flyValue && player.veloY != playerFallSpeed) {
        player.veloY -= .5;
    }
}

const checkBottomCol = () => {
    if (player.y + player.height + 5 <= board.height) {
        player.y -= player.veloY;
    }
    else {
        location.reload();
    }
}

const pipeCols = () => {
    pipesArray.forEach(pipe => {
        const xCols = player.x + playerHitboxX < pipe.x + pipe.width && player.x + player.width - playerHitboxX > pipe.x;
        const yCols = player.y + playerHitboxY < pipe.y + pipe.height && player.y + player.height - playerHitboxY > pipe.y;

        if (xCols && yCols) {
            location.reload();
        }

        if (player.x > pipe.x + pipe.width && !pipe.playerPassed) {
            pipe.playerPassed = true;
            points += 0.5;
        }
    });
};

const keydown = (e) => {
    if (e.code == "ArrowUp" || e.code == "Space") {
        player.veloY = flyValue;
    }
}

const random = ( lowest, highest) => {
    const adjustedHigh = (highest - lowest) + 1;       
    return Math.floor(Math.random()*adjustedHigh) + parseFloat(lowest);
}
const genPipeArray = (numberOfPipes, initialX, pipeWidth, pipeHeight, verticalGap) => {
    const pipesArray = [];

    for (let i = 0; i < numberOfPipes; i++) {
        const pipeX = initialX + i * (pipeWidth + horizontalGap);
        const firstPipeY = random(-370, -120);
        const secPipeY = firstPipeY + pipeHeight + verticalGap;

        const pipe = {
            x: pipeX,
            y: firstPipeY,
            width: pipeWidth,
            height: pipeHeight
        };

        const secPipe = {
            x: pipeX,
            y: secPipeY,
            width: pipeWidth,
            height: pipeHeight
        };

        pipesArray.push(pipe);
        pipesArray.push(secPipe);
    }

    return pipesArray;
}

const pipesArray = genPipeArray(numberOfPipes, initialX, pipeWidth, pipeHeight, verticalGap);