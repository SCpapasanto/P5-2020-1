let table;

let rowCount;

let datoSuba =0;

let maxDato =0;

let suba=[];

let subaDefinitivo=0;

let calidadDatoSuba=[];

let kennedy=[];

let kennedyDefinitivo=0;

let calidadDatoKennedy=[];

let fontibon=[];

let fontibonDefinitivo=0;

let calidadDatoFontibon=[];

let lasFerias=[];

let lasFeriasDefinitivo=0;

let calidadDatoLasFerias=[];

let promedio = [];

let calidadDatoPromedio = [];

let promedioDefinitivo =0;

let promedi

let tiempo=[];

let mapeoTamaño=[];

let tiempito=[];

let nube;

let fuente;


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
   	  suba[i] = row[i].getNum("suba");
      calidadDatoSuba[i] = new escala(-220, 200, suba[i], "Suba");
      kennedy[i] = row[i].getNum("kennedy");
      calidadDatoKennedy[i] = new escala(-80, 200, kennedy[i], "Kennedy");
      fontibon[i] = row[i].getNum("fontibon");
      calidadDatoFontibon[i] = new escala(60, 200, fontibon[i], "Fontibón");
   	  lasFerias[i] = row[i].getNum("lasFerias");
      calidadDatoLasFerias[i] = new escala(200, 200, lasFerias[i], "Las Ferias");
      tiempo[i] = row[i].getString("tiempo");
      promedio[i] = ((suba[i] + kennedy[i] + fontibon[i] + lasFerias[i]) / 4);
      calidadDatoPromedio [i] = new escala(-260,-120, int(promedio[i]), "Promedio")
   	  mapeoTamaño[i] = map(promedio[i], 42, 56, 1, 1.5);
   	  tiempito[i] = new miTexto(-260, -50, 30, tiempo[i]);
      
console.log(promedio[0]);

 datoSuba = suba;
    if (datoSuba > maxDato)
    {
      maxDato = datoSuba;
    }
//console.log(datoSuba);

if(promedio[i] <= 40){
   relleno = 255;
  } else if (promedio[i] >= 45 && promedio[i] <=50 ){
    relleno = 180;
  } else if(promedio[i] >= 51 && promedio[i] <=60){
    relleno = 60;
  } 
}



slider = createSlider(0, (suba.length-1), 0, 1);
slider.position(150, 590);
slider.style('width', '400px');
console.log(suba.length);

  


}



function draw() {
  background(250);
  fill(0);
  //rect(-500,-300,width, height);
  
let valSlider;
ambientLight(60, 60, 60);

  
  valSlider = slider.value();
  	for (var i = 0; i < suba.length; i++) {
  		switch(valSlider){
	case i:
	promedioDefinitivo = mapeoTamaño[i];
	//console.log(suba[i]);
    tiempito[i].dibujo();
    calidadDatoSuba[i].dibujo();
    calidadDatoKennedy[i].dibujo();
    calidadDatoFontibon[i].dibujo();
    calidadDatoLasFerias[i].dibujo();
    calidadDatoPromedio[i].dibujo();
    push();
    translate(100,-100, 10);
    scale(promedioDefinitivo); // Scaled to make model fit into canvas
  rotateY(frameCount * promedioDefinitivo/80);
  noStroke();
console.log(promedioDefinitivo);
  
  fill(int(promedioDefinitivo+260));
//fill(relleno);
  model(nube);
  pop();
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
    /*if(texto <= 45){
  fill(105, 214, 62);
} else if(texto >= 46 && texto <= 60){
  fill(222, 224, 70);
} else if(texto >=61 && texto <= 80){
  fill(224, 149, 58);
} else if(texto >= 81){
    fill(224, 58, 58);
}*/
 

    textFont(fuente);
    fill(0);
    textSize(this.size);  
    textAlign(CENTER);   
    text(this.texto, this.posX, this.posY);
    
    
  }
}

class escala
{
  constructor(posX,posY,valor,localidad){
    this.posX = posX;
    this.posY = posY;
    this.valor = valor;
    this.localidad = localidad;
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
     pointLight(r-20, g-20, 0, locX, locY, 80);
     textFont(fuente);
     fill(r,g,0);
     
     ellipse( this.posX, this.posY-10, 100,100 );
     fill(0);
     text(this.valor,this.posX, this.posY);
     text(this.localidad, this.posX, this.posY-80);
     
  }
}



