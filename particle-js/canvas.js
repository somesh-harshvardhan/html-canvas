const getRandomNumRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const distance = function (x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
 
    const canvas =  document.querySelector('canvas')
    const context = canvas.getContext("2d");
    const parent = document.querySelector("section");

    const mouse = { x: null, y: null, radius: 200 ,clickX : null,clickY : null};
    const connectDistance = 100;
    const push = 10;

    canvas.height = parent.clientHeight;
    canvas.width = parent.clientWidth;

    let animationId;
    const handleMouse = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener("mousemove", handleMouse);

    window.addEventListener("click",(event)=>{
       mouse.clickX = event.clientX;
       mouse.clickY =event.clientY;
    })

    class Particle {
      constructor(x, y, dx, dy, radius, color, index) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        this.index = index;
      }

      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
      }

      update(particles) {
        if (this.x + this.radius >= canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius >= canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        } 
        

        // push particle away from mouse with radius 
        if (
          distance(mouse.x, mouse.y, this.x, this.y) <
          mouse.radius + this.radius
        ) {
          if (this.x < mouse.x && this.x > this.radius * 10) {
            this.x += -push * .3;
            this.dx = -this.dx;
          }
          if (this.x > mouse.x && this.x < canvas.width - this.radius * 10) {
            this.x += push * .3;
            this.dx = -this.dx;
          }
          if (this.y < mouse.y && this.y > this.radius * 10) {
            this.y += -push * .3;
            this.dy = -this.dy;
          }
          if (this.y > mouse.y && this.y < canvas.height - this.radius * 10) {
            this.y += push * .3;
            this.dy = -this.dy;
          }
        }


        // line between particles effect
        for (let i = 0; i < particles.length; i++) {
          if (particles[i] === this) continue;
          const d = distance(particles[i].x, particles[i].y, this.x, this.y);

          if (d <= connectDistance) {
            context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(particles[i].x, particles[i].y);
            context.strokeStyle = "white";
            context.lineWidth = ".2";
            context.stroke();
            context.closePath();
          }
        }

        // sun ray effect
        // if (this.index % 2 === 0) {
        //   context.beginPath();
        //   context.moveTo(this.x, this.y);
        //   context.lineTo(mouse.x, mouse.y);
        //   context.strokeStyle = "white";
        //   context.lineWidth = ".2";
        //   context.stroke();
        //   context.closePath();
        // }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    let particles = [];

    function init() {
      particles = [];
      for (let index = 0; index < 100; index++) {
        const radius = 8;
        const x = getRandomNumRange(radius, canvas.width - radius * 2);
        const y = getRandomNumRange(radius, canvas.height - radius * 2);

        const color = "white";
        const dx = getRandomNumRange(1, 2);
        const dy = getRandomNumRange(1, 2);
        particles.push(new Particle(x, y, dx, dy, radius, color, index));
      }
    }

    function animate() {
      animationId = requestAnimationFrame(animate);

      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.update(particles));
      mouse.clickX = null;
      mouse.clickY = null
    }
    init();
    animate();

