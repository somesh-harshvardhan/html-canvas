const canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

const c = canvas.getContext("2d");


function Circle(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx= dx;
    this.dy= dy;
    this.radius=radius;

    this.draw = function(){
      c.beginPath();
      c.arc(this.x,this.y,this.radius,Math.PI * 2,false);
    //   c.strokeStyle = "#FF6969"
      c.stroke();
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

        this.draw();
    }
}

const circleArray = [];
for(let i = 0; i < 100;i++){
    let radius = 30;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y=Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 1;
    let dy = (Math.random() - 0.5) * 1;
    

    circleArray.push(new Circle(x,y,dx,dy,radius))
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  for (let index = 0; index < circleArray.length; index++) {
     
    circleArray[index].update()

  }
}
animate();
