import { LinkedList } from "../lesson-3/index";

class Queue {
  head: number | null;
  #linkedList: LinkedList;

  constructor() {
    const list = new LinkedList();

    this.#linkedList = list;

    this.head = list.head?.value as number | null;
  }

  push(value: number) {
    this.#linkedList.append(value);
    this.head = this.#linkedList.head?.value as number | null;
  }

  unshift(value: number) {
    this.#linkedList.prepend(value);
    this.head = this.#linkedList.head?.value as number | null;
  }

  pop() {
    const head = this.#linkedList.head?.value;

    if (head === undefined) {
      throw new Error("Exception");
    }

    this.#linkedList.deleteFirst();
    this.head = this.#linkedList.head?.value as number | null;

    return head;
  }
}

const queue = new Queue();

queue.push(10);
queue.push(11);
queue.push(12);

console.log(queue.head); // 10

console.log(queue.pop()); // 10

console.log(queue.head); // 11

console.log(queue.pop()); // 11
console.log(queue.pop()); // 12
console.log(queue.pop()); // Exception
