var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 20;
var ballY = 50;
var ballSpeedY = 5;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

var player1Score = 0;
var player2Score = 0;
const winScore = 5;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    //playspeed
    var framesPerSecond = 30;
    setInterval(callBoth,1000/framesPerSecond);
    
    //adding an event listener
    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = calcMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    })
}

//function for drawing the net
function drawNet () {
    for(var i= 0; i<canvas.height; i+=40) {
        colorRect(canvas.width/2-1,i,2,20,'white');
    }
}

//function for drawing the rectangles
function colorRect (leftX,topY,width,height,drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
}

//function for drawing the ball
function colorBall (centerX,centerY,radius,drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.fill();
}

//function for drawing everything
function drawEverything () {
    
    //black canvas
    colorRect(0,0,canvas.width,canvas.height,'black');
    
    //white paddle1Y
    colorRect(0,paddle1Y,10,PADDLE_HEIGHT,'white');
    
    //white paddle2Y
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
    
    //drawing the net
    drawNet();
    
    //red bouncing ball
    colorBall(ballX,ballY,10,'red');
    
    //drawing the scores
    canvasContext.fillStyle = 'white';
    canvasContext.fillText("Scores" + " " + player1Score,100,100);
    canvasContext.fillText("Scores" + " " + player2Score,canvas.width-100,100);
    
}

//function for moving the ball
function moveEverything () {
    ballX = ballX += ballSpeedX;
    ballY = ballY += ballSpeedY;
    
    //paddle1Y movement
    if(ballX > canvas.width) {
        if(ballY > paddle2Y && ballY < (paddle2Y + PADDLE_HEIGHT)){
            ballSpeedX = -ballSpeedX;
            
            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
           ballSpeedY = deltaY * 0.35;
        }
        else {
            player1Score++; // must be BEFORE ballReset
             ballReset();
            
        }
    }
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < (paddle1Y + PADDLE_HEIGHT)) {
            ballSpeedX = -ballSpeedX;
            
            var deltaY = ballY - (paddle1Y + (PADDLE_HEIGHT/2));
            ballSpeedY = deltaY * 0.35;
        }
        else {
            player2Score++; //must be BEFORE ballReset
             ballReset();
            
        }
       
    }
    
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY < 0 ) {
        ballSpeedY = -ballSpeedY;
    }
    
    //paddle2Y movement
    computerMovement();
}

//function to reset the ball
function ballReset () {
    
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballSpeedX = -ballSpeedX;
}

//function to define the winner
function winningPlayer () {
    if (player1Score == winScore){
        canvasContext.fillStyle = 'yellow';
        canvasContext.fillText("Player 1 wins" + " " + player1Score,450,400);
        stopGame();
    }
    if (player2Score == winScore) {
        canvasContext.fillStyle = 'yellow';
        canvasContext.fillText("Player 2 wins" + " " + player2Score,450,400);
        stopGame();
    }
}

//function to stop the game if the winscore is reached
function stopGame () {
    if(player1Score >= winScore || player2Score >= winScore){
        ballSpeedX = 0;
        ballSpeedY = 0;
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("GAMEOVER!...reset", 450,200);
    }
}

//function for the computer movement of paddle2Y
function computerMovement () {
   //if the paddle is above the ball, make it move down 6 times, else if it is below it,make it move up  6 times
    //Also ignore chasing the ball if it is 35 pixels above or below the ball
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if (paddle2YCenter < ballY-35){
        paddle2Y +=6;
    }
    else if(paddle2YCenter > ballY+35){
        paddle2Y -=6;
    }
}

//function to call both the draw everything and move everything
function callBoth () {
    drawEverything();
    moveEverything();
    winningPlayer();
}

//FUNCTION to calculate mouse position 
function calcMousePos (evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    }
}

