import { describe, expect, test } from "bun:test";
import { createDiffTracker, splitPlainTokens, updateDiffTracker } from "../src/lib/tokenize";

describe("splitPlainTokens", () => {
  test("splits words while preserving whitespace tokens", () => {
    expect(splitPlainTokens("hello world", "word")).toEqual(["hello", " ", "world"]);
  });

  test("splits unicode characters without empty fragments", () => {
    expect(splitPlainTokens("a🙂b", "char")).toEqual(["a", "🙂", "b"]);
  });
});

describe("updateDiffTracker", () => {
  test("appends only newly streamed content", () => {
    const tracker = createDiffTracker();

    expect(updateDiffTracker(tracker, "Hello")).toEqual([{ text: "Hello", source: 0 }]);
    expect(updateDiffTracker(tracker, "Hello world")).toEqual([
      { text: "Hello", source: 0 },
      { text: " world", source: 1 },
    ]);
  });

  test("resets when streamed content shrinks", () => {
    const tracker = createDiffTracker();
    updateDiffTracker(tracker, "Hello world");

    expect(updateDiffTracker(tracker, "Hi")).toEqual([{ text: "Hi", source: 0 }]);
  });

  test("replaces tokens when content diverges", () => {
    const tracker = createDiffTracker();
    updateDiffTracker(tracker, "alpha");

    expect(updateDiffTracker(tracker, "beta")).toEqual([{ text: "beta", source: 0 }]);
  });
});
