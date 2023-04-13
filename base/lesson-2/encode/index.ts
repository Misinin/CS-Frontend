const AVAILABLE_TYPES = "number, boolean, string";
const MIN_NUMBER = 0;
const MAX_NUMBER = 7;
const MAX_LENGTH_STRING = 2;
const NUMBER_ASCII_SYMBOLS = 2;

export const getInvalidMessageForString = (value: string) =>
  `Unexpected ${value}. Available length for string is ${MAX_LENGTH_STRING}`;
export const getInvalidMessageForASCII = (value: number) =>
  `Unexpected ${value}. Max length for ascii symbol is ${NUMBER_ASCII_SYMBOLS}`;
export const getInvalidMessageForNumber = (value: number) =>
  `Unexpected ${value}. Available value for number type from range ${MIN_NUMBER} - ${MAX_NUMBER}`;
export const getInvalidMessageGeneral = (value: unknown) =>
  `Unexpected type ${value}, available type is ${AVAILABLE_TYPES}`;

function isValidNumber(value: number) {
  return value >= MIN_NUMBER && value <= MAX_NUMBER;
}

export function validation(value: unknown) {
  if (typeof value === "string") {
    if (value.length > MAX_LENGTH_STRING || value.length < MAX_LENGTH_STRING) {
      throw new Error(getInvalidMessageForString(value));
    }

    return;
  }

  if (typeof value === "number") {
    if (isValidNumber(value)) return;
    if (value.toString().length === 1)
      throw new Error(getInvalidMessageForNumber(value));
    if (value.toString().length === NUMBER_ASCII_SYMBOLS) return;
    if (value.toString().length !== NUMBER_ASCII_SYMBOLS) {
      throw new Error(getInvalidMessageForASCII(value));
    }

    if (value < MIN_NUMBER || value > MAX_NUMBER)
      throw new Error(getInvalidMessageForNumber(value));
  }

  if (typeof value === "boolean") return;

  throw new Error(getInvalidMessageGeneral(value));
}

export const schema = [
  [3, "number"],
  [2, "number"],
  [1, "boolean"],
  [1, "boolean"],
  [16, "ascii"],
];

function encode(array: Array<unknown>, schema: (string | number)[][]) {
  for (let i = 0; i < array.length; i += 1) {
    const encodeItem = array[i];
    validation(encodeItem);
  }
}

encode([2, 3, true, false, "ab"], schema);
