let cnv
let smallstars = [];
let rotx=0;

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
    //angleMode(DEGREES)
    pixelDensity(1)

    addEventListener("resize", (event) => {
        //console.log("ridimensiono")
        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
        var x = (windowWidth - cnv.width) / 2;
        var y = (windowHeight - cnv.height) / 2;
        resizeCanvas(window.innerWidth, window.innerHeight);
      });

      
    sfondo= loadImage('/sketches/nebulas/assets/sfondo.png')

    tarantula= loadImage('/sketches/nebulas/assets/tarantula-assets/tarantula.png')
    nebula= loadImage('/sketches/nebulas/assets/weic2207b-assets/nebula.png')
    carina= loadImage('/sketches/nebulas/assets/weic2205a-assets/nebula.png')
    doppiocono= loadImage('/sketches/nebulas/assets/weic2219a-assets/doppiocono.png')
    pillars= loadImage('/sketches/nebulas/assets/weic2216b-assets/pillars.png')
    stelle= loadImage('/sketches/nebulas/assets/weic2216b-assets/stelle.png')

    //stelline
	for(let i = 0; i < width*2 ;i++){
        smallstars.push(new SmallStar());
        }

}


function draw(){
    image(sfondo,0,0,sfondo.width,sfondo.height)

    push()
    translate (width/2, height/2);
    rotate(-40);
    rotx+= 0.01;
    rotate(rotx/25);
    image(doppiocono,-doppiocono.width/4,-doppiocono.height/4, doppiocono.width/2, doppiocono.height/2)
    pop()

    push()  
    translate (width/2, height/2);
    rotate(-30);
    rotx+= 0.01;
    rotate(-rotx/40);
    image(nebula,-nebula.width/4,-nebula.height/4, nebula.width/2, nebula.height/2)
    pop()
    
    push() 
    image(carina,cnv.width/2, cnv.height-carina.height*0.8, carina.width*0.8, carina.height*0.8)
    pop()

    push()   
    image(pillars,-300,-200, pillars.width/3.6, pillars.height/3.6)
    pop()

    push()   
    image(stelle,-180,-300, stelle.width/2.5, stelle.height/2.5)
    pop()

    push()    //stelline
    for(let i = 0;i<smallstars.length;i++) {
    smallstars[i].createSmallStar();
    smallstars[i].moveSmallStar();
    }

    pop()
}