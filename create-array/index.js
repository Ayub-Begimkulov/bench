import { runBench } from "../utils/run-bench.js";

const ITERATIONS = 100_000;

const forEmptyArr = () => {
  const arr = [];
  for (let i = 0; i < ITERATIONS; i++) {
    arr.push(Math.random());
  }
};

const forArrayOfLength = () => {
  const arr = Array(ITERATIONS);
  for (let i = 0; i < ITERATIONS; i++) {
    arr[i] = Math.random();
  }
};

const arrayFrom = () => {
  Array.from({ length: ITERATIONS }, Math.random);
};

runBench(
  { name: "for + empty array", run: forEmptyArr },
  { name: "for + array of length array", run: forArrayOfLength },
  { name: "array from", run: arrayFrom }
);
