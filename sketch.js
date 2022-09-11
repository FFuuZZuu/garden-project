// The weights used for randomly generating the scene, in the format:
//     idx: weight
// All the weights must add up to 1
const tile_weights = {
  0: 0.6,
  1: 0.15,
  2: 0.15,
  3: 0.1
};

let tileModels = [];
let tilemap = [];
let clouds = [];

function preload() {
  // We need to load all the model files aswell as all the textures
  let grass_tile = loadModel("assets/grass_tile.obj");
  let ball_tree_tile = loadModel("assets/ball_tree_tile.obj");
  let fir_tree_tile = loadModel("assets/fir_tree_tile.obj");
  let water_tile = loadModel("assets/water_tile.obj");

  let grass_tile_texture = loadImage("assets/grass_tile.png");
  let ball_tree_tile_texture = loadImage("assets/ball_tree_tile.png");
  let fir_tree_tile_texture = loadImage("assets/fir_tree_tile.png");
  let water_tile_texture = loadImage("assets/water_tile.png");

  // We then group the models and textures together using our custom model class
  tileModels[0] = new Model(grass_tile, grass_tile_texture);
  tileModels[1] = new Model(fir_tree_tile, fir_tree_tile_texture);
  tileModels[2] = new Model(ball_tree_tile, ball_tree_tile_texture);
  tileModels[3] = new Model(water_tile, water_tile_texture);

  preloadCloud();
}

function setup() {
  // This project uses WebGL to render the scene, as it is 3D
  createCanvas(900, 900, WEBGL);
  noStroke();
  smooth();

  // This button allows us to regenerate the random scene
  button = createButton('regenerate');
  button.position(10, 10);
  button.style('font-size', '20px');
  button.size(130, 40);
  button.mousePressed(regenerate);

  createCloudSliders();

  angleMode(DEGREES);

  let curr_camera = createCamera();
  curr_camera.move(0, -1500, 2000);
  // Having the camera set to look 30 degrees down, aswell as 45 degrees to the right
  // allows us to have an isometric view of the scene. The camera is also required to
  // be in orthographic mode.
  curr_camera.tilt(30);
  ortho(-1000, 1000, -1000, 1000, 0.000001, 100000);

  regenerate();
}

function draw() {
  // We need to clear the scene every frame, as otherwise the scene will be drawn on top
  // of the previous frame
  clear();
  background(50);

  scale(140);
  ambientLight(200);
  directionalLight(150, 150, 150, 0, 0, -360);

  // for isometric view
  rotateY(45);
  translate(0, 3, 0);

  // Here we iterate through the tilemap, and draw each tile
  for (i = -2; i < 3; i++) {
    for (j = -2; j < 3; j++) {
      let tile = tilemap[((i + 2) * 5) + (j + 2)]; // this weird formula gives us the index from an x and y coordinate
      tile.draw();
    }
  }

  for (cloud in clouds) {
    clouds[cloud].draw();
    clouds[cloud].update();
  }
}

// This function is called when the regenerate button is pressed
// It will iterate through the tilemap, and randomly create a tile for each position using
// the weights defined at the top of the file.
function regenerate() {
  tilemap = [];
  for (i = -2; i < 3; i++) {
    for (j = -2; j < 3; j++) {
      tilemap.push(new Tile(i, j, tileModels[weightedRandom(tile_weights)]));
    }
  }

  clouds = [];
  let cloudCount = int(random(10, 35));
  for (let i = 0; i < cloudCount; i++) {
    clouds.push(new Cloud());
  }
}

// This function returns a random index from the given weights in the following format:
//    idx: weight
function weightedRandom(weights) {
  let sum = 0;
  let r = random(1); // generates a float between 0 and 1
  // iterate over all the weights until the sum is greater than the random number
  // the sum is incremented by the weight of each index, meaning that we will
  // return the index only if the random number is in its "weight range"
  for (let i in weights) {
    sum += weights[i];
    if (r <= sum) return i;
  }
}
