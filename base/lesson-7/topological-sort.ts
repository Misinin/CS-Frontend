const startGraph = [
  {
    value: "a",
    rel: ["b", "c"],
  },
  {
    value: "b",
    rel: ["d"],
  },
  {
    value: "c",
    rel: ["d"],
  },
  {
    value: "d",
    rel: ["e"],
  },
  {
    value: "e",
    rel: [],
  },
];

function sort(graph) {
  const map = new Map(graph.map(({ value, rel }) => [value, { value, rel }]));

  const queue = new Set();

  graph.forEach(({ value }) => {
    traverse(value);
  });

  function traverse(value) {
    const { rel } = map.get(value);

    if (rel.length === 0) {
      queue.add(value);
      return;
    }

    if (queue.has(value)) return;

    rel.forEach((value) => {
      traverse(value);
    });

    queue.add(value);
  }

  return [...queue].reverse();
}

console.log(sort(startGraph));
