
//player variables
let playerX = 80;
let playerY = 50;
let playerFallSpeed = -5;
const playerWidth = 25;
const playerHeight = 25;
let points = 0;

//player object
let player = {
    x : playerX,
    y : playerY,
    width : playerHeight,
    height : playerHeight,
    veloY : playerFallSpeed
}

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
    checkBottomCol();
    pipeCols();
    if (player.veloY > -5) {
        player.veloY -= 1;
    }
    context.fillRect(player.x, player.y, player.width, player.height);
    pipesArray.forEach(pipe => {
        pipe.x -= pipeSpeed;
        context.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    });
    context.fillStyle = "white";
    context.font = "22px Tsuki Typeface";
    context.fillText(points, 15, 25);
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
            console.log(points);
        }
    });
};

const keydown = (e) => {
    if (e.code == "ArrowUp") {
        player.veloY = 8;
    }
}

const genPipeArray = (numberOfPipes, initialX, pipeWidth, pipeHeight, verticalGap) => {
    const pipesArray = [];

    for (let i = 0; i < numberOfPipes; i++) {
        const pipeX = initialX + i * (pipeWidth + 150);
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

const pipeSpeed = 1;

const pipeWidth = 25;
const pipeHeight = 400; 
const numberOfPipes = 10000;
const initialX = 350;
const verticalGap = 130;

const pipesArray = genPipeArray(numberOfPipes, initialX, pipeWidth, pipeHeight, verticalGap);