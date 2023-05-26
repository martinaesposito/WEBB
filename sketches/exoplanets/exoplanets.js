let cnv

let rotx= 0;

let smallstars = [];
let fallingstars = []
let fallingstar

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
    imageMode(CENTER)
    pixelDensity(1)

    addEventListener("resize", (event) => {
        //console.log("ridimensiono")
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
        var x = (windowWidth - cnv.width) / 2;
        var y = (windowHeight - cnv.height) / 2;
        resizeCanvas(window.innerWidth, window.innerHeight);
      });

      
    sfondo= loadImage('./assets/sfondo.png')

    //stelline
	for(let i = 0; i < width*2 ;i++){
        smallstars.push(new SmallStar());
        }

    //stelle cadenti
	fallingstar = new FallingStar(100, 100);

    planet= loadImage('./assets/52763565712_ed7c79b90c_o-assets/exoplanet.png')
    
}



function draw(){
    
    background(0)
    image(sfondo,sfondo.width/4,0,sfondo.width,sfondo.height)

  
      //PALLA FUMATA DIETRO ANCORA
      push()
      noStroke()
      fill(255)
      ctx.filter = 'blur(50px)';    
      translate (width/2, height/2-150);
      rotx+= 0.05;
      rotate(rotx);
      ellipse(0,0, 100, 70)
    pop()
  
      //PALLA FUMATA DIETRO
      push()
      noStroke()
      fill('#FFE965')
      ctx.filter = 'blur(30px)';    
      translate (width/2, height/2-150);
      rotx+= 0.01;
      rotate(-rotx/10);
      ellipse(0,0, 70, 50)
    pop()

    //PALLA CENTRALE
    push()
      noStroke()
      fill(255)
      ctx.filter = 'blur(5px)';
      ellipse(windowWidth/2,windowHeight/2-150, 50, 50)
    pop()

    
    //stelline
    push()
    for(let i = 0;i<smallstars.length;i++) {
    smallstars[i].createSmallStar();
    smallstars[i].moveSmallStar();
    }

    pop()

    //PALLA FUMATA DIETRO
    push()
    noStroke()
    fill('white')
    ctx.filter = 'blur(50px)';    
    translate (width/2, height+150);
    rotx+= 0.01;
    rotate(-rotx/10);
    ellipse(0,0, planet.width*0.8-170, planet.height*0.8-170)
    pop()


    push()
    translate (width/2, height/2+planet.height/2);
    rotx+= 0.01;
    rotate(-rotx/100);
    ctx.filter = 'blur(1px)';
    image(planet,0,-100,planet.width*0.8,planet.height*0.8)
    //image(planet,width-planet.width*0.75,height*2.75-planet.height,planet.width,planet.height)
    pop()

    //PALLA FUMATA DIETRO
    push()
    noStroke()
    fill(0)
    ctx.filter = 'blur(150px)';    
    translate (width/2, height+150);
    rotx+= 0.01;
    rotate(-rotx/10);
    ellipse(0,0, planet.width-450, planet.height-450)
    pop()

    
    //falling stars
    //per ciascun elemento dell'array stars chiamo una funzione 
	fallingstars.map((element) => element.draw());

    //chiamo la funziona che crea una nuova stella cadente solo se quella già creata è uscita dalla window
    if (fallingstar.x > window.innerWidth + 100 || fallingstar.x < -100 || 
        fallingstar.y > window.innerHeight + 100) {
        
    //uso l'operatore new perchè la funzione è definita come un constructor, ossia una funzione oggetto
        fallingstar = new FallingStar(100, 100);
            } else {
        fallingstar.draw();
        }

}


//definisco il constructor che crea le stelle cadenti
//this. indica un valore nullo dell'oggetto nel momento in cui viene creato
// man mano che viene eseguita la funzione le sue properties assumono dei valori 
function FallingStar(x, y) {

    //come gli oggetti posso specificare delle proprietà che vengono attribuite all'oggetto ogni volta che viene creato  
       this.x = round(random(0, window.innerWidth));
       this.xSpeed = round(random([-4,-1,1,4]));
    
    //le stelle vengono create sempre sopra alla window e procedono verso il basso 
       this.y = -10;
       this.ySpeed = random(2, 4);
       
       this.r = round(random(4, 8));
    
        this.startColor = "#fce1b4";
        this.endColor = "white"
    
    //array contenente i valori di x, y e r dei cerchi che comporranno la coda
    //la lunghezza dell'array è di max 50 elementi
       this.tail = [];
       this.tailLength = 50;
    
       this.draw = function(){
        
            fill(this.startColor);
            noStroke();
            circle(this.x, this.y, this.r);
    
            this.move();
            this.history();
            this.drawTail();
               }
       
    //scrivo la funzione che salva i valori x, y e r della falling star nell'array tail per generare la coda
       this.history = function() {
            this.tail.push({x: this.x, y: this.y, r: this.r});
    
    //se la lunghezza dell'array è più lunga di 50 elementi allora cancella il primo elemento dell'array
    //questo è ciò che permette alla coda di scomparire man mano che la stella si muove
            if(this.tail.length > this.tailLength) {
                this.tail.shift(); 
                }
             }
    
    //disegno la coda
    //per la lunghezza della coda disegno un cerchio assumendo i valori di x, y e r salvati nell'array nella posizione i-1
       this.drawTail = function(){
        
    //libreria di javascript chroma.js mi permette di attribuire diverse proprietà al colore
            let colorScale = chroma
                .scale([this.endColor, this.startColor])
                .colors(this.tail.length);
    
           for(i = this.tail.length - 1; i > 0; i--){
                fill(colorScale[i]);
                noStroke();
                circle(this.tail[i].x, this.tail[i].y, this.tail[i].r);
               
    //variabile corrispondente alla r dei cerchi componenti la coda della stella
    //la dimensione è inversamente proporzionale alla posizione nell'array
                const radiusReducer = this.tail[i].r / this.tailLength*2;
                this.tail[i].r -= radiusReducer;
                }
            }
       
       this.move = function(){
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            }
        }