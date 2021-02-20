import { runBench } from "../utils/run-bench.js";

const ITERATIONS = 10_000;

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

const rand = () => Math.floor(Math.random() * (ITERATIONS + 1));

// runBench(
//   { name: "Map.set", run: createMap },
//   { name: "Array.push", run: createArray }
// );

const map = createMap();
const mapHas = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    map.has("$" + rand());
  }
};

const arr = createArray();
const arrayIncludes = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    arr.includes("$" + rand());
  }
};

const obj = Object.fromEntries(map.entries());

// runBench(
//   { name: "Map.has", run: mapHas },
//   { name: "Array.includes", run: arrayIncludes },
//   {
//     name: "Object lookup",
//     run: () => {
//       for (let i = 0; i < ITERATIONS; i++) {
//         obj[rand()];
//       }
//     },
//   }
// );

const map2 = createMap();

const mapDelete = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    map2.delete("$" + rand());
  }
};

const arr2 = createArray();

const arraySplice = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    const idx = arr2.indexOf("$" + rand());
    if (idx > -1) {
      arr2.splice(idx, 1);
    }
  }
};

runBench(
  { name: "Map.delete", run: mapDelete },
  { name: "Array.splice + Array.indexOf", run: arraySplice }
);

const map3 = createMap();

const mapForEach = () => {
  map3.forEach(v => v);
};

const arr3 = createArray();

const arrForEach = () => {
  arr3.forEach(v => v);
};

runBench(
  { name: "Map.forEach", run: mapForEach },
  { name: "Array.forEach", run: arrForEach }
);
