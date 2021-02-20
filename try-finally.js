import { runBench } from "./utils/run-bench.js";

const ITERATIONS = 1_000;

const regular = () => {
  let a = 0;
  let b = 0;
  const fn = () => {
    b += a;
    a++;
  };
  for (let i = 0; i < ITERATIONS; i++) {
    fn();
  }
};

const tryFinally = () => {
  let a = 0;
  let b = 0;
  const fn = () => {
    try {
      b += a;
    } finally {
      a++;
    }
  };
  for (let i = 0; i < ITERATIONS; i++) {
    fn();
  }
};

runBench(
  {
    name: "regular",
    run: regular,
  },
  {
    name: "try finally",
    run: tryFinally,
  }
);
