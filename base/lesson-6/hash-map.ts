import { hashFunction } from "./lib";

type ListNodeValue = Record<"key" | "value", string | unknown>;

class ListNode {
  value: Record<"key" | "value", string | unknown>;
  next: ListNode | null;

  constructor(value: ListNodeValue) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  head: ListNode | null;
  tail: ListNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value: ListNodeValue) {
    if (this.head === null && this.tail === null) {
      const node = new ListNode(value);
      this.head = node;
      this.tail = node;
      return;
    }

    if (this.tail !== null) {
      const node = new ListNode(value);
      this.tail.next = node;
      this.tail = node;
    }
  }

  [Symbol.iterator]() {
    let cursor = this.head;
    return {
      next: () => {
        const currentCursor = cursor;
        cursor = currentCursor?.next;

        return {
          value: currentCursor?.value,
          done: cursor === undefined,
        };
      },
    };
  }
}

class HashMap {
  #capacity: number;
  #array: Array<unknown>;

  constructor(capacity: number) {
    this.#capacity = capacity;
    this.#array = new Array(capacity).fill(null);
  }

  /**
   * сделать приватным
   */
  find(key: unknown) {
    const index = hashFunction(key, this.#capacity);

    if (this.#array[index] instanceof LinkedList) {
      const list = <LinkedList>this.#array[index];

      for (let item of list) {
        console.log(item?.key);
        if (item?.key === key) {
        }
      }
    }

    return this.#array[index];
  }

  set(key: unknown, value: unknown) {
    const index = hashFunction(key, this.#capacity);
    const isItemList = this.#array[index] instanceof LinkedList;

    if (!isItemList && this.#array[index]) {
      const currentValue = this.#array[index];
      const newKey =
        typeof currentValue.key === "object"
          ? JSON.stringify(currentValue.key)
          : String(currentValue.key);

      const list = new LinkedList();
      list.append({ key: newKey, value: currentValue.value });
      list.append({ key, value });

      this.#array[index] = list;

      return;
    }

    if (isItemList) {
      const newKey =
        typeof key === "object" ? JSON.stringify(key) : String(key);
      const list = <LinkedList>this.#array[index];
      list.append({ key: newKey, value });
      return;
    }

    this.#array[index] = { key, value };
  }
}

const map = new HashMap(120);

// map.find("foo");
// map.set("foo", { name: "value" });
// map.find("foo");
map.set(0, { name: "0" });
map.set({ name: 1 }, { name: "value" });
map.set({ name: 1 }, { name: "value1" });
map.find({ name: 1 });

// console.log(hashFunction(0, 120)); // 0
// console.log(hashFunction({ name: 1 }, 120)); // 0

// const list = new LinkedList();

// list.append({ key: "1", value: 1 });
// list.append({ key: "2", value: 2 });
// list.append({ key: "3", value: 3 });

// for (let el of list) {
//   console.log(el);
// }
