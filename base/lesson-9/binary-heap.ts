class BinaryHeap {
  buffer: Array<number>;
  count = 0;

  constructor(size: number) {
    this.buffer = new Array(size).fill(null);
  }

  getLeftChild(vertexIndex: number) {
    return this.buffer[2 * vertexIndex + 1];
  }

  getRightChild(vertexIndex: number) {
    return this.buffer[2 * vertexIndex + 2];
  }

  getParent(index: number) {}

  add(value: number) {
    let { buffer, count } = this;

    if (count === 0) {
      buffer[count] = value;
      this.count += 1;

      return;
    }

    
  }
}

const bH = new BinaryHeap(10);
bH.add(5);
bH.add(6);

console.log(bH.buffer);
