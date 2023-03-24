let rotx=0;

// let nbPlanets = 8;
// let planets = [];
// let speedMin = 0.4;
// let speedMax = 2;
// let trails = 64;

let stars = [];
let stars2= [];
let r;
let stars3= [];
let speed;
let colour;

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

let smallstars = [];

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


function setup() {
	cnv= createCanvas(windowWidth, windowHeight);
    
    ctx = cnv.drawingContext;
    noStroke()

    sfondo= loadImage('/sketches/blackholes/assets/weic2208a.png')
    
    buconero1= loadImage('/sketches/blackholes/assets/buconero2.png')
    buconero2= loadImage('/sketches/blackholes/assets/STScI-01FJHRDGBN9KP7BTD0Q03487ER-assets/buconero.png')

    addEventListener("resize", (event) => {
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
        var x = (windowWidth - cnv.width) / 2;
        var y = (windowHeight - cnv.height) / 2;
        resizeCanvas(window.innerWidth, window.innerHeight);
      });

    //   for (i = 0; i < nbPlanets; i++) {
    //     let pPlanet = new Planet();
    //     planets.push(pPlanet);
    //   }
    //   pop()
        
    //STELLE NUOVE
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

function draw() {
    push()
    imageMode(CENTER)
    translate (width/2, height/2);
    rotx+= 0.01;
    rotate(-rotx/50);
    image(sfondo,80,130, sfondo.width/2.2, sfondo.height/2.2)
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
    

     //PALLA FUMATA DIETRO
     push()
     noStroke()
    fill("brown")
     ctx.filter = 'blur(200px)';    
     ellipse(width/2,height/2, 300, 300)
     pop()

    push()
    imageMode(CENTER)
    translate (width/2, height/2);
    rotx+= 0.01;
    rotate(-rotx);
    image(buconero1,0,0, buconero1.width*0.7, buconero1.height*0.7)
    pop()

    push()
    imageMode(CENTER)
    translate (width/2-30, height/2);
    rotx+= 0.01;
    rotate(-rotx/5);
    image(buconero2,0,0, buconero2.width*1.2, buconero2.height*1.2)
    pop()

    // push()
    // translate(width / 2, height / 2);
    // for (i = 0; i < planets.length; i++) {
    // push();
    // rotate(planets[i].orbitAngle);
    // //    ellipse(0, 0, planets[i].orbitX * 2, planets[i].orbitY * 2);
    // for (j = 1; j < trails + 1; j++) {
    //   let colooor = planets[i].color;
    //   colooor.setBlue(j * 1.5);
    //   colooor.setGreen(j * 1.5);
    //   colooor.setAlpha((255 / trails) * j);
    //   fill(colooor);
    //   circle(
    //     cos(planets[i].planetAngle - 1.5 * (trails - j) * planets[i].dir) *
    //       planets[i].orbitX,
    //     sin(planets[i].planetAngle - 1.8 * (trails - j) * planets[i].dir) *
    //       planets[i].orbitY,
    //     (planets[i].size / trails) * j
    //   );
    //   fill(random(200,255), random(100,255),0,2);
    //   push();
    //   rotate(random(180))
    //   ellipse(random(-10,10), random(-10,10), random(10,120), random(10,60))
    //   pop();
    // }
    // planets[i].planetAngle += planets[i].speed * planets[i].dir;
    // planets[i].orbitAngle += planets[i].speed / 50;
    // pop();
    // }
    // pop()
    
    //PIANETINI
    push()
	planet(width/2, height/2, 400)
    pop()

     //PALLA FUMATA DIETRO
     push()
     noStroke()
    fill(0)
     ctx.filter = 'blur(70px)';    
     ellipse(width/2,height/2, 300, 300)
     pop()

     //stelline
	for(let i = 0;i<smallstars.length;i++) {
		smallstars[i].createSmallStar();
		smallstars[i].moveSmallStar();
		}
        
     //PALLA FUMATA DIETRO
    push()
    noStroke()
    fill(0)
    ctx.filter = 'blur(30px)';    
    ellipse(width/2,height/2, 100, 100)
    pop()

    //PALLA FUMATA DIETRO
    push()
    noStroke()
    fill(0)
    ctx.filter = 'blur(15px)';    
    ellipse(width/2,height/2, 100, 100)
    pop()
}

// class Planet {
//     constructor() {
//       this.orbitX = random(60, width / 2 - 20);
//       this.orbitY = random(60, height / 2 - 20);
//       this.orbitAngle = random(0, 90);
//       this.planetAngle = random(0, 360);
//       this.speed = random(speedMin, speedMax);
//       this.dir = 2 * round(random()) - 1;
//       this.size = random(10, 40);
//       this.color = color(random(50, 150), 0, random(150, 255));
//     }
//   }
  
function planet(x, y,r=2){
	push()
	translate(x, y)
	let lastX, lastY, last
	for (var i=0; i<10; i++){
		//let cc = colorBlues[int(noise(frameCount/10,i)*colorBlues.length)%colorBlues.length]
		fill("white")
		
		drawingContext.shadowColor = color("gold");
		drawingContext.shadowBlur = 5;
		let xx = noise(i*2, frameCount/100+mouseX/500)*r*noise(i)*2
		let ang = noise(i, frameCount/800+mouseY/1000, 500)*10*PI
		let rr = noise(i, 500, frameCount/50+mouseY/500)*50*(10/(sqrt(xx)+1))
	  ellipse(xx*cos(ang), xx*sin(ang), sin(ang)+rr/2)*2000
    ellipse(xx*cos(ang*2), xx*sin(ang*2), rr/2+noise(i)*2)*200
		ellipse(xx*cos(ang*4), xx*sin(ang*4), rr/2)*15
		
	
		//let cc2 = colorReds[int(noise(frameCount/100,i)*colorBlues.length)%colorBlues.length]
		fill(255)
		
		drawingContext.shadowColor = color("gold");
		let xx2 = noise(i*2, frameCount/1000+mouseX/500)*r*noise(i)*2
		let ang2 = noise(i, frameCount/1000+mouseY/1000, 500)*10*PI
		let rr2 = noise(i, 500, frameCount/50+mouseY/500)*50*(10/(sqrt(xx)+1))
	  ellipse(xx*cos(ang2), xx*sin(ang2), sin(ang2)*rr/2)
    ellipse(xx*cos(ang2*2), xx*sin(ang2*2), rr2/2+noise(i))*xx*sin(ang2)
		ellipse(xx*cos(ang2*2), xx*sin(ang2*2), rr2)*rr2/4*3
}
pop()
}

function keyPressed(){
    save("img_" + month() + '-' + day() + '_' + hour() + '-' + minute() + '-' + second() + ".jpg");
  }