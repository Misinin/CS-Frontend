function random(from: number, to: number) {
  return {
    [Symbol.iterator]() {
      return this;
    },

    next: function () {
      return {
        value: Math.floor(Math.random() * (to - from) + from),
        done: false,
      };
    },
  };
}

function take<T>(i: Iterable<T>, count: number): IterableIterator<T> {
  const innerIter = i[Symbol.iterator]();
  let cursor = 0;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      if (cursor < count) {
        cursor++;
        return innerIter.next();
      }

      return { done: true, value: undefined };
    },
  };
}

function filter<T>(
  i: IterableIterator<T>,
  pred: (el: T) => boolean
): IterableIterator<T> {
  const innerIter = i[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      let chunk = innerIter.next();
      while (true) {
        if (chunk.done || pred(chunk.value)) {
          return chunk;
        }

        chunk = innerIter.next();
      }
    },
  };
}

function enumerate<T>(i: IterableIterator<T>): IterableIterator<T> {
  const innerIter = i[Symbol.iterator]();
  let count = 0;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      let chunk = innerIter.next();

      if (chunk.done) return chunk;

      return { value: [count++, chunk.value] as T, done: false };
    },
  };
}

export class Range<T extends string | number> {
  type: string | number;
  reversed: boolean;
  from: number;
  to: number;

  constructor(from: T, to: T) {
    if (typeof from === "string") this.type = "string";
    if (typeof from === "number") this.type = "number";

    this.from = this.getNumber(from);
    this.to = this.getNumber(to);
    this.reversed = this.from > this.to;
  }

  [Symbol.iterator]() {
    return this.values();
  }

  values(): IterableIterator<T> {
    let start = this.reversed ? this.to : this.from;
    let end = this.reversed ? this.from : this.to;

    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        if (start > end) {
          return { value: undefined, done: true };
        }

        return { value: this.getT(start++), done: false };
      },
    };
  }

  protected getNumber(value: T) {
    if (typeof value === "string") {
      return value.codePointAt(0) ?? NaN;
    }
    return Number(value);
  }

  protected getT(value: number): T {
    if (this.type === "string") {
      return String.fromCodePoint(value) as T;
    }
    return value as T;
  }
}

function mapSeq<T>(
  items: Iterable<T>,
  callbacks: Iterable<(el: T) => T>
): IterableIterator<T> {
  const itemsIterable = items[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      let chunk = itemsIterable.next();

      if (chunk.done) {
        return { done: true, value: undefined };
      }

      const newChunk = { ...chunk };

      for (let cb of callbacks) {
        newChunk.value = cb(newChunk.value);
      }

      return { value: newChunk.value, done: false };
    },
  };
}

console.log([...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])]); // [1, 3, 5]
