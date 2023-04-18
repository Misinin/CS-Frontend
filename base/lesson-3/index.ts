class Node {
  value: number | null;
  next: Node | null;
  prev: Node | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class LinkedList {
  first: Node | null;
  last: Node | null;

  constructor() {
    this.first = null;
    this.last = null;
  }

  append(value: number) {
    if (this.first === null) {
      const node = new Node(value);

      this.first = node;
      this.last = node;
      return;
    }

    const node = new Node(value);
    node.prev = this.last;
    this.last!.next = node;
    this.last = node;
  }

  prepend(value: number) {
    if (this.first === null) {
      this.append(value);
      return;
    }

    const node = new Node(value);

    node.next = this.first;
    this.first.prev = node;
    this.first = node;
  }

  deleteFirst() {
    const node = this.first?.next;
    node!.prev = null;
    this.first = node as Node;
  }

  deleteLast() {
    const node = this.last?.prev;
    node!.next = null;
    this.last = node as Node;
  }

  toArray() {
    let current = this.first;
    const res = [];
    do {
      res.push(current?.value);
      current = current!.next;
    } while (current !== null);
    return res;
  }

  [Symbol.iterator]() {
    let cursor = this.first;

    return {
      next() {
        const currentCursor = cursor;
        cursor = currentCursor!.next;

        return {
          done: currentCursor?.next === null,
          value: currentCursor?.value,
        };
      },
    };
  }
}

const list = new LinkedList();

list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.prepend(42);

// console.log(list?.first?.value); // 1
// console.log(list?.first?.value); // 1
// console.log(list?.last?.value); // 3
// console.log(list?.first?.next?.value); // 2
// console.log(list?.first?.next?.prev?.value); // 1

for (let item of list) {
  console.log(item);
}

// console.log(list.toArray());
