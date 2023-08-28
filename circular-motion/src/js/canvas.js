import utils, { randomColor, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2
    this.velocity = 0.05;
    this.disatanceFromCenter = randomIntFromRange(50,120);
    this.lastMouse = {x : x,y : y}
  }

  draw(lastPoint) {
    c.beginPath()
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x,lastPoint.y);
    c.lineTo(this.x,this.y);
    c.stroke()
    c.closePath()
  }

  update() {
    const lastPoint = {x : this.x,y : this.y}

    // drag effect
    this.lastMouse.x += (mouse.x  - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05

    // circular motion
    this.radians += this.velocity
    this.x = this.lastMouse.x +  Math.cos(this.radians) * this.disatanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radians)* this.disatanceFromCenter
    this.draw(lastPoint)
  }
}

// Implementation
let particles = []
function init() {
  particles = []

  for (let i = 0; i < 50; i++) {
    const radius = randomIntFromRange(1,2)
    const color = randomColor(colors)
    particles.push(new Particle(canvas.width/2,canvas.height/2,radius,color))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = "rgba(255,255,255,.05)"
  c.fillRect(0, 0, canvas.width, canvas.height)
  particles.forEach(object => {
   object.update()
  })
}

init()
animate()
