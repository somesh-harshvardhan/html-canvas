const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

const offset = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
ctx.translate(offset.x, offset.y);


const A = { x: 0, y: 0 };
const B = { x: 90, y: 120 };
const C = { x: B.x, y: 0 };
update()

document.onmousemove = (event) => {
  B.x = event.x - offset.x;
  B.y = event.y - offset.y;

  C.x = B.x;

  update();
};

function update() {
  const c = distance(A,B);
  const a = distance(B,C);
  const b = distance(A,C);

  const sin  = a/c;
  const theta = Math.asin(sin);
  ctx.clearRect(-offset.x, -offset.y, canvas.width, canvas.height);

  drawLine(A,B);
  drawText("c",average(A,B),"black")
  drawLine(B,C);
  drawText("a",average(B,C),"black")
  drawLine(C,A);
  drawText("b",average(A,C),"black")
  drawCoordinateSystem(ctx, offset);
  drawText("sin = a/c = " + sin.toFixed(2),{
    x : -offset.x / 2,
    y : offset.y * .7
  },"black") 
  drawText("θ = " + theta.toFixed(2)+ "(" + Math.round(toDegree(theta)).toString().padStart(2," ") + "°)",{x : offset.x/2, y : offset.y * .7 },"black")
  drawText("θ",A,"black")
  
  ctx.beginPath();
  ctx.strokeStyle="black";
  ctx.lineWidth = 2;
  const start = B.x > A.x ? 0 : Math.PI;
  const clockwise = B.y < C.y^B.x>A.x;
  let end = B.y < C.y?-theta : theta;
  if(B.x < A.x){
    end = Math.PI - end;
  }
  ctx.arc(0,0,20,start,end,!clockwise);
  ctx.stroke()

//   drawPoint(A);
//   drawPoint(B);
//   drawPoint(C);
//   drawText("A", A);
//   drawText("C", C);
}
function drawPoint(loc, size = 20, color = "black") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(loc.x, loc.y, size / 2, 0, Math.PI * 2);
  ctx.fill();
}
function drawText(text, loc, color = "white") {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 18px Courier";
  ctx.strokeStyle = "white"
  ctx.lineWidth = 7;
  ctx.strokeText(text,loc.x,loc.y)
  ctx.fillText(text, loc.x, loc.y);
}
function drawCoordinateSystem(ctx, offset) {
  ctx.beginPath();
  ctx.moveTo(-offset.x, 0);
  ctx.lineTo(canvas.width - offset.x, 0);
  ctx.moveTo(0, -offset.y);
  ctx.lineTo(0, canvas.height - offset.y);
  ctx.setLineDash([4, 2]);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "gray";
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawLine(loc1,loc2,color="black"){

 ctx.beginPath();
 ctx.moveTo(loc1.x,loc1.y);
 ctx.lineTo(loc2.x,loc2.y);
 ctx.strokeStyle=color;
 ctx.lineWidth = 2
 ctx.stroke();
}
function average(p1,p2){
    return {
        x : (p1.x + p2.x)/2,
        y : (p1.y + p2.y)/2
    }
}
function distance(loc1,loc2){
   return Math.hypot(loc1.x - loc2.x,loc1.y - loc2.y)
}
function toDegree(theta){
    return (theta * 180)/Math.PI
}