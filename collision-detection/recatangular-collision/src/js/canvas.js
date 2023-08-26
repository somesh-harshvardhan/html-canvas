import utils from "./utils";

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
class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
    c.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let rectangle1, rectangle2;
function init() {
  rectangle2 = new Rectangle(0, 0, 100, 100, "red");
  rectangle1 = new Rectangle(canvas.width / 2,canvas.height / 2,200,200,"green");
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  if (
    rectangle2.x + rectangle2.width >= rectangle1.x &&
    rectangle2.x <= rectangle1.x + rectangle1.width &&
    rectangle2.y + rectangle2.height >= rectangle1.y &&
    rectangle2.y <= rectangle1.y + rectangle1.height
  ) {
    rectangle1.color = "red"
  } else {
    rectangle1.color = "green"
  }
  rectangle1.update();
  rectangle2.x = mouse.x;
  rectangle2.y = mouse.y;
  rectangle2.update();
}

init();
animate();
