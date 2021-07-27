'use strict';
let canvas;
let canvasContext;
let rimuruX =  50;
let rimuruSpeedX = 15;



window.onload = function() {
 canvas = document.getElementById('gameCanvas');
 canvasContext = canvas.getContext('2d');

 let framesPerSecond = 30;
 setInterval(function() {
        canvasMove();
        canvasDraw();
 }, 1000/framesPerSecond);
}

function canvasMove(){
  rimuruX += rimuruSpeedX;
  if(rimuruX >= canvas.width){
    rimuruSpeedX = -rimuruSpeedX;
  }

  if(rimuruX < 0) {
    rimuruSpeedX = -rimuruSpeedX;
  }
}

function canvasDraw(){
  colorRect(0,0,canvas.width,canvas.height,'black');

  // Food
  colorRect(120, 210, 15,15,'green');

  // Rimuru Tempest
  canvasContext.fillStyle = 'blue';
  canvasContext.beginPath();
  canvasContext.arc(rimuruX, 180, 15, 0, Math.PI*2, true);
  canvasContext.fill();
}




function colorRect(leftX,topY, width,height, drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY, width,height);
}