class Leaf {
  key: number;
  parent: Leaf | null;
  leftChild: Leaf | null;
  rightChild: Leaf | null;

  constructor(key: number) {
    this.key = key;
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
  }
}

class Tree {
  root: Leaf | null;

  constructor() {
    this.root = null;
  }

  find(key: number) {
    let current = this.root;

    while (current?.key !== key) {
      if (current && key < current?.key) {
        current = current.leftChild;
      }

      if (current && key > current.key) {
        current = current.rightChild;
      }

      if (current === null) return null;
    }

    return current;
  }

  insert(key: number) {
    const newLeaf = new Leaf(key);

    if (this.root === null) {
      this.root = newLeaf;
      return;
    }

    let parent = this.root;

    while (true) {
      if (parent.key > key && parent.leftChild) {
        parent = parent.leftChild;
      }

      if (parent.key < key && parent.rightChild) {
        parent = parent.rightChild;
      }

      if (parent.key > key && parent.leftChild === null) {
        newLeaf.parent = parent;
        parent.leftChild = newLeaf;
        return;
      }

      if (parent.key < key && parent.rightChild === null) {
        newLeaf.parent = parent;
        parent.rightChild = newLeaf;
        return;
      }
    }
  }

  inOrder(localRoot: Leaf | null) {
    if (localRoot !== null) {
      this.inOrder(localRoot.leftChild);
      console.log(localRoot.key);
      this.inOrder(localRoot.rightChild);
    }
  }

  min() {
    if (this.root?.leftChild === null) return this.root;

    let current = this.root;

    while (current?.leftChild) {
      current = current?.leftChild;
    }

    return current;
  }

  max() {
    if (this.root?.rightChild === null) return this.root;

    let current = this.root;

    while (current?.rightChild) {
      current = current.rightChild;
    }

    return current;
  }

  delete(key: number) {
    let current = this.root;

    if (this.root?.leftChild === null && this.root.rightChild === null) {
      this.root = null;
    }

    while (current?.key !== key) {
      if (current?.key && key < current?.key) {
        current = current.leftChild;
      }

      if (current?.key && key > current.key) {
        current = current.rightChild;
      }

      if (current === null) return null;
    }

    /**
     * Если элемент является листом, то в родителе убираем ссылку на него.
     */
    if (
      current.leftChild === null &&
      current.rightChild === null &&
      current.key
    ) {
      const parent = current.parent;

      if (parent?.leftChild && parent?.leftChild?.key === key)
        parent.leftChild = null;
      if (parent?.rightChild && parent?.rightChild?.key === key)
        parent.rightChild = null;
    }

    /**
     * Если у элемента есть только один потомок, то на место удаляемого ставится этот потомок.
     */
    if (
      (current.leftChild === null && current.rightChild !== null) ||
      (current.leftChild !== null && current.rightChild === null)
    ) {
      const child = current.leftChild || current.rightChild;
      const parent = current.parent;

      if (parent?.leftChild && parent?.leftChild?.key === key) {
        parent.leftChild = child;
      }

      if (parent?.rightChild && parent?.rightChild?.key === key) {
        parent.rightChild = child;
      }
    }

    /**
     * Если у элемента есть два потомка, то нужно найти приемника. Пойти направо и искать по левой части правой стороны.
     * Ищем элемент у которого нет левого ребенка,
     *  - вставляем его на место удаляемого
     *  - левым ребенком НАЙДЕННОГО делаем левую часть УДАЛЯЕМОГО.
     */

    if (current.leftChild && current.rightChild) {
      // const removableParent = current.parent;
      // const removableLeftChild = current.leftChild;
      let receiver = current.rightChild;

      while (receiver.leftChild !== null) {
        receiver = receiver.leftChild;
      }

      // receiver.parent = removableParent;
      // receiver.leftChild = removableLeftChild;

      console.log(receiver);
    }
  }
}

const tree = new Tree();

tree.insert(10);
tree.insert(32);
tree.insert(22);
tree.insert(42);
tree.insert(5);
tree.insert(62);
tree.insert(2);
tree.insert(51);

console.log(tree.inOrder(tree.root));
