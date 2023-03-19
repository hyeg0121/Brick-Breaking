const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); //캔버스를 그리기 위해 사용되는 도구

var ballRadius = 10;

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillstyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 초기화
  drawBall();

  //공이 벽에 닿으면 튕기기
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10); //10 밀리 초마다 실행
