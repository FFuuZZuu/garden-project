let cloudModel;

function preloadCloud() {
  cloudModel = loadModel("assets/cloud.obj");
}

class Cloud {
  constructor() {
    this.x = random(-8, 8);
    this.y = random(-5, -10);
    this.z = random(-8, 8);
    this.size = random(0.4, 0.6);
    this.speed = random(0.01, 0.03);

    this.rotSpeed = createVector(random(-2, 2), random(-2, 2), random(-2, 2));
    this.rot = createVector(random(0, 360), random(0, 360), random(0, 360));
  }

  draw() {
    push();
    translate(this.x, this.y, this.z);
    rotateX(this.rot.x);
    rotateY(this.rot.y);
    rotateZ(this.rot.z);
    scale(this.size);
    specularMaterial("#EEEEEE");
    model(cloudModel);
    pop();
  }

  update() {
    this.x += this.speed;
    if (this.x > 12) {
      this.x = -12;
    }

    this.rot.add(this.rotSpeed);
  }
}
