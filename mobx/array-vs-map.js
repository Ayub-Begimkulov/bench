import { observable, action, autorun } from "mobx";
import { runBench } from "../utils/run-bench.js";

const ITERATIONS = 1_00;

const randomString = () => "$" + Math.random();

const rand = () => Math.floor(Math.random() * (ITERATIONS + 1));

const randomIds = Array(ITERATIONS).fill(null).map(randomString);

const generateArrayStore = () => {
  const initialState = [];
  for (let i = 0; i < randomIds.length; i++) {
    const id = randomIds[i];
    initialState.push({
      id,
      name: randomString(),
    });
  }
  const store = observable(initialState);
  const updateName = action(id => {
    const item = store.find(e => e.id === id);
    if (item) {
      item.name = randomString();
    }
  });
  autorun(() => JSON.stringify(store));
  return { store, updateName };
};

const generateMapStore = () => {
  const initialState = {};
  for (let i = 0; i < randomIds.length; i++) {
    const id = randomIds[i];
    initialState[id] = {
      id,
      name: randomString(),
    };
  }
  const store = observable.map(initialState);
  const updateName = action(id => {
    const item = store.get(id);
    if (item) {
      item.name = randomString();
    }
  });
  autorun(() => JSON.stringify(store));
  return { store, updateName };
};

const idsToUpdate = Array(ITERATIONS)
  .fill(null)
  .map(() => randomIds[rand()]);

const arrayStore = generateArrayStore();
const mapStore = generateMapStore();

runBench(
  {
    name: "mobx-array",
    run() {
      for (let i = 0, len = idsToUpdate.length; i < len; i++) {
        arrayStore.updateName(idsToUpdate[i]);
      }
    },
  },
  {
    name: "mobx-map",
    run() {
      for (let i = 0, len = idsToUpdate.length; i < len; i++) {
        mapStore.updateName(idsToUpdate[i]);
      }
    },
  }
);
