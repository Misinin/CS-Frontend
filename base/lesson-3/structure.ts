import { encode } from "../lesson-2/encode/index";

// ["name", "utf16", 10], // Число - это максимальное количество символов
//   ["lastName", "utf16", 10],
//   ["age", "u16"], // uint16

type SchemaItem = [string, "utf16" | "u16", number] | [string, "utf16" | "u16"];

class Structure {
  #schema: SchemaItem[];
  #coded: Uint16Array;
  #offsets: Record<string, number>;

  constructor(schema: SchemaItem[]) {
    this.#schema = schema;
    this.#coded = new Uint16Array(21);
    this.#offsets = {};
  }

  set(key: string, value: string | number) {
    //@ts-ignore
    this.#schema[Symbol.iterator] = () => {
      let cursor = 0;

      return {
        next: () => {
          const currentCursor = cursor;
          cursor++;

          do {
            return {
              done: key === this.#schema[currentCursor][0],
              value: this.#schema[currentCursor][2],
            };
          } while (key !== this.#schema[currentCursor][0]);
        },
      };
    };

    let offset = 0;

    for (let byteLength of this.#schema) {
      //@ts-ignore
      offset += byteLength;
    }

    const encodeRules = this.#schema.findIndex((item) => item[0] === key);
    if (~encodeRules) {
      const keyName = this.#schema[encodeRules][0];
      const codingType = this.#schema[encodeRules][1];
      const maxNumberSymbols = this.#schema[encodeRules][2];
      if (
        codingType === "utf16" &&
        maxNumberSymbols &&
        typeof value === "string"
      ) {
        const values = [];
        for (let char of value) {
          const binChar = char.charCodeAt(0);
          values.push(binChar);
        }
        for (let i = 0; i <= maxNumberSymbols; i += 1) {
          this.#coded[offset + i] = values[i] || 0;
        }

        this.#offsets[key] = offset;

        return;
      }
      if (codingType === "u16" && typeof value === "number") {
        this.#coded[offset] = value;
        this.#offsets[key] = offset;
        console.log(this.#coded);
        return;
      }
    }
    throw new Error("Не существующее поле в структуре");
  }

  get(key: string) {
    const encodeRules = this.#schema.findIndex((item) => item[0] === key);

    if (~encodeRules) {
      const maxNumberSymbols = this.#schema[encodeRules][2];

      if (maxNumberSymbols) {
        const part = this.#coded.slice(
          this.#offsets[key],
          maxNumberSymbols + this.#offsets[key]
        );
        let decoded = "";

        for (let char of part) {
          decoded += String.fromCharCode(char);
        }

        return decoded.trim();
      }

      if (!maxNumberSymbols) {
        const part = this.#coded.slice(
          this.#offsets[key],
          1 + this.#offsets[key]
        );

        return part[0];
      }
      return;
    }

    throw new Error("Не существующее поле в структуре");
  }
}

const jackBlack = new Structure([
  ["name", "utf16", 10],
  ["lastName", "utf16", 10],
  ["age", "u16"],
]);

jackBlack.set("name", "Jack");
jackBlack.set("lastName", "Black");
jackBlack.set("age", 53);

console.log(jackBlack.get("lastName")); // 'Black'
console.log(jackBlack.get("age")); // 'Black'
console.log(jackBlack.get("name")); // 'Jack'
