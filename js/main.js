const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); //캔버스를 그리기 위해 사용되는 도구

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 초기화

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillstyle = "#000000";
    ctx.fill();
    ctx.closePath();

    x += dx;
    y += dy;
}
setInterval(draw, 10); //10 밀리 초마다 실행