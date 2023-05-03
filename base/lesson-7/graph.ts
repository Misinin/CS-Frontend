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
}

const graph = new Graph();

/**
 * Добавление вершин
 */
graph.addVertex("A");
graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addVertex("F");

/**
 * Установка отношений
 */
graph.addEdge("A", "B", 1);
/**
 * Добавление веса
 */
// graph.addEdge("B", "A", 2);

console.log(graph.vertexList);
console.log(graph.adjMatrix);
