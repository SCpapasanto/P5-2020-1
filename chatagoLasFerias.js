let table;

let rowCount;

let datoLasFerias =0;

let maxDato =0;

let lasFerias=[];

let lasFeriasDefinitivo=0;

let tiempo=[];

let mapeoTamaño =[];

let tiempito=[];

let nube;

let fuente;

let calidadDato=[];

function preload(){
	table = loadTable("assets/aire.csv", "header");
  nube = loadModel('assets/miNube.obj', true);
  fuente = loadFont('assets/Futura.otf');
}

function setup() {
	createCanvas(720,600, WEBGL);

   rowCount = table.getRowCount();
   const row = table.getRows(); 

  for (let i = 0; i < rowCount; i++) {
   	  lasFerias[i] = row[i].getNum("lasFerias");
   	  tiempo[i] = row[i].getString("tiempo");
   	  mapeoTamaño[i] = map(lasFerias[i], 32, 48, 1, 2);
   	  tiempito[i] = new miTexto(-230, 120, 30, tiempo[i]);
      calidadDato[i] = new escala(-230, 40, lasFerias[i]);


 datoLasFerias = lasFerias;
    if (datoLasFerias > maxDato)
    {
      maxDato = datoLasFerias;
    }
console.log(datoLasFerias);
}

slider = createSlider(0, (lasFerias.length-1), 0, 1);
slider.position(40, 480);
slider.style('width', '200px');

console.log(lasFerias.length);



}

function draw() {

  background(250);
ambientLight(60, 60, 60);

let valSlider;
  
  valSlider = slider.value();
  	for (var i = 0; i < lasFerias.length; i++) {
  		switch(valSlider){
	case i:
	lasFeriasDefinitivo = mapeoTamaño[i];
	console.log(lasFerias[i]);
    tiempito[i].dibujo();
    calidadDato[i].dibujo();
    translate(100,0, 10);
    scale(lasFeriasDefinitivo); // Scaled to make model fit into canvas
  rotateY(frameCount * lasFeriasDefinitivo/80);
  noStroke();
  fill(lasFeriasDefinitivo+120);
  model(nube);
  		}
  	}


  }

//textoTiempo[i].dibujar();




class miTexto
{
  //se determinan los variables del objeto
  constructor(posX, posY, size, texto)
  {
    this.posX = posX;
    this.posY = posY;
    this.size = size;
    this.texto = texto;
  }

  dibujo()
  {
    textFont(fuente);
    fill(0);
    textSize(this.size);  
    textAlign(CENTER);   
    text(this.texto, this.posX, this.posY);
    text("Calidad del Aire: Las Ferias", -220, -100);
  }
}
class escala
{
  constructor(posX,posY,valor){
    this.posX = posX;
    this.posY = posY;
    this.valor = valor;
  }

  dibujo()
  { 
    let r=0;
    let g=0;
    
    
    if(this.valor <= 55){
      r=0;g=255;
    } else if (this.valor >= 56 && this.valor <= 65){
      r=255; g=250; 
    } else if (this.valor >= 66 && this.valor <= 75){
      r=255; g=170;
    } else if (this.valor >= 76){
      r=255; g=0; 
    } 
    let locX = mouseX - height / 2;
     let locY = mouseY - width / 2;
     pointLight(r-20, g-20, 0, locX, locY, 500);
     textFont(fuente);
     fill(r,g,0);
     ellipse( this.posX, this.posY-10, 50,50 );
     fill(0);
     text(this.valor,this.posX, this.posY);
     
     
  }
}