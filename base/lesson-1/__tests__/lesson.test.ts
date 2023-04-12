import { VALUE_IS_UNDEFINED, INCORRECT_BIT_INDEX } from "../lib/constants";
import { BitController } from "../task";

const DATA = [0b1110, 0b1101];

describe("bitController", () => {
  test("Обращение к первому элементу массива и его второму биту", () => {
    const bitGetter = new BitController(new Uint8Array(DATA));

    expect(bitGetter.get(0, 1)).toEqual(1);
  });

  test("Обращение к первому элементу массива и его первому биту", () => {
    const bitGetter = new BitController(new Uint8Array([0b1110, 0b0]));

    expect(bitGetter.get(1, 0)).toEqual(0);
  });

  test("Обращение к несуществующему элементу массива", () => {
    const bitGetter = new BitController(new Uint8Array([0b1110, 0b0]));

    try {
      bitGetter.get(2, 0);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toEqual(VALUE_IS_UNDEFINED);
    }
  });

  test("Обращение к отрицательному биту", () => {
    const bitGetter = new BitController(new Uint8Array(DATA));

    try {
      bitGetter.get(0, -1);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toEqual(INCORRECT_BIT_INDEX);
    }
  });

  test("Обращение к биту больше 7", () => {
    const bitGetter = new BitController(new Uint8Array(DATA));

    try {
      bitGetter.get(0, 8);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toEqual(INCORRECT_BIT_INDEX);
    }
  });

  test("Устанавливает бит", () => {
    const bitAccessor = new BitController(new Uint8Array([0b1110, 0b1101]));

    bitAccessor.set(0, 1, 0);

    expect(bitAccessor.get(0, 1)).toEqual(0);
  });

  test("Устанавливает бит у не существующего элемента", () => {
    const bitAccessor = new BitController(new Uint8Array([0b1110, 0b1101]));

    try {
      bitAccessor.set(2, 1, 0);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toEqual(VALUE_IS_UNDEFINED);
    }
  });

  test("Устанавливает бит по интедксу -1", () => {
    const bitAccessor = new BitController(new Uint8Array([0b1110, 0b1101]));

    try {
      bitAccessor.set(0, 1, 0);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toEqual(INCORRECT_BIT_INDEX);
    }
  });

  test("Устанавливает бит по интедксу 8", () => {
    const bitAccessor = new BitController(new Uint8Array([0b1110, 0b1101]));

    try {
      bitAccessor.set(0, 1, 0);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toEqual(INCORRECT_BIT_INDEX);
    }
  });
});
