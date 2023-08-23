const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

// rectangle;
c.fillStyle="rgba(255,0,0,.5)"
c.fillRect(100,100,200,200);
c.fillRect(500,200,200,200);

// line
c.beginPath() // used to start a new path
c.moveTo(100,300);//moves to a given point 
c.lineTo(60,100);
c.lineTo(200,300);
c.lineTo(400,300);
c.strokeStyle = "red"
c.stroke();

// arc
c.beginPath()
c.arc(600,600,40,Math.PI * 2,false);
c.strokeStyle = "blue"
c.stroke();

// random postion arcs

for(let i=0;i < 3;i++){
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    c.beginPath();
    c.arc(x,y,40,Math.PI * 2,false);
    c.stroke()
}