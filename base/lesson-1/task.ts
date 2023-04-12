import {
  BIT_IS_UNDEFINED,
  INCORRECT_BIT_INDEX,
  MAX_BIT_INDEX,
  MIN_BIT_INDEX,
  VALUE_IS_UNDEFINED,
} from "./lib/constants";

interface ErrorLoggerParams {
  value?: number;
  offset?: number;
}

export class BitController {
  array: Uint8Array;

  constructor(array: Uint8Array) {
    this.array = array;
  }

  private errorLogger({ value, offset }: ErrorLoggerParams) {
    if (value === undefined) throw new Error(VALUE_IS_UNDEFINED);
    if (offset === undefined) throw new Error(BIT_IS_UNDEFINED);
    if (offset < MIN_BIT_INDEX || offset > MAX_BIT_INDEX)
      throw new Error(INCORRECT_BIT_INDEX);
  }

  private getArrayValueByIndex(array: Uint8Array, itemIndex: number) {
    return array[itemIndex];
  }

  private getOneOrZero(value: number) {
    if (value) {
      return 1;
    }

    return 0;
  }

  private bitwiseAndWithRightOffset(value: number, offset: number) {
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

    this.errorLogger({ value, offset: bitIndex });

    const res = this.bitwiseAndWithRightOffset(value, bitIndex);

    return this.getOneOrZero(res);
  }

  set(itemIndex: number, bitIndex: number, swapTo: 0 | 1) {
    const value = this.getArrayValueByIndex(this.array, itemIndex);

    this.errorLogger({ value, offset: bitIndex });

    const newValue = this.swapBitByIndex(value, bitIndex, swapTo);
    this.array[itemIndex] = newValue;
  }
}

// const bitGetter = new BitController(new Uint8Array([0b1110, 0b1101]));

// console.log(bitGetter.get(0, 1)); // 1
// console.log(bitGetter.get(1, 1)); // 0

// const bitAccessor = new BitController(new Uint8Array([0b1110, 0b1101]));

// console.log(bitAccessor.set(0, 1, 0)); //
// console.log(bitAccessor.get(0, 1)); // 0
