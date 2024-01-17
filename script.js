
//player variables
let playerX = 80;
let playerY = 50;
let playerFallSpeed = -8;
const playerWidth = 25;
const playerHeight = 25;
let points = 0;
const flyValue = 5;

//player object
let player = {
    x : playerX,
    y : playerY,
    width : playerHeight,
    height : playerHeight,
    veloY : playerFallSpeed
}

//pipes config
const pipeSpeed = 2;

const pipeWidth = 30;
const pipeHeight = 400; 
const numberOfPipes = 1000;
const initialX = 370;
const verticalGap = 115;
const horizontalGap = 110;

window.onload = () => {
    board = document.getElementById("mycanvas");
    board.width = 360;
    board.height = 480;
    context = board.getContext("2d"); 
    requestAnimationFrame(update);
    addEventListener("keydown", keydown);
}

const update = () => {
    //clear canvas
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    context.fillStyle = "rgb(22, 148, 217)";
    context.fillRect(0, 0, board.width, board.height);
    
    //new frame
    context.fillStyle = "white";
    checkFly();
    context.fillRect(player.x, player.y, player.width, player.height);
    pipesArray.forEach(pipe => {
        pipe.x -= pipeSpeed;
        context.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    });
    context.fillStyle = "white";
    context.font = "22px Tsuki Typeface";
    context.fillText(points, 15, 25);

    checkBottomCol();
    pipeCols();
}

const checkFly = () => {
    if (player.veloY <= flyValue && player.veloY != playerFallSpeed) {
        console.log(player.veloY);
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
        const xCols = player.x < pipe.x + pipe.width && player.x + player.width > pipe.x;
        const yCols = player.y < pipe.y + pipe.height && player.y + player.height > pipe.y;

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

// const sleep = (ms) => {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

const genPipeArray = (numberOfPipes, initialX, pipeWidth, pipeHeight, verticalGap) => {
    const pipesArray = [];

    for (let i = 0; i < numberOfPipes; i++) {
        const pipeX = initialX + i * (pipeWidth + horizontalGap);
        const firstPipeY = Math.random() * (0 - (-350)) + (-400);
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