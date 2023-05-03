class Vertex {
  vertex: string;

  constructor(value: string) {
    this.vertex = value;
  }
}

export class VertexList {
  items: Array<string>;

  constructor() {
    this.items = [];
  }

  add(value: string) {
    this.items.push(value);
    return value;
  }
}
