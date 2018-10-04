var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');


var x = canvas.width/2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 16;
var paddleHeight = 10;
var paddleWidth= 75;
var paddleX = (canvas.width-paddleHeight)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bitcoin = 0;
var lives = 3;
var level = 1;
var maxLevel = 5;
var paused = false;
var ball = new Image();
ball.src = "https://bitcoin.org/img/icons/opengraph.png";
var dollar = new Image();
dollar.src = "https://intervarsity.org/sites/default/files/blog/dollar_bill_1.jpg"




var bricks = [];
initBricks();
function initBricks() {
for (c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for (r=0; r<brickRowCount; r++) {
    bricks[c][r] = {x: 0, y:0, status: 1};
}
}
  }

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBricks() {
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
      var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
      var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.drawImage(dollar, brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
}
    }
  }
}

function drawBitcoin () {
ctx.font = "20px Arial";
ctx.fillStyle = "#FFD700";
ctx.fillText("Bitcoin: "+bitcoin, 8, 20);
}
function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}

function drawLives(){
  ctx.font = "18px Arial";
  ctx.fillStyle = "#FFD700";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawLevel() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#FFD700";
  ctx.fillText("Level "+level, 210, 20);
}



function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.drawImage(ball, x, y, ballRadius, ballRadius);
  ctx.fillStyle = "#FFD700";
  ctx.fill();
  ctx.closePath();
  drawPaddle();
  drawBricks();
  drawBitcoin();
  drawLives();
  drawLevel();



  // collission of the bricks below

  for(c=0; c<brickColumnCount; c++){
    for(r=0; r<brickRowCount; r++){
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
          dy = -dy;
          b.status = 0;
          bitcoin++;
          if (bitcoin == brickRowCount*brickColumnCount) {
            if (level === maxLevel) {
              alert("YOU WON SO MUCH BITCOIN!");
              document.location.reload();
            } else {
              level++;
              brickRowCount++;
              initBricks();
              bitcoin = 0;
              dx += 1;
              dy = -dy;
              dy -= 1;
              x = canvas.width/2;
              y = canvas.height-30;
              paddleX = (canvas.width-paddleWidth)/2;
              paused = true;
              setTimeout(function() {
                paused = false;
                draw();
              }, 3000);


            }
          }
        }
      }
    }
  }
// the ball movemnet below


  if (y + dy < ballRadius){
    dy = -dy;
  } else if (y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
    dy = -dy;
  } else {
    lives--;
    if(!lives) {
      alert("GAME OVER!");
      document.location.reload();
    } else {
      x = canvas.width/2;
      y = canvas.height-30;
      paddleX = (canvas.width-paddleWidth)/2;
    }
  }
  }

  if (x + dx > canvas.width-ballRadius || x + dx < ballRadius){
    dx = -dx;
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0){
    paddleX -= 7;
  }


x += dx;
y += dy;

}

function drawPaddle (){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

}
setInterval(draw, 10);
