function getMemory() {
  if (typeof window === "object") {
    return {
      totalJSHeapSize: window.performance.memory.totalJSHeapSize,
      usedJSHeapSize: window.performance.memory.usedJSHeapSize,
    };
  }

  const memoryUsage = process.memoryUsage();

  return {
    totalJSHeapSize: memoryUsage.heapTotal,
    usedJSHeapSize: memoryUsage.heapUsed,
  };
}

function test1(length) {
  class Test {
    a = 5;

    getA() {
      return this.a;
    }

    logA() {
      console.log(this.a);
    }
  }

  const allObjects = Array(length);
  globalThis.allObjects = allObjects;

  const startMemory = getMemory();

  for (let i = 0; i < length; i++) {
    allObjects[i] = new Test();
  }

  const endMemory = getMemory();

  console.log("diff", {
    used: endMemory.usedJSHeapSize - startMemory.usedJSHeapSize,
    total: endMemory.totalJSHeapSize - startMemory.totalJSHeapSize,
  });
}

function test2(length) {
  function createTestObject() {
    return {
      a: 5,
      getA() {
        return this.a;
      },
      logA() {
        console.log(this.a);
      },
    };
  }

  const allObjects = Array(length);
  globalThis.allObjects = allObjects;

  const startMemory = getMemory();

  for (let i = 0; i < length; i++) {
    allObjects[i] = createTestObject();
  }

  const endMemory = getMemory();

  console.log("diff", {
    used: endMemory.usedJSHeapSize - startMemory.usedJSHeapSize,
    total: endMemory.totalJSHeapSize - startMemory.totalJSHeapSize,
  });
}
