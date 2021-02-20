import { runBench } from "./utils/run-bench.js";

const ITERATIONS = 10_000;

const arr = Array(9)
  .fill(null)
  .map(() => Math.random());

const arr2 = Array(9)
  .fill(null)
  .map(() => {});

const anotherFn = (a, b, c, d, e, f, g, h, i) => {
  return a + b + c + d + e + f + g + h + i;
};

const anotherFn2 = (a, b, c, d, e, f, g, h, i) => {
  return { a, b, c, d, e, f, g, h, i };
};

// const test = (...args) => {
//   return anotherFn(...args);
// };

// function test2() {
//   return anotherFn.apply(null, arguments);
// }

runBench(
  {
    name: "spread",
    run() {
      for (let i = 0; i < ITERATIONS; i++) {
        anotherFn2(...arr2);
      }
    },
  },
  {
    name: "apply",
    run() {
      for (let i = 0; i < ITERATIONS; i++) {
        anotherFn2.apply(null, arr2);
        // test2(...arr);
      }
    },
  }
);
