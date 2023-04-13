import {
  validation,
  getInvalidMessageForNumber,
  getInvalidMessageForASCII,
  getInvalidMessageForString,
} from "../index";

describe("Валидация кодируемых значений", () => {
  it("Все значения валидные", () => {
    const testArray = [2, 3, true, false, "ab"];

    testArray.forEach((item) => {
      expect(validation(item)).toBeUndefined();
    });
  });

  it("Все значения валидные c двухзначным числом", () => {
    const testArray = [21, 3, true, false, "ab"];

    testArray.forEach((item) => {
      expect(validation(item)).toBeUndefined();
    });
  });

  it("Не валидное число 8", () => {
    try {
      validation(8);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toEqual(getInvalidMessageForNumber(8));
    }
  });

  it("Не валидные символы 111", () => {
    const testData = 111;

    try {
      validation(testData);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toEqual(getInvalidMessageForASCII(testData));
    }
  });

  it("Не валидная строка 'tes'", () => {
    const testData = "tes";

    try {
      validation(testData);
    } catch (error) {
      // @ts-ignore
      expect(error.message).toEqual(getInvalidMessageForString(testData));
    }
  });
});
