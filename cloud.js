let cloudModel;

function preloadCloud() {
  cloudModel = loadModel("assets/cloud.obj");
}

function createCloudSliders() {
  let p1 = createP('Cloud Rotation Speed');
  p1.style('font-size', '20px');
  p1.position(100, 40);

  cloudRotSpeedSlider = createSlider(0, 10, 2, 0.2);
  cloudRotSpeedSlider.position(10, 60);
  cloudRotSpeedSlider.changed(() => {
    for (cloud in clouds) {
      clouds[cloud].rotSpeed = createVector(random(-cloudRotSpeedSlider.value(), cloudSpeedSlider.value()),
                                     random(-cloudRotSpeedSlider.value(), cloudSpeedSlider.value()),
                                     random(-cloudRotSpeedSlider.value(), cloudSpeedSlider.value()));
    }
  });
  cloudRotSpeedSlider.style('width', '80px');

  let p2 = createP('Cloud Speed');
  p2.style('font-size', '20px');
  p2.position(100, 70);

  cloudSpeedSlider = createSlider(0.01, 0.2, 0.03, 0.01);
  cloudSpeedSlider.position(10, 90);
  cloudSpeedSlider.changed(() => {
    for (cloud in clouds) {
      clouds[cloud].speed = random(0.01, cloudSpeedSlider.value());
    }
  });
  cloudSpeedSlider.style('width', '80px');
}

class Cloud {
  constructor() {
    this.x = random(-20, 20);
    this.y = random(-5, -10);
    this.z = random(-12, 15);
    this.size = random(0.4, 0.6);
    this.speed = random(0.01, cloudSpeedSlider.value());

    this.rotSpeed = createVector(random(-cloudRotSpeedSlider.value(), cloudSpeedSlider.value()),
                                     random(-cloudRotSpeedSlider.value(), cloudSpeedSlider.value()),
                                     random(-cloudRotSpeedSlider.value(), cloudSpeedSlider.value()));
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
    if (this.x > 20) {
      this.x = -20;
    }

    this.rot.add(this.rotSpeed);
  }
}
