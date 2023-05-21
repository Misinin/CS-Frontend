class QueueItem {
  next: unknown;

  constructor(value: unknown) {
    this.next = value;
  }
}

class Queue {
  head: QueueItem | null;
  tail: QueueItem | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value: unknown) {
    const item = new QueueItem(value);

    if (this.head === null) {
      this.head = item;
      this.tail = item;
      return;
    }

    if (this.tail) {
      this.tail.next = item;
      this.tail = item;
    }
  }
}

class GraphWithList {
  #vertexes;

  constructor() {
    this.#vertexes = new Map();
  }

  addVertex(vertex: string) {
    if (this.#vertexes.has(vertex)) {
      throw new Error("Такая вершина уже добавлена");
    }

    this.#vertexes.set(vertex, []);
  }

  setAdj(sourceVertex: string, targetVertex: string) {
    if (this.#vertexes.has(sourceVertex) && this.#vertexes.has(targetVertex)) {
      const currentAdj = this.#vertexes.get(sourceVertex);
      if (Array.isArray(currentAdj)) {
        currentAdj.push(targetVertex);
      }

      this.#vertexes.set(sourceVertex, currentAdj);
    }
  }

  get vertexes() {
    const res = [];

    for (let vertex of this.#vertexes.keys()) {
      res.push(vertex);
    }

    return res;
  }

  getVertex(name: string) {
    this.#vertexAvailable(name);

    return this.#vertexes.get(name);
  }

  #vertexAvailable(name: string) {
    if (this.#vertexes.has(name)) return;
    throw new Error(`Вершина ${name} не доступна`);
  }

  dfs() {
    const visited = new Set();
    const stack = [];
    const res = [];

    const start = this.vertexes[0];

    stack.push(start);

    while (stack.length > 0) {
      const current = stack.pop();
      visited.add(current);

      const adj = this.#vertexes.get(current);

      for (let i = 0; i < adj.length; i++) {
        const vertex = adj[i];

        if (!visited.has(vertex)) {
          stack.push(vertex);
          visited.add(vertex);
        }
      }

      res.push(current);
    }

    return res;
  }
}

const graph = new GraphWithList();

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

graph.setAdj("A", "B");
graph.setAdj("A", "C");
graph.setAdj("B", "D");
graph.setAdj("C", "D");
graph.setAdj("D", "E");

graph.topologicalSort();

// const queue = new Queue();

// queue.add(1);
// queue.add(2);

// console.log(queue.head);
