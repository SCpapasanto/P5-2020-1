let x = 1;
let y = 1;
let r = 0;
let g =0;
let b = 0;
let colorPicker;


let easing = 0.5;
let msg = "BLACK";



function setup() {
  createCanvas(1020, 580);
  noStroke();
   colorPicker = createColorPicker('#ffffff');
  colorPicker.position(20, height + 5);
  colorPicker.style('width', '980px');
  
}

function draw() {
  background(r,g,b);
  let d = day();
  let m = month();
  let ano = year();
  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * easing;

  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * easing;

fill(250);
textSize(32);
text(msg,20,30);
textSize(12);
text("¿R, G o B?",20, 50);
  fill(250,250,250)
  text("Click izquierdo para círculo",150,15)
  text("Click izquierdo para rectángulo",150,32)
  text("Usa el Scroll para alterar la opacidad", 330, 25);
  
text('Hoy es: ' + d + '/' + m + "/" + ano, 585, 25);
 
  text("Mueve el ratón para llenar el círculo", 10, 310);
fill(colorPicker.color());
arc(50, 150, 80, 80, 0, targetX/120, PIE);
arc(50, 250, 80, 80, 180, targetY/80, PIE);


if (mouseIsPressed) {
    if (mouseButton === LEFT) {

      ellipse(targetX, targetY, targetX/5, targetY/5);

    }
    if (mouseButton === RIGHT) {
      rect(targetX, targetY, targetX/5, targetY/5);
    }
  
  }

 
}

function keyTyped(){
 if (key === 'r') {
   r=250;  g=0; b=0; 
   msg="RED";
   
} else if(key === 'g'){
  r=0; g=250; b=0;
  msg="GREEN";
} else if (key === 'b'){
  r=0; g=0; b=250; 
  msg="BLUE";
}
if (key === 'n'){
  r=0; g=0; b=0;
  msg="BLACK";
}


}

function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  r -= event.delta;
  g -= event.delta;
  b -= event.delta
  }
/*
  if (mouseIsPressed){
    background(250, 250, 250);
fill(250,50,50, targetX)
ellipse(x,y,70,70);
   
       ellipse(x-50,y+50,20,20)
      
  } */

