import { runBench } from "./run-bench.js";

const ITERATIONS = 1_000;

const dummyArray = Array(1000)
  .fill(null)
  .map(() => Math.random());

const dummyArray2 = Array(1000)
  .fill(null)
  .map(() => Math.random());

// when both arrays have elements
runBench(
  {
    name: "concat with concat",
    run() {
      const combine = (a, b) => a.concat(b);
      for (let i = 0, l = ITERATIONS; i < l; i++) {
        combine(dummyArray.slice(), dummyArray2);
      }
    },
  },
  {
    name: "concat with push",
    run() {
      const combine = (a, b) => a.push.apply(a, b);
      for (let i = 0, l = ITERATIONS; i < l; i++) {
        combine(dummyArray.slice(), dummyArray2);
      }
    },
  },
  {
    name: "concat with spread",
    run() {
      const combine = (a, b) => [...a, ...b];
      for (let i = 0, l = ITERATIONS; i < l; i++) {
        combine(dummyArray.slice(), dummyArray2);
      }
    },
  }
);

// when one array is empty
runBench(
  {
    name: "copy concat",
    run() {
      const combine = (a, b) => a.concat(b);
      for (let i = 0, l = ITERATIONS; i < l; i++) {
        combine([], dummyArray2);
      }
    },
  },
  {
    name: "copy push",
    run() {
      const combine = (a, b) => a.push.apply(a, b);
      for (let i = 0, l = ITERATIONS; i < l; i++) {
        combine([], dummyArray2);
      }
    },
  },
  {
    name: "copy spread",
    run() {
      const combine = (a, b) => [...a, ...b];
      for (let i = 0, l = ITERATIONS; i < l; i++) {
        combine([], dummyArray2);
      }
    },
  }
);

// adding element
runBench(
  {
    name: "add concat",
    run() {
      const combine = (a, b) => a.concat(b);
      for (let i = 0, l = ITERATIONS; i < l; i++) {
        combine(dummyArray.slice(), i);
      }
    },
  },
  {
    name: "add push",
    run() {
      const combine = (a, b) => a.push(b);
      for (let i = 0, l = ITERATIONS; i < l; i++) {
        combine(dummyArray.slice(), i);
      }
    },
  },
  {
    name: "add spread",
    run() {
      const combine = (a, b) => [...a, b];
      for (let i = 0, l = ITERATIONS; i < l; i++) {
        combine(dummyArray.slice(), i);
      }
    },
  }
);
