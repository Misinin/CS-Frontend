// import { AvailableType, encode } from "../index";

describe("encode - функция принимает на вход массив данных и схему по которой кодировать на выходе ArrayBufferLike закодированных вход", () => {
  test("", () => {});

  // test("На входе массив и схема", () => {
  //   const array = [2, 3, true, false, "ab"];
  //   const schema: [number, AvailableType][] = [
  //     [3, "number"],
  //     [3, "number"],
  //     [1, "boolean"],
  //     [1, "boolean"],
  //     [16, "ascii"],
  //   ];

  //   const bufferView = new Uint8Array(encode(array, schema));

  //   expect(Buffer.from(bufferView.buffer).toJSON()).toMatchObject({
  //     type: "Buffer",
  //     data: [78, 97, 98],
  //   });
  // });
});
