export type AvailableType = "number" | "boolean" | "ascii";
const BITS_PER_BYTE = 8;
const AVAILABLE_TYPES = "number, boolean, ascii";
const MIN_NUMBER = 0;
const MAX_NUMBER = 7;
const MAX_LENGTH_STRING = 2;
const NUMBER_ASCII_SYMBOLS = 2;

export const getInvalidMessageForString = (value: string) =>
  `Unexpected ${value}. Available length for string is ${MAX_LENGTH_STRING}`;
export const getInvalidMessageForASCII = (value: string) =>
  `Unexpected ${value}. Max length for ascii symbol is ${NUMBER_ASCII_SYMBOLS}`;
export const getInvalidMessageForNumber = (value: number) =>
  `Unexpected ${value}. Available value for number type from range ${MIN_NUMBER} - ${MAX_NUMBER}`;
const getInvalidMessageGeneral = (value: unknown) =>
  `Unexpected type ${value}, available type is ${AVAILABLE_TYPES}`;

function isValidNumber(value: number) {
  return value >= MIN_NUMBER && value <= MAX_NUMBER;
}

export function validation(value: unknown) {
  if (typeof value === "string") {
    if (value.length > MAX_LENGTH_STRING || value.length < MAX_LENGTH_STRING) {
      throw new Error(getInvalidMessageForASCII(value));
    }

    return;
  }

  if (typeof value === "number") {
    if (isValidNumber(value)) return;
    if (value.toString().length === NUMBER_ASCII_SYMBOLS) return;

    if (value < MIN_NUMBER || value > MAX_NUMBER)
      throw new Error(getInvalidMessageForNumber(value));
  }

  if (typeof value === "boolean") return;

  throw new Error(getInvalidMessageGeneral(value));
}

const schema: [number, AvailableType][] = [
  [3, "number"],
  [3, "number"],
  [1, "boolean"],
  [1, "boolean"],
  [16, "ascii"],
];

export function pad(value: string, bitLength: number) {
  if (value.length < bitLength) {
    const missingAmount = bitLength - value.length;

    const newString = new Array(missingAmount).fill("0").join("") + value;
    return newString.slice(-bitLength);
  }
  return value;
}

export function arrayToBinaryString(
  array: Array<unknown>,
  schema: [number, AvailableType][]
) {
  let bitCounter = 0;
  const bits: string[] = [];

  for (let i = 0; i < array.length; i += 1) {
    const encodeItem = array[i];

    validation(encodeItem);

    const [bitLength, type] = schema[i];

    if (type === "number" && typeof encodeItem === "number") {
      const binary = pad(encodeItem.toString(2), bitLength);
      binary.split("").forEach((bit) => bits.push(bit));
    }

    if (type === "boolean" && typeof encodeItem === "boolean") {
      bits.push(encodeItem ? "1" : "0");
    }

    if (type === "ascii" && typeof encodeItem === "string") {
      encodeItem.split("").forEach((item) => {
        const binaryCharCode = pad(
          item.charCodeAt(0).toString(2),
          bitLength / 2
        );

        binaryCharCode.split("").forEach((bit) => bits.push(bit));
      });
    }

    bitCounter += bitLength;
  }

  return { bitCounter, bits };
}

export function createUint8ArrayFilledBits(
  bits: string[],
  numberBytes: number
) {
  const uint8 = new Uint8Array(numberBytes);

  for (let i = BITS_PER_BYTE - 1; i <= bits.length; i += BITS_PER_BYTE) {
    const byteIndex = (i / BITS_PER_BYTE) ^ 0;
    const bitsPart = bits.slice(i - (BITS_PER_BYTE - 1), i + 1);
    uint8[byteIndex] = parseInt(bitsPart.join(""), 2);
  }

  return uint8;
}

export function encode(
  array: Array<unknown>,
  schema: [number, AvailableType][]
) {
  const { bits, bitCounter } = arrayToBinaryString(array, schema);

  const numberBytes = Math.ceil(bitCounter / 8);
  const uint8 = createUint8ArrayFilledBits(bits, numberBytes);

  return uint8.buffer;
}

export function decode(
  buffer: ArrayBufferLike,
  schema: [number, AvailableType][]
) {
  const bufferView = new Uint8Array(buffer);

  const stringBits: string[] = [];

  const res: unknown[] = [];

  bufferView.forEach((item) => {
    const binString = pad(item.toString(2), 8);

    stringBits.push(binString);
  });

  const bits = stringBits.join("").split("");

  let decodedBits = 0;
  let schemaItemIndex = 0;

  do {
    const [bitLength, type] = schema[schemaItemIndex];

    const codedItem = bits.slice(decodedBits, bitLength + decodedBits);

    if (type === "number") {
      const number = parseInt(codedItem.join(""), 2);
      res.push(number);
    }

    if (type === "boolean") {
      res.push(Boolean(Number(codedItem)));
    }

    if (type === "ascii") {
      const firstASCIISymbol = codedItem.slice(0, 8).join("");
      const secondASCIISymbol = codedItem.slice(-8).join("");

      const symbols =
        String.fromCharCode(parseInt(firstASCIISymbol, 2)) +
        String.fromCharCode(parseInt(secondASCIISymbol, 2));

      res.push(symbols);
    }

    schemaItemIndex += 1;
    decodedBits += bitLength;
  } while (decodedBits !== bits.length);

  return res;
}

// const coded = encode([2, 3, true, false, "ab"], schema);

// const decoded = decode(coded, schema);
