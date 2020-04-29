//crea una tabla que guarda los datos del archivo .csv
let table;

//numero de filas en el archivo
let rowCount;

//variable que guarda el dato
let datoSuba=0;

//variable que guarda el dato máximo
let maxDato=0;

//se crea un arreglo del texto del tiempo que se coloca en el eje x del diagrama
let textoTiempo = [];

//se crea un arreglo para el diagrama de circulos
let diagramaCirculos = [];

//se crea un arreglo para el diagrama de barras
let diagramaBarras = [];

let diagramaFigura = [];

//Localidad
let localidad = "suba"

let colorcito;

// Put any asynchronous data loading in preload to complete before "setup" is run
function preload()
{
  //carga el archivo y tiene en cuenta el titulo de las columnas
  table = loadTable("assets/aire.csv", "header");
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    localidad = "suba";
  } else if (keyCode === RIGHT_ARROW) {
    localidad = "kennedy";
  }
}

function setup()
{
  createCanvas(600,400);
 
  //numero de filas en el archivo
  rowCount = table.getRowCount();

  //creamos un objeto que guarda la información de las filas de la tabla
  const row = table.getRows();  

  for (let i = 0; i < rowCount; i++)
  {
    //guardamos la información de la fila "x" en una constante
    const tiempo = row[i].getString("tiempo");
    //guardamos la información de la fila "y" en una constante
    const Suba = row[i].getNum(localidad);
   
   
    //se determina el valor máximo de toda la columna de Suba
    datoSuba = Suba;
    if (datoSuba > maxDato)
    {
      maxDato = datoSuba;
    }

    //se determina las posX y posY para ubicar posteriormente el texto del tiempo sobre el eje x del diagrama
    //se replican las lineas 14 veces, en las pocisiones dentro del espacio del diagrama
    let x = map(i, 0, rowCount-1, 55, 475); //desde la 0 hasta la 13
    let y = 310;
     
    //Adiciono al arreglo un objeto de tipo textoEje, donde inicializo el objeto creando el texto
    textoTiempo.push(new textoEje (x,y,tiempo));

     }

  console.log(maxDato);

  for (let i = 0; i < rowCount; i++)
  {
    //guardamos la información de la fila "y" en una constante
    const Suba = row[i].getNum(localidad);
   
    //se determina las posX y posY para ubicar posteriormente el texto del tiempo sobre el eje x del diagrama
    //se replican las lineas 14 veces, en las pocisiones dentro del espacio del diagrama
    let x = map(i, 0, rowCount-1, 55, 475); //desde la 0 hasta la 13
   
    //se mapean los datos de Suba acorde a la altura del diagrama
    let ySuba = map(Suba, 0, maxDato, 300, 100);

    //Adiciono al arreglo un objeto de tipo circulo, donde obtiene los datos de Suba para dibujarlos en forma de circulo

     diagramaFigura.push(new figura (x,ySuba));

    diagramaCirculos.push(new circulo (x,ySuba));

    //Adiciono al arreglo un objeto de tipo circulo, donde obtiene los datos de Suba para dibujarlos en forma de circulo
    diagramaBarras.push(new barra (x,ySuba));

   

    colorPicker = createColorPicker('#48BAFF');
  colorPicker.position(20, height + 5);
  colorPicker.style('width', '550px');

  }

  background(0);

}


function draw()
{
  //cuadro gris de contexto en donde se colocan los valores
  fill(100);
  rect(0, 70, 560, 242);

  //cuadro blanco en donde se coloca el digrama de curvas
  fill(255);
  rect(55, 80, 420, 220);

  //lineas veticales, cada linea es un dato del archivo que se dibujará en el espacio
  strokeWeight(1);
  stroke(0);

  

  //son las lineas horizonales correspondiente a el max dato dividido la cantidad de lineas que quiero ver  
  //13121911/8 = 1640238
  //2000000
  for (let i = 0; i < maxDato; i+=10)
  {
      //se replican las lineas, en las pocisiones dentro del espacio del diagrama
      let y = map(i, 0, maxDato, 300, 80);
      line(55, y, 475, y);
     
      //texto con el valor de cada linea
      fill(255);
      //se coloca el texto en cada linea
      text(i, 25, y);
  }  


  //se recorre la cantidad de textoEje, que es lo mismo que recorrer la cantidad de datos
  //for (let i = 0; i < textoEje.length; i++)
  for (let i = 0; i < rowCount; i++)
  {
    //se replican las lineas 14 veces, en las pocisiones dentro del espacio del diagrama
    let x = map(i, 0, rowCount-1, 55, 475); //desde la 0 hasta la 13
    //lineas verticales
    line(x, 80, x, 300);

    //recorre el for y coloca el texto del tiempo correspondiente a la ubicación en el que se guardo en el arreglo
    textoTiempo[i].dibujar();

    //recorre el for y coloca el rectangulo correspondiente a la ubicación en el que se guardo en el arreglo
    diagramaBarras[i].dibujar();

    //recorre el for y coloca el circulo correspondiente a la ubicación en el que se guardo en el arreglo
    //diagramaCirculos[i].dibujar();

    diagramaFigura[i].dibujar();
   
  }
 
}


// clase textoEje
class textoEje
{
  //se determinan los variables del objeto
  constructor(posX, posY, texto)
  {
    this.posX = posX;
    this.posY = posY;
    this.texto = texto;
  }

  dibujar()
  {
    fill(255);
    textSize(7);  
    textAlign(CENTER);  
    text(this.texto, this.posX, this.posY);
  }
}

class barra
{
  constructor(posX, posY)
  {
    this.posX = posX;
    this.posY = posY;
  }

  dibujar()
  {
    strokeWeight(1);
stroke(51);
    fill(colorPicker.color());
    rect(this.posX-5,this.posY,10,300-this.posY);
  }
}



class circulo
{
  constructor(posX, posY)
  {
    this.posX = posX;
    this.posY = posY;
  }

  dibujar()
  {
    fill(0,0,255);
    ellipse(this.posX,this.posY,10,10);
  }
}

class figura
{
  constructor(posX, posY)
  {
    this.posX = posX;
    this.posY = posY;
  }
  dibujar()
  {
    
    strokeWeight(1);
    fill(255);
 ellipse(this.posX,this.posY,30,15);
  fill(colorPicker.color());
  noStroke();
 ellipse(this.posX,this.posY,15,15);
 fill(0);
 ellipse(this.posX,this.posY,5,5);
  }
}

