import utils, { randomColor, randomIntFromRange } from './utils'
import * as dat from 'dat.gui';


const gui =new dat.GUI();
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}
const wave = {
  y : canvas.height/2,
  length : 0.01,
  amplitude : 100
}
gui.add(wave,'y',0,canvas.height); 


const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];


c.beginPath();
c.moveTo(0,canvas.height/2);
for(let i = 0;i < canvas.width;i++){
  c.lineTo(i,canvas.height/2 + Math.sin(i * 0.01) * 100);
}

c.stroke();
