
//CLASSI

//stelle
class Star {
	constructor(){
		this.x = random(0,width);
		this.y = random(0,height);
		this.r 

		this.hue = 0;
		this.brgt = random(90,100);
		this.sat = random(0,10)
		this.alph = random(0,100);

		this.xSpeed = random(-0.3,0.3);
		this.ySpeed = random(-0.3,0.3);
	}

	createStar() {
		noStroke();
		colorMode(HSB,360,100,100,100);
		fill(this.hue,this.sat,this.brgt,this.alph);
		circle(this.x,this.y,this.r);
	}
  
	moveStar() {
		if (this.x < 0 || this.x > width)
//test per controllare che la stella rimanga entro i bordi della canvas
//se tocca il bordo moltiplica la velocità per -1 e inverte la direzione
			this.xSpeed*=-1;
		if (this.y < 0 || this.y > height)
			this.ySpeed*=-1;

			this.x+=this.xSpeed;
			this.y+=this.ySpeed;
	}
  
// funzione che crea connessioni tra particelle che abbiamo una certa distanza tra di loro (40)
	joinStars(stars) {
//per ciascun elemento dell'array stars chiamo una funzione 
		stars.forEach(element =>{
//definisco una variabile che calcola la distanza tra due punti dell'array
		let dis = dist(this.x,this.y,element.x,element.y);

//la distanza viene sempre calcolata e quando è inferiore a 40 allora viene disegnata una linea
		if (dis < 40) {
				strokeWeight(0.15);
				stroke(100,0,100,100);
				line(this.x,this.y,element.x,element.y)
				}
		});
	}

//funzione che illumina le particelle su cui il mouse fa hover
//la logica con cui viene chiamata è la stessa della funzione che crea la linee
	mouseStars(stars) {
		stars.forEach(element =>{
		let disM = dist(this.x,this.y,mouseX,mouseY);

			if (disM < 30) {
				this.r = random(1,3)+5;
				
				this.brgt = random(0,10)+90;
				
				this.alph = random(90,100);
			} 
			else if (disM < 150) {
				this.r = random(1,3)+2;

				this.hue = random(35,40)
				this.sat = random(0, 50)
			} 
			else {
				this.r = random(1,3)+1;
				}
		});
	}
}


//stelline
class SmallStar {
	constructor(x, y) {
		this.x = random(0,width);
		this.y = random(0,height);
		this.r = random(0.1, 1.5);
		this.xSpeed = random(-0.5, 0.5);
		this.ySpeed = random(-0.5, 0.5);
		}
  
	createSmallStar() {
		noStroke();
		fill("white");
		circle(this.x,this.y,this.r);
		}

	moveSmallStar() {
		if (this.x < 0 || this.x > width)
			this.xSpeed*=-1;
		if (this.y < 0 || this.y > height)
			this.ySpeed*=-1;

			this.x+=this.xSpeed;
			this.y+=this.ySpeed;
		}
	}	



//ARRAY E VARIABILI GLOBALI

let stars = [];
let smallstars = [];

let loadedPlanets = []
let planets = []
let bgImg, cnv, ctx;

function preload() {
  let planetsUrl = [
    "/sketches/solarsystem/assets/2.png",
    "/sketches/solarsystem/assets/1.png",
    "/sketches/solarsystem/assets/3.png",
    "/sketches/solarsystem/assets/7.png",
    "/sketches/solarsystem/assets/4.png",
    "/sketches/solarsystem/assets/6.png",
    "/sketches/solarsystem/assets/sun.png",
  ]

  bgImg = loadImage("/sketches/solarsystem/assets/weic2214d.jpg")

  for (let i = 0; i < planetsUrl.length; i++) {
    let planet = loadImage(planetsUrl[i])
    loadedPlanets.push(planet)
  }
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  imageMode(CENTER)

  //stelle
	for(let i = 0; i < width/3 ;i++){
		stars.push(new Star());
	}

//stelline
	for(let i = 0; i < width ;i++){
	smallstars.push(new SmallStar());
	}
  
  for(let i = 0; i < loadedPlanets.length; i++) {
    let offset = map(i, 0, loadedPlanets.length, width/2, width)
    planets.push(new Planet(offset, height/2, i))
  }

}

function draw() {

  image(bgImg, bgImg.width/2, bgImg.height/2, bgImg.width*1.2, bgImg.height*1.2);

  //stelle
	for(let i = 0;i<stars.length;i++) {
		stars[i].createStar();
		stars[i].moveStar();
		stars[i].joinStars(stars.slice(i));
		stars[i].mouseStars(stars.slice(i));
		}
//stelline
	for(let i = 0;i<smallstars.length;i++) {
		smallstars[i].createSmallStar();
		smallstars[i].moveSmallStar();
		}
    
  for(let i = 0; i < loadedPlanets.length; i++) {
    planets[i].move()
  }

  planets.sort((a, b) => {
    return a.y - b.y;
  });

}


class Planet {

  //define constructor (executed once like setup)
  constructor(xpos, ypos, index) {
    this.x = xpos;  //this refers to the single instance we are contructing
    this.y = ypos;
    this.i = index;
  }

  //define methods

  move() {

    //POSIZIONE FISSA DEL SOLE
    if (this.i == loadedPlanets.length - 1) {this.x = width/2; this.y = height/2}
    else {
    this.x = width/2 + width/(this.i +1)/2.5 * cos(frameCount/((2/(this.i+1)) * 100)) 
    this.y = height/2 + height/(this.i +1)/2.5 * sin(frameCount/((2/(this.i+1)) * 100))
    }

    //if (this.i == 4) {console.log(this.x, this.y)}
    ctx = cnv.drawingContext;
    push();

    let scale 


    //SCALA FISSA DEL SOLE
    if (this.i == loadedPlanets.length - 1) {scale = 10}
    else {
    scale = map(this.y, height/2 - height /3, height/2 + height/3, 1, 3);
    }
    

    translate(this.x, this.y);

    //EFFETTO BLUR
    let blur = map(this.y, height/1.7, height, 0, 10, true)
    ctx.filter = 'blur(' + blur + 'px)';
    

    image(loadedPlanets[this.i], 0, 0, scale * 100 / (this.i+1), scale * 100 / (this.i+1));
    
    pop()

    
  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}