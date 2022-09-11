// A class allowing us to group together the infomation required for a tile
class Tile {
  constructor(x, y, model) {
    this.x = x;
    this.y = y;
    this.model = model;
  }

  // Draw the tile to the screen
  draw() {
    // We push and pop the matrix so that we can translate the tile to its
    // correct position without affecting the rest of the canvas
    push();
    // The tiles measure 2x2 units, so the coords need to be doubled.
    translate(this.x * 2, 0, this.y * 2);
    texture(this.model.texture);
    model(this.model.model);
    pop();
  }
}
