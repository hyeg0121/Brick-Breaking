const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); //캔버스를 그리기 위해 사용되는 도구

var ballRadius = 10;

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 1;
var dy = -1;

var paddleWidth = 75;
var paddleHeight = 10;

//paddleY는 paddle이 위 아래로 움직이지 않기 때문에 정의x
var paddelX = (canvas.width - paddleWidth) / 2;
//처음에는 컨트롤 버튼이 눌려지지 않은 상태이므로 기본값 false
var rightPressed = false;
var leftPressed = false;

// 벽돌과 관련된 변수
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 40;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//왼쪽 또는 오른쪽 키가 눌렸을 경우 발생하는 이벤트
function keyDownHandler(e) {
  // 37 : 왼쪽 / 39 : 오른쪽
  if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 39) {
    rightPressed = true;
  }
}

//키에서 손을 뗄 경우의 발생하는 이벤트
function keyUpHandler(e) {
  // 37 : 왼쪽 / 39 : 오른쪽
  if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 39) {
    rightPressed = false;
  }
}

//충돌 감지 함수
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillstyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddelX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillstyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillstyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 초기화
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  //공이 벽에 닿으면 튕기기
  //공의 원점과 벽 사이의 거리가 공의 반지름과 같아졌을 때 공의 움직임이 바뀜
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddelX && x < paddelX + paddleWidth) {
      dy = -dy;
    } else {
      alert("GAME OVER");
      document.location.reload();
    }
  }

  //왼쪽키 또는 오른쪽 키를 눌렀을 경우 7픽셀씩 움직임
  //캔버스 왼쪽 끝 0 위치와 오른쪽 canvas.width-paddleWidth 에서 움직임
  if (rightPressed && paddelX < canvas.width - paddleWidth) {
    paddelX += 7;
  } else if (leftPressed && paddelX > 0) {
    paddelX -= 7;
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10); //10 밀리 초마다 실행
