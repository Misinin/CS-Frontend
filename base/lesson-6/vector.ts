interface VectorParams {
  capacity: number;
}

class Vector {
  #arrayConstructor: Uint8ArrayConstructor;
  #array: Uint8Array;
  #lastItemIndex: number | null;
  #capacity: number;
  length: number;

  constructor(arrayConstructor: Uint8ArrayConstructor, params: VectorParams) {
    this.#arrayConstructor = arrayConstructor;
    this.#array = new arrayConstructor(params.capacity);
    this.#lastItemIndex = null;
    this.#capacity = params.capacity;
    this.length = 0;
  }

  #getExtendedBuffer(buffer1: ArrayBuffer, capacity: number) {
    const tmp = new this.#arrayConstructor(capacity);
    tmp.set(new this.#arrayConstructor(buffer1), 0);
    return tmp.buffer;
  }

  push(...args: number[]) {
    if (this.length + args.length >= this.#capacity) {
      const newCapacity = (this.#capacity + args.length) * 2;

      const newBuffer = this.#getExtendedBuffer(
        this.#array.buffer,
        newCapacity
      );

      this.#array = new this.#arrayConstructor(newBuffer);
      this.#capacity = this.#array.length;
    }

    if (this.#lastItemIndex === null) {
      this.#lastItemIndex = args.length - 1;
      for (let i = 0; i < args.length; i++) {
        this.#array[i] = args[i];
      }
      this.length = this.#lastItemIndex + 1;
      return this.#lastItemIndex + 1;
    }
    for (let i = 0; i < args.length; i++) {
      this.#array[this.#lastItemIndex + 1 + i] = args[i];
    }
    this.#lastItemIndex += args.length;

    this.length = this.#lastItemIndex + 1;

    return this.#lastItemIndex + 1;
  }

  pop() {
    if (this.#lastItemIndex === null) return undefined;
    const lastAddedItem = this.#array[this.#lastItemIndex];
    this.#array[this.#lastItemIndex] = 0;
    this.#lastItemIndex -= 1;

    this.length = this.#lastItemIndex + 1;
    return lastAddedItem;
  }

  shift() {
    if (this.#lastItemIndex === null) return undefined;

    const currentItemsNumber = this.#lastItemIndex + 1;

    const firstItem = this.#array[0];

    for (let i = 0; i < currentItemsNumber; i++) {
      const currentItem = this.#array[i];
      this.#array[i - 1] = currentItem;
    }

    this.#array[this.#lastItemIndex] = 0;
    this.#lastItemIndex -= 1;
    this.length = this.#lastItemIndex + 1;
    return firstItem;
  }

  unshift(...args: number[]) {
    if (this.length + args.length >= this.#capacity) {
      const newCapacity = (this.#capacity + args.length) * 2;

      const newBuffer = this.#getExtendedBuffer(
        this.#array.buffer,
        newCapacity
      );

      this.#array = new this.#arrayConstructor(newBuffer);
      this.#capacity = this.#array.length;
    }

    if (this.#lastItemIndex === null) {
      return this.push(...args);
    }

    const rightOffset = args.length;

    for (let i = this.#lastItemIndex; i >= 0; i--) {
      const currentItem = this.#array[i];
      this.#array[i + 1] = currentItem;
    }

    for (let i = 0; i < args.length; i++) {
      this.#array[i] = args[i];
    }

    this.#lastItemIndex += rightOffset;
    this.length = this.#lastItemIndex + 1;

    return this.#lastItemIndex + 1;
  }
}

// const uint8Vector = new Vector(Uint8Array, { capacity: 1 });
