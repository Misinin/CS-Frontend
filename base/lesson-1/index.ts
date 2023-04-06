interface ErrorLoggerParams {
  value?: number;
  offset?: number;
}

class bitController {
  array: Uint8Array;

  constructor(array: Uint8Array) {
    this.array = array;
  }

  private errorLogger({ value, offset }: ErrorLoggerParams) {
    if (value === undefined)
      throw new Error("Selected array item is undefined");
    if (offset === undefined)
      throw new Error("Target bit index must be defined");
  }

  private getArrayValueByIndex(array: Uint8Array, itemIndex: number) {
    if (array[itemIndex]) return array[itemIndex];
  }

  private getOneOrZero(value: number) {
    if (value) {
      return 1;
    }

    return 0;
  }

  private bitwiseAndWithLeftOffset(value: number, offset: number) {
    return value & (1 << offset);
  }

  private swapBitByIndex(value: number, bitIndex: number, swapTo: 0 | 1) {
    if (swapTo === 0) {
      return value & ~(1 << bitIndex);
    }

    return value | (1 << bitIndex);
  }

  get(itemIndex: number, bitIndex: number) {
    const value = this.getArrayValueByIndex(this.array, itemIndex);

    if (value === undefined) {
      this.errorLogger({ value });
      return;
    }

    const res = this.bitwiseAndWithLeftOffset(value, bitIndex);

    return this.getOneOrZero(res);
  }

  set(itemIndex: number, bitIndex: number, swapTo: 0 | 1) {
    const value = this.getArrayValueByIndex(this.array, itemIndex);

    if (value === undefined) {
      this.errorLogger({ value });
      return;
    }

    const newValue = this.swapBitByIndex(value, bitIndex, swapTo);
    this.array[itemIndex] = newValue;
  }
}
const bitGetter = new bitController(new Uint8Array([0b1110, 0b1101]));

console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0

const bitAccessor = new bitController(new Uint8Array([0b1110, 0b1101]));

console.log(bitAccessor.set(0, 1, 0)); //
console.log(bitAccessor.get(0, 1)); // 0
