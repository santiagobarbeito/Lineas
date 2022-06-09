let jitter=0.0;
class Module {
  constructor(xOff, yOff, x, y, speed, unit) {
    this.xOff = xOff;
    this.yOff = yOff;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.unit = unit;
    this.xDir = 1;
    this.yDir = 1;
    this.angulo=PI/2;
    if (random (2)>=1){
      this.angulo=0.0;
    }
    this.r=50;
    this.xvector=0;
    this.yvector=0;
    this.rotando=0;
    this.angulocreciendo=0;
    this.dg=random(255);
    this.dr=random(255);
    this.db=random(255);
  }

  // Método personalizado para refrescar las variables
  update() {
    this.x = this.x + this.speed * this.xDir;
    if (this.x >= this.unit || this.x <= 0) {
      this.xDir *= -1;
      this.x = this.x + 1 * this.xDir;
      this.y = this.y + 1 * this.yDir;
    }
    if (this.y >= this.unit || this.y <= 0) {
      this.yDir *= -1;
      this.y = this.y + 1 * this.yDir;
    }
    if (this.rotando==0){
      if (random(1)<0.001){
        this.rotando=1;
      }
    }
    if (this.rotando==1){
      if (this.angulocreciendo==0){ 
        if (this.angulo<=PI/2){
          this.angulo=this.angulo+0.01;
        }
        if (this.angulo>=PI/2){
          this.angulo=PI/2;
          this.rotando=0;
          this.angulocreciendo=1;
        }
      }
      if (this.angulocreciendo==1){ 
        if (this.angulo>=0){
          this.angulo=this.angulo-0.01;
        }
        if (this.angulo<=0){
          this.rotando=0;
          this.angulocreciendo=0;
          this.angulo=0;
        }
      }
    }
    this.xvector=this.r*cos(this.angulo);
    this.yvector=this.r*sin(this.angulo);
  }

  // Método personalizado para dibujar el objeto
  draw() {
    fill(this.dr,this.dg,this.db,255);
    stroke(this.dr,this.dg,this.db,255);
    line(this.xOff + this.x, this.yOff + this.y, this.xOff + this.x+this.xvector, this.yOff + this.y+this.yvector);
  }
}

let unit = 40;
let count;
let mods = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  let wideCount = width / unit;
  let highCount = height / unit;
  count = wideCount * highCount;

  let index = 0;
  for (let y = 0; y < highCount; y++) {
    for (let x = 0; x < wideCount; x++) {
      mods[index++] = new Module(
        x * unit,
        y * unit,
        unit / 2,
        unit / 2,
        random(0.05, 0.8),
        unit
      );
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < count; i++) {
    mods[i].update();
    mods[i].draw();
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
