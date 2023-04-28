interface Coordinates {
  x: number;
  y: number;
  z: number;
}

class Matrix3D {
  width: number;
  height: number;
  page: number;

  #array: Array<Array<number>>;

  constructor({ x, y, z }: Coordinates) {
    this.width = x;
    this.height = y;
    this.page = z;

    const page = new Array(x * y).fill(0);
    const pages = new Array(z).fill(page);

    this.#array = pages;
  }

  #getPage(index: number) {
    return this.#array[index];
  }

  #getItemIndex(x: number, y: number) {
    return y * this.width + x;
  }

  set(coords: Coordinates, value: number) {
    const page = this.#getPage(coords.z);
    const index = this.#getItemIndex(coords.x, coords.y);

    page[index] = value;
  }

  get(coords: Coordinates) {
    const page = this.#getPage(coords.z);
    const index = this.#getItemIndex(coords.x, coords.y);

    return page[index];
  }
}

const matrix = new Matrix3D({ x: 10, y: 10, z: 10 });

matrix.set({ x: 1, y: 3, z: 2 }, 10);
matrix.get({ x: 1, y: 3, z: 2 });
