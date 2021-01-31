import { runBench } from "./run-bench.js";

const ITERATIONS = 1000;

const map = new Map(
  Array(ITERATIONS)
    .fill(null)
    .map(() => [{}, Math.random()])
);

const arrayFromIterable = iterable => {
  const arr = [];
  let next;
  while ((next = iterable.next()) && !next.done) {
    arr.push(next.value);
  }
  return arr;
};

runBench(
  {
    name: "spread",
    run() {
      for (let i = 0, l = ITERATIONS; i < l; i++) {
        [...map.keys()];
      }
    },
  },
  {
    name: "Array.from",
    run() {
      for (let i = 0, l = ITERATIONS; i < l; i++) {
        Array.from(map.keys());
      }
    },
  },
  {
    name: "arrayFromIterable",
    run() {
      for (let i = 0, l = ITERATIONS; i < l; i++) {
        arrayFromIterable(map.keys());
      }
    },
  }
);
