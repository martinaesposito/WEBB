let cnv

let rotx= 0;

let smallstars = [];
let stars = [];

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



function setup() {
    cnv= createCanvas(windowWidth, windowHeight);

    ctx = cnv.drawingContext;
    ellipseMode(CENTER)
    imageMode(CENTER);
    pixelDensity(1)

    addEventListener("resize", (event) => {
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
        var x = (windowWidth - cnv.width) / 2;
        var y = (windowHeight - cnv.height) / 2;
        resizeCanvas(window.innerWidth, window.innerHeight);
      });

    sfondo= loadImage('./assets/potm2302a.png')

    galassia= loadImage('./assets/galassia1-assets/galaxy.png')
    galassia2= loadImage('./assets/galassia2-assets/galassia2.png')
    galassia3= loadImage('./assets/galassia3-assets/galassia3.png')
    
    geme1= loadImage('./assets/gemelle-assets/geme1.png')
    geme2= loadImage('./assets/gemelle-assets/geme2.png')

    //stelle
	for(let i = 0; i < width/3 ;i++){
		stars.push(new Star());
	}

    //stelline
	for(let i = 0; i < width ;i++){
	smallstars.push(new SmallStar());
	}

}

function draw(){
    background(0)

	pop()
    imageMode(CENTER)
    image(sfondo,sfondo.width*0.4/2, sfondo.height*0.4/2-550, sfondo.width*0.4, sfondo.height*0.4)
push()

    image(galassia,180, 0, galassia.width*0.3, galassia.height*0.3)

    push()
    image(galassia2,1000, 120, galassia2.width*0.8/3, galassia2.height*0.8/3)
    pop()
    
    image(galassia3,1100, height-50, galassia3.width*0.6/2, galassia3.height*0.6/2)
    

//stelle
	for(let i = 0;i<stars.length;i++) {
		stars[i].createStar();
		stars[i].moveStar();
		stars[i].joinStars(stars.slice(i));
		stars[i].mouseStars(stars.slice(i));
		}
        pop()

	// GEMELLE
	push()
	translate (width/2 -geme1.width/4+50, height/2);
	rotx+= 0.05;
	rotate(rotx/10);
	image(geme1,0, 0, geme1.width, geme1.height)
	pop()

	push()
	translate (width/2+geme2.width/4+50, height/2);
	rotx+= 0.05;
	rotate(-rotx/8);

	image(geme2,0, 0, geme2.width, geme2.height)
	pop()
	
//stelline
for(let i = 0;i<smallstars.length;i++) {
	smallstars[i].createSmallStar();
	smallstars[i].moveSmallStar();
	}

	push()
for(let i = 0;i<smallstars.length;i++) {
	smallstars[i].createSmallStar();
	smallstars[i].moveSmallStar();
	}

}