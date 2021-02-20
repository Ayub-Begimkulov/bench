import benchmark from "benchmark";

export function runBench(...suites) {
  const suite = benchmark.Suite();
  suites.forEach(({ name, run }) => {
    suite.add(name, run);
  });
  suite
    .on("cycle", event => {
      console.log(String(event.target));
    })
    .on("complete", () => {
      console.log("Fastest is " + suite.filter("fastest").map("name"));
    })
    .run({ async: true });
}
