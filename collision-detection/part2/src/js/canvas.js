import utils, { distance, randomColor, randomIntFromRange, resolveCollision } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = 1;
    this.opactiy= 0;
    this.velocity = {
      x :( Math.random() * - .5) * 5 ,
      y :( Math.random() * - .5) * 5
    }
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.save();
    c.globalAlpha = this.opactiy
    c.fillStyle = this.color
    c.fill()
    c.restore()
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }

  update(particles) {
  
    for(let i = 0 ; i < particles.length;i++){
      if(this === particles[i]) continue; 

      if(distance(this.x,this.y,particles[i].x,particles[i].y) < this.radius + particles[i].radius){
       resolveCollision(this,particles[i])
      }

    }
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.velocity.x = -this.velocity.x
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.velocity.y = - this.velocity.y
    }

    if(distance(this.x,this.y,mouse.x,mouse.y) <= 80 && this.opactiy < .8){
      this.opactiy  +=.02
    }else if(this.opactiy > 0){
      this.opactiy -=.02;
      this.opactiy = Math.max(0,this.opactiy)
    }
    this.x += this.velocity.x
    this.y += this.velocity.y;
    this.draw();
  }
}

// Implementation
let particles = [];
function init() {
  particles = [];

  for (let i = 0; i < 400; i++) {
    const radius = 15;
    let x = randomIntFromRange(radius,innerWidth - radius);
    let y = randomIntFromRange(radius,innerHeight - radius);
    const color = randomColor(colors);
    if( i !== 0){
      for(let j = 0; j < particles.length;j++){
        if((distance(x,y,particles[j].x,particles[j].y) - radius * 2) < 0){
            x =randomIntFromRange(radius,innerWidth - radius);
            y = randomIntFromRange(radius,innerHeight - radius);

            j = -1
        }
      }
    }
    particles.push(new Particle(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update(particles);
  });
}

init();
animate();
