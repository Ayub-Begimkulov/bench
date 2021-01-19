import { runBench } from "./run-bench.js";

const ITERATIONS = 10_000;

const dummy = new Array(ITERATIONS).fill(() => ({}));

const setAdd = () => {
  const set = new Set();
  for (let i = 0; i < ITERATIONS; i++) {
    set.add(dummy[i]);
  }
  return set;
};

const arrayPush = () => {
  const arr = [];
  for (let i = 0; i < ITERATIONS; i++) {
    arr.push(dummy[i]);
  }
  return arr;
};

const rand = () => Math.floor(Math.random() * (ITERATIONS + 1));

// runBench(
//   { name: "Set.add", run: setAdd },
//   { name: "Array.push", run: arrayPush }
// );

const setHas = () => {
  const set = setAdd();
  for (let i = 0; i < ITERATIONS; i++) {
    set.has(dummy[rand()]);
  }
};

const arrayIncludes = () => {
  const arr = arrayPush();
  for (let i = 0; i < ITERATIONS; i++) {
    arr.includes(dummy[rand()]);
  }
};

runBench(
  { name: "Set.has", run: setHas },
  { name: "Array.includes", run: arrayIncludes }
);

const set = setAdd();

const setDelete = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    set.delete(dummy[rand()]);
  }
};

const arr = arrayPush();

const arraySplice = () => {
  for (let i = 0; i < ITERATIONS; i++) {
    const idx = arr.indexOf(dummy[rand()]);
    if (idx > -1) {
      arr.splice(idx, 1);
    }
  }
};

runBench(
  { name: "Set.delete", run: setDelete },
  { name: "Array.splice + Array.indexOf", run: arraySplice }
);

const set2 = setAdd();

const setForEach = () => {
  set2.forEach(v => v);
};

const arr2 = arrayPush();

const arrForEach = () => {
  arr2.forEach(v => v);
};

// runBench(
//   { name: "Set.forEach", run: setForEach },
//   { name: "Array.forEach", run: arrForEach }
// );
