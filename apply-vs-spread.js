import { runBench } from "./run-bench.js";

const ITERATIONS = 1_000;

const arr = Array(9)
  .fill(null)
  .map(() => Math.random());

const anotherFn = (a, b, c, d, e, f, g, h, i) => {
  return a + b + c + d + e + f + g + h + i;
};

const test = (...args) => {
  return anotherFn(...args);
};

function test2() {
  return anotherFn.apply(null, arguments);
}

runBench(
  {
    name: "spread",
    run() {
      for (let i = 0; i < ITERATIONS; i++) {
        test(...arr);
      }
    },
  },
  {
    name: "apply",
    run() {
      for (let i = 0; i < ITERATIONS; i++) {
        test2(...arr);
      }
    },
  }
);
