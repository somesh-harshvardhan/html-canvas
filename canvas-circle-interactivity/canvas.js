const canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

const c = canvas.getContext("2d");

let circleArray = [];
const colorArray = [
  "#2C3E50",
  "#E74C3C",
  "#ECF0F1",
  "#3498DB",
  "#2980B9"
]
let mouse = {
  x : undefined,
  y : undefined,
}
let maxRadius = 50;
let minRadius = 2;
window.addEventListener("mousemove",function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})
window.addEventListener("resize",function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})
function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx= dx;
    this.dy= dy;
    this.radius=radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.minRadius = radius;

    this.draw = function(){
      c.beginPath();
      c.arc(this.x,this.y,this.radius,Math.PI * 2,false);
      c.fillStyle = this.color
      c.fill()
    }
    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx *= -1;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy *= -1;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
          if(this.radius < maxRadius){
            this.radius += 1;
          }
          
        }else if(this.radius > this.minRadius){
          
          this.radius += -1;
        }

        this.draw();
    }
}


function init(){
  circleArray = [];
  for(let i = 0; i < 1000;i++){
    let radius = Math.random() * 8 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y=Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 1;
    let dy = (Math.random() - 0.5) * 1;
    

    circleArray.push(new Circle(x,y,dx,dy,radius))
}
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  for (let index = 0; index < circleArray.length; index++) {
     
    circleArray[index].update()

  }
}
init();
animate();
