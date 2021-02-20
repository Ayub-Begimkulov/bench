import { onSnapshot, types } from "mobx-state-tree";
import { runBench } from "../utils/run-bench.js";

const ITERATIONS = 1_00;

const randomString = () => "$" + Math.random();

const rand = () => Math.floor(Math.random() * (ITERATIONS + 1));

const randomIds = Array(ITERATIONS).fill(null).map(randomString);

const Entity = types.model({
  id: types.identifier,
  name: types.string,
});

const ArrayStore = types
  .model({
    array: types.array(Entity),
  })
  .actions(self => ({
    updateName(id) {
      const item = self.array.find(e => e.id === id);
      if (item) {
        item.name = randomString();
      }
    },
  }));

const MapStore = types
  .model({
    map: types.map(Entity),
  })
  .actions(self => ({
    updateName(id) {
      const item = self.map.get(id);
      if (item) {
        item.name = randomString();
      }
    },
  }));

const generateArrayStore = () => {
  const initialState = [];
  for (let i = 0; i < randomIds.length; i++) {
    const id = randomIds[i];
    initialState.push({
      id,
      name: randomString(),
    });
  }
  const store = ArrayStore.create({
    array: initialState,
  });
  onSnapshot(store, snap => snap);
  return store;
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
  const store = MapStore.create({
    map: initialState,
  });
  onSnapshot(store, snap => snap);
  return store;
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
