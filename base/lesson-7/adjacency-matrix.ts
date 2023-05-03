export class AdjacencyMatrix<T> {
  x: number;
  y: number;
  coords: Array<T>;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.coords = new Array(x * y).fill(0);
  }

  #getIndex(x: number, y: number) {
    return y * this.y + x;
  }

  add() {
    const currentX = this.x;
    const currentY = this.y;
    const currentCoords = this.coords;
    const newCoords = new Array((currentX + 1) * (currentY + 1)).fill(0);

    for (let x = 0; x < currentX + 1; x++) {
      for (let y = 0; y < currentY + 1; y++) {
        const value = currentCoords[x] !== undefined ? currentCoords[x] : 0;
        const index = y * currentY + x;

        newCoords[index] = value;
      }
    }

    this.x = currentX + 1;
    this.y = currentY + 1;
    this.coords = newCoords;
  }

  get(x: number, y: number) {
    const index = this.#getIndex(x, y);
    return this.coords[index];
  }

  set(x: number, y: number, value: T) {
    const index = this.#getIndex(x, y);
    // const index2 = this.#getIndex(y, x);
    this.coords[index] = value;
    // this.coords[index2] = value;
  }
}
