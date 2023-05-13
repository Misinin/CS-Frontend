import { AdjacencyMatrix } from "./adjacency-matrix";
import { VertexList } from "./vertex-list";

class Graph {
  vertexList: VertexList;
  nVertex: number;
  adjMatrix: AdjacencyMatrix<number>;

  constructor() {
    const vertexList = new VertexList();
    this.vertexList = vertexList;
    const vertexCount = vertexList.items.keys.length;
    this.nVertex = vertexCount;
    this.adjMatrix = new AdjacencyMatrix<number>(vertexCount, vertexCount);
  }

  addVertex(vertex: string) {
    this.vertexList.add(vertex);
    this.adjMatrix.add();
  }

  addEdge(vertex1: string, vertex2: string, value: number) {
    const vertex1Index = this.vertexList.items.indexOf(vertex1);
    const vertex2Index = this.vertexList.items.indexOf(vertex2);

    this.adjMatrix.set(vertex1Index, vertex2Index, value);
  }

  dfs() {
    const visited = new Set();

    const res = [];

    for (let vertex of this.vertexList.items) {
      if (visited.has(vertex)) return;
      visited.add(vertex);

      const stack = [];

      while (stack.length > 0) {}
    }
  }

  hasConnect(vertex1: string, vertex2: string) {
    const indexVertex1 = this.vertexList.items.indexOf(vertex1);
    const indexVertex2 = this.vertexList.items.indexOf(vertex2);

    return !!this.adjMatrix.get(indexVertex1, indexVertex2);
  }
}

const graph = new Graph();

/**
 * Добавление вершин
 */
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("F");

/**
 * Установка отношений
 */
graph.addEdge("A", "B", 1);
graph.addEdge("C", "B", 1);
graph.addEdge("B", "F", 1);
graph.addEdge("D", "F", 1);
/**
 * Добавление веса
 */
// graph.addEdge("B", "A", 2);

// console.log(graph.vertexList);
// console.log(graph.adjMatrix);
