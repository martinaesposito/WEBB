let cnv
let ctx

let rotx=0;
let stellina;
let stelline= [];

let smallstars = [];

let stars = [];
let stars2= [];
let r;
let stars3= [];
let speed;
let colour;

let inc = 0.01;

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

    pixelDensity(1)

    addEventListener("resize", (event) => {
        //console.log("ridimensiono")
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
        var x = (windowWidth - cnv.width) / 2;
        var y = (windowHeight - cnv.height) / 2;
        resizeCanvas(window.innerWidth, window.innerHeight);
      });

    ctx = cnv.drawingContext;

    ellipseMode(CENTER)

    //loadImage('/sketches/universe/assets/campoprofondojw.jpg',  img => { image(img,0,-900,windowWidth,img.height) })

    campoprofondojw= loadImage('/sketches/universe/assets/campoprofondojw.jpg')
    stellina= loadImage('/sketches/universe/assets/campoprofondojw-assets/stellina.png')
    gemelle= loadImage('/sketches/universe/assets/campoprofondojw-assets/gemelle.png')
    esplosa= loadImage('/sketches/universe/assets/campoprofondojw-assets/rossaesplosa.png')
    lingua= loadImage('/sketches/universe/assets/campoprofondojw-assets/linguarossa.png')
    stellona= loadImage('/sketches/universe/assets/campoprofondojw-assets/stellagrande.png')
    sfondo= loadImage('/sketches/universe/assets/campoprofondojw-assets/sfondo.png')
    piccolissime= loadImage('/sketches/universe/assets/campoprofondojw-assets/piccolissime.png') 
    biancatonda= loadImage('/sketches/universe/assets/campoprofondojw-assets/biancatonda.png')
    biancapiccola= loadImage('/sketches/universe/assets/campoprofondojw-assets/biancapiccola.png')
    mulinellomini= loadImage('/sketches/universe/assets/campoprofondojw-assets/mulinellomini.png')
    trittico= loadImage('/sketches/universe/assets/campoprofondojw-assets/trittico.png')
    linguone= loadImage('/sketches/universe/assets/campoprofondojw-assets/linguone.png')
    grumino= loadImage('/sketches/universe/assets/campoprofondojw-assets/grumino.png')
    
    //STELE NUOVE
    for(let i = 0; i < 1000; i++){
    stars.push(new Star(random(0, 0), random(0,0)));
    }

    for(let i = 0; i < 500; i++){
      stars3.push(new Star(random(-width, width), random(-height,height)));
      }

      //stelline
	for(let i = 0; i < width ;i++){
    smallstars.push(new SmallStar());
    }

    

}

document.addEventListener("click", function(){
    stars2.push(new Star(mouseX, mouseY))//al click aggiungo una stellina all'array
})

function draw(){
  background("#161415")
  
  image(sfondo,0,0,sfondo.width,sfondo.height)

  push()
  imageMode(CENTER)
  image(campoprofondojw,campoprofondojw.width/2,campoprofondojw.height/2,campoprofondojw.width,campoprofondojw.height)
  pop()
  

    speed = map (mouseX, 0, width, 2,5);
    colour = random()

  //STELLINE MOUSE
  push()
  colour="white"
  for(let i = 0; i < stars2.length; i++){
  stars2[i].displayR();
  }
  pop()

  //STELLINE FERME
  push()

  translate(width/2, height/2);
  rotx+= 0.000001;
  rotate(-rotx/10);
  for(let i = 0; i < stars3.length; i++){
  stars3[i].displayR();
  }
  pop()


  push()
    image(stellina,1000,100,stellina.width,stellina.height)
    image(stellina,400,580,stellina.width/2,stellina.height/2)
    image(gemelle,1200,550,gemelle.width,gemelle.height)
    image(lingua,400,650,lingua.width,lingua.height)
    image(esplosa,200,300,esplosa.width,esplosa.height)
    image(stellona,100,-350,stellona.width,stellona.height)
    image(piccolissime,80,350,piccolissime.width,piccolissime.height)
    image(biancatonda,1500,50,biancatonda.width,biancatonda.height)
    image(biancapiccola,150,500,biancapiccola.width,biancapiccola.height)
    image(mulinellomini,1500,500,mulinellomini.width,mulinellomini.height)
    image(trittico,1130,180,trittico.width,trittico.height)
    image(linguone,820,60,linguone.width,linguone.height)
    image(grumino,520,450,grumino.width,grumino.height)
  pop()

    //PALLA FUMATA DIETRO
    push()
    noStroke()
    fill(255)
    ctx.filter = 'blur(50px)';    
    translate (width/2, height/2);
    rotx+= 0.01;
    rotate(-rotx);
    ellipse(0,0, 500, 10)
  pop()

    //PALLA FUMATA DIETRO ANCORA
    push()
    noStroke()
    fill(255)
    ctx.filter = 'blur(150px)';    
    translate (width/2, height/2);
    rotx+= 0.01;
    rotate(rotx/2);
    ellipse(0,0, 1000, 50)
  pop()

  //PALLA CENTRALE
  push()
    noStroke()
    fill(255)
    ctx.filter = 'blur(25px)';
    ellipse(windowWidth/2,windowHeight/2, 100, 60)
  pop()

  //STELLINE ANIMATE
  push()
    translate(width/2, height/2);
    rotx+= 0.000001;
    rotate(rotx/10);
    colour= "white"
    for(let i = 0; i < stars.length; i++){
    stars[i].update();
    stars[i].display();
    }
  pop()

  //stelline
	for(let i = 0;i<smallstars.length;i++) {
		smallstars[i].createSmallStar();
		smallstars[i].moveSmallStar();
		}
  //granulate(2)

}

document.addEventListener("click", function(){
  push()
  noStroke()
  fill(255)
  ctx.filter = 'blur(1px)';
  ellipse(mouseX, mouseY, 10)
  pop()
})


class Star {
    constructor(x,y) {
      this.x = x
      this.y = y
      this.z = random(width)
    }
  
    update() {
      this.z = this.z - speed;
      if(this.z <1) {
        this.z = width;
        this.x = random(-width, width)
        this.y = random (-height, height)
      }
    }
  
    display() {
      fill(colour)
      noStroke()
      
      let sx = map(this.x/this.z, 0, 1, 0, width)
      let sy = map(this.y/this.z, 0, 1, 0, height)
  
      let r = map(this.z, 0, width, 10, 1)
  
      ellipse(sx, sy, r, r)
    }

    displayR(){
      push()
      
      //ctx.filter = 'blur(3px)';
      colour="FFE965"
      r= random(3,4);
      ellipse(this.x, this.y, r)
      pop()
    }
  
  }
  
  //EFFETTO GRANA
  function granulate(amount) {
    loadPixels();
    const d = pixelDensity();
    const pixelsCount = 4 * (width * d) * (height * d);
    for (let i = 0; i < pixelsCount; i += 4) {
        const grainAmount = random(-amount, amount);
        pixels[i] = pixels[i] + grainAmount;
        pixels[i+1] = pixels[i+1] + grainAmount;
        pixels[i+2] = pixels[i+2] + grainAmount;
        pixels[i+3] = pixels[i+3] + grainAmount;
    }
    updatePixels();
}


/*
https://www.fxhash.xyz/generative/slug/retrospect§
https://editor.p5js.org/denaplesk2/sketches/Hy0YUvH2b
*/