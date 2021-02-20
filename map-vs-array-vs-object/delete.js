import { runBench } from "../utils/run-bench.js";

const rand = () => Math.floor(Math.random() * (ITERATIONS + 1));

const ITERATIONS = 1_000;

const createMap = () => {
  const map = new Map();
  for (let i = 0; i < ITERATIONS; i++) {
    map.set("$" + i, true);
  }
  return map;
};

const createArray = () => {
  const arr = [];
  for (let i = 0; i < ITERATIONS; i++) {
    arr.push("$" + i);
  }
  return arr;
};
const map = createMap();

const mapDelete = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    map.delete("$" + rand());
  }
};

const arr = createArray();

const arraySplice = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    const idx = arr.indexOf("$" + rand());
    if (idx > -1) {
      arr.splice(idx, 1);
    }
  }
};

let filterArray = createArray();

const arrayFilter = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    const idx = "$" + rand();
    filterArray = filterArray.filter(item => item !== idx);
  }
};

const obj = Object.fromEntries(map.entries());

const objDelete = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    delete obj["$" + rand()];
  }
};

runBench(
  { name: "Map.delete", run: mapDelete },
  { name: "Array.splice + Array.indexOf", run: arraySplice },
  { name: "Array.filter", run: arrayFilter },
  { name: "delete with object", run: objDelete }
);
