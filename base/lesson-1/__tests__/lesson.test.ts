import { BitController } from "../task";

const DATA = [0b1110, 0b1101];

describe("bitController", () => {
  test("Позволяет обратиться к биту конкретного элемента", () => {
    const bitGetter = new BitController(new Uint8Array(DATA));

    expect(bitGetter.get(0, 1)).toEqual(1);
  });

  test("Изменяет значение конкретного бита", () => {
    const bitAccessor = new BitController(new Uint8Array([0b1110, 0b1101]));

    bitAccessor.set(0, 1, 0);

    expect(bitAccessor.get(0, 1)).toEqual(0);
  });
});
