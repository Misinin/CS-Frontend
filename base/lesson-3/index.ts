class ListItem {
  next: ListItem | null;
  prev: ListItem | null;
  value: unknown;

  constructor(value: unknown) {
    this.next = null;
    this.prev = null;
    this.value = value;
  }
}

export class LinkedList {
  head: ListItem | null;
  tail: ListItem | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  #setHead(newItem: ListItem | null) {
    this.head = newItem;
    this.tail = newItem;
  }

  append(value: unknown) {
    const newItem = new ListItem(value);

    if (this.head === null) {
      this.#setHead(newItem);
      return;
    }

    newItem.prev = this.tail;
    this.tail!.next = newItem;
    this.tail = newItem;
  }

  prepend(value: unknown) {
    const newItem = new ListItem(value);

    if (this.head === null) {
      this.#setHead(newItem);
      return;
    }

    newItem.next = this.head;
    this.head.prev = newItem;
    this.head = newItem;
  }

  deleteFirst() {
    if (this.head?.next === null) {
      this.#setHead(null);
      return;
    }

    const newFirst = this.head!.next;
    newFirst.prev = null;
    this.head = newFirst;
  }

  deleteLast() {
    if (!this.tail?.prev) return;

    const newLast = this.tail.prev;
    newLast.next = null;
    this.tail = newLast;
  }

  toArray() {
    let cursor: ListItem | null | undefined = this.head;
    const res = [];

    do {
      const currentCursor: ListItem | null | undefined = cursor;
      cursor = currentCursor?.next;

      if (currentCursor?.value) {
        res.push(currentCursor?.value);
      }
    } while (cursor);

    return res;
  }

  [Symbol.iterator]() {
    let cursor: ListItem | null | undefined = this.head;

    return {
      next: () => {
        const currentCursor = cursor;

        cursor = currentCursor?.next;

        return {
          done: cursor === undefined,
          value: currentCursor?.value,
        };
      },
    };
  }
}

// const list = new LinkedList();

// list.append(1);
// list.append(2);
// list.append(3);
// list.prepend(42);

// list.deleteFirst();
// list.deleteLast();

// for (let el of list) {
//   console.log(el);
// }

// console.log(list.toArray());
