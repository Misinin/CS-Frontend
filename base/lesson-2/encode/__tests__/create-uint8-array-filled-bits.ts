import { createUint8ArrayFilledBits } from "../index";

describe("createUint8ArrayFilledBits - функция создает Uint8Array, из массива строк в виде бинарных значений, формирует байты и заполняет массив", () => {
  test("Заполняет байтами массив", () => {
    const bits = "010011100110000101100010".split("");
    const numberBytes = 3;
    const uint8 = createUint8ArrayFilledBits(bits, numberBytes);

    expect(Buffer.from(uint8.buffer).toJSON()).toMatchObject({
      type: "Buffer",
      data: [78, 97, 98],
    });
  });

  test("Заполняет один байт в массиве", () => {
    const bits = "00000010".split("");
    const numberBytes = 1;
    const uint8 = createUint8ArrayFilledBits(bits, numberBytes);

    expect(Buffer.from(uint8.buffer).toJSON()).toMatchObject({
      type: "Buffer",
      data: [2],
    });
  });
});
