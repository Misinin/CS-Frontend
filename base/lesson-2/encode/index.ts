export type AvailableType = "number" | "boolean" | "ascii";
type Schema = [number, AvailableType][];
type NormalizedSchema = {
  size: number;
  type: AvailableType;
  partIndex?: number;
}[];
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

const schema: Schema = [
  [3, "number"],
  [3, "number"],
  [1, "boolean"],
  [1, "boolean"],
  [16, "ascii"],
];

function getNormalizedSchema(schema: Schema): NormalizedSchema {
  return schema.flatMap(([size, type]) => {
    if (type === "ascii") {
      return new Array(2)
        .fill({ size: 8, type })
        .map((item, index) => ({ ...item, partIndex: index }));
    }
    return { size, type };
  });
}

function getMaxViewSize(normalizedSchema: NormalizedSchema) {
  return Math.max(
    ...normalizedSchema.map(({ size }) => (size <= 8 ? 8 : size < 16 ? 16 : 32))
  );
}

function getOffsets(normalizedSchema: NormalizedSchema, bitsPerItem: number) {
  let encodedBits = 0;

  const res = [];

  for (let item = 0; item < normalizedSchema.length; item++) {
    const { size } = normalizedSchema[item];
    encodedBits += size;

    const bufferOffset = ~~((encodedBits - 1) / bitsPerItem);

    const offsetInfo = {
      byteOffset: bufferOffset,
      bitsCount: size,
      innerByteOffset: encodedBits - 1,
    };

    res.push(offsetInfo);
  }

  return res;
}

function encode(data: unknown[], schema: Schema) {
  const normalizedSchema = getNormalizedSchema(schema);
  const bitsPerItem = getMaxViewSize(normalizedSchema);
  const offsets = getOffsets(normalizedSchema, bitsPerItem);
  const allBitsCount = offsets.at(-1)?.innerByteOffset || 0;
  const bufferSize = Math.ceil(allBitsCount / bitsPerItem);

  let buffer: Uint8Array | Uint16Array | Uint32Array;
  buffer =
    bitsPerItem === 8
      ? new Uint8Array(bufferSize)
      : bitsPerItem === 16
      ? new Uint16Array(bufferSize)
      : new Uint32Array(bufferSize);

  for (let i = 0; i < offsets.length; i++) {
    const { byteOffset, innerByteOffset } = offsets[i];
    const { type, partIndex } = normalizedSchema[i];
    const encodeItem = data[i];

    if (type === "number" && typeof encodeItem === "number") {
      buffer[byteOffset] |= encodeItem << (bitsPerItem - 1 - innerByteOffset);
    }

    if (type === "boolean") {
      buffer[byteOffset] |=
        (encodeItem ? 1 : 0) << (bitsPerItem - 1 - innerByteOffset);
    }

    if (partIndex !== undefined && type === "ascii") {
      const item = data[i - partIndex];

      if (typeof item === "string") {
        buffer[byteOffset] = item[partIndex].charCodeAt(0);
      }
    }
  }

  return buffer.buffer;
}

console.log(encode([2, 3, true, false, "ab"], schema));
