import { runBench } from "./utils/run-bench.js";

const ITERATIONS = 1_000;

const rand = () => Math.floor(Math.random() * (ITERATIONS + 1));

const createMap = () => {
  const map = {};
  for (let i = 0; i < ITERATIONS; i++) {
    map["$" + i] = true;
  }
  return map;
};

const obj = createMap();

const inTest = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    const key = "$" + rand();
    key in obj;
  }
};

const obj2 = createMap();

const hasOwn = Object.prototype.hasOwnProperty;

const hasOwnTest = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    const key = "$" + rand();
    hasOwn.call(obj2, key);
  }
};

runBench({ name: "in", run: inTest }, { name: "hasOwn", run: hasOwnTest });
