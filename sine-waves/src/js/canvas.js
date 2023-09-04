import utils, { randomColor, randomIntFromRange } from "./utils";
import * as dat from "dat.gui";

const gui = new dat.GUI();
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency : 0.01 
};
gui.add(wave, "y", 0, canvas.height);
gui.add(wave, "length", -0.01, 0.01);
gui.add(wave, "amplitude", -300, 300);
gui.add(wave,"frequency",0.01,1)

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

let increment =wave.frequency

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height)
  c.beginPath();
  c.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i++) {
    c.lineTo(i,wave.y + Math.sin(i * wave.length + increment) * wave.amplitude);
  }
  c.stroke();
  increment += wave.frequency
}
animate();
