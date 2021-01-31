import { runBench } from "./run-bench.js";

const hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(value, key) {
  return hasOwnProperty.call(value, key);
}

function reduceObject(obj, reducer, initialState) {
  let result = initialState;
  for (const key in obj) {
    if (hasOwn(obj, key)) {
      result = reducer(result, obj[key], key, obj);
    }
  }
  return result;
}

function mapObject(obj, mapper) {
  const result = [];
  for (const key in obj) {
    if (hasOwn(obj, key)) {
      result[key] = mapper(obj, key);
    }
  }
  return result;
}

const testObj = {};

for (let i = 0; i < 1000; i++) {
  testObj["$" + 1] = Math.random();
}

runBench(
  {
    name: "mapObject",
    run() {
      mapObject(testObj, v => v);
    },
  },
  {
    name: "reduceObject",
    run() {
      reduceObject(
        testObj,
        (acc, value) => {
          acc.push(value);
          return acc;
        },
        []
      );
    },
  },
  {
    name: "objectKeys",
    run() {
      Object.keys(testObj).map(key => testObj[key]);
    },
  }
);
