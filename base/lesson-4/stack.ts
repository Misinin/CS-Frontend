export class Stack {
  #cursor: number;
  head: number | null;
  #capacity: number;
  #array: Int32Array;

  constructor(capacity: number) {
    this.#cursor = 0;
    this.head = null;
    this.#capacity = capacity;
    this.#array = new Int32Array(capacity);
  }

  push(value: number) {
    const newCursor = this.#cursor + 1;

    if (this.#cursor === 0) {
      this.#array[0] = value;
      this.#cursor = newCursor;
      this.head = value;
      return;
    }

    if (newCursor > this.#capacity) {
      throw new Error("stack overflow");
    }

    this.#cursor = newCursor;
    this.#array[newCursor] = value;
    this.head = value;
  }
  pop() {
    const newCursor = this.#cursor - 1;

    if (newCursor < 0) {
      throw new Error("Exception");
    }

    if (newCursor <= 0) {
      this.#cursor = 0;
      const last = this.#array[0];
      return last;
    }

    const last = this.#array[this.#cursor];
    this.#cursor = newCursor;
    this.head = this.#array[newCursor];
    return last;
  }
}

const stack = new Stack(10);

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack.head); // 12

console.log(stack.pop()); // 12

console.log(stack.head); // 11

console.log(stack.pop()); // 11
console.log(stack.pop()); // 10
console.log(stack.pop()); // Exception
