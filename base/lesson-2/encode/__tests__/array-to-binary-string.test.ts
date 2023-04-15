import { AvailableType, arrayToBinaryString, pad } from "../index";

describe("array-to-binary-string - функция принимает маасив значений, валидириует каждое и возвращает строку из 0 и 1 ", () => {
  test("Добавляет 0 в начало", () => {
    const testArray = [2, 3, true, false, "ab"];
    const schema: [number, AvailableType][] = [
      [3, "number"],
      [3, "number"],
      [1, "boolean"],
      [1, "boolean"],
      [16, "ascii"],
    ];

    const { bits, bitCounter } = arrayToBinaryString(testArray, schema);
    expect(bits.join("")).toEqual("010011100110000101100010");
    expect(bitCounter).toEqual(24);
  });
});
