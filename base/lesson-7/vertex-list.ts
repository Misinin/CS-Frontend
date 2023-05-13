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
