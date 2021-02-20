import { runBench } from "../utils/run-bench";

const ITERATIONS = 1000;

runBench(
  {
    name: "qs",
    run() {
      for (let i = 0; i < ITERATIONS; i++) {
        document.querySelectorAll("div");
      }
    },
  },
  {
    name: "walker",
    run() {
      for (let i = 0; i < ITERATIONS; i++) {
        findAll();
      }
    },
  }
);

function findAll() {
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT
  );
  const result = [];
  let current = null;
  while ((current = treeWalker.nextNode())) {
    if (current instanceof HTMLDivElement) {
      result.push(current);
    }
  }
  return result;
}
