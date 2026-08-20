import { describe, expect, test } from "bun:test";
import { createDiffState, nextDiffState, splitPlainTokens } from "../src/lib/tokenize";

describe("splitPlainTokens", () => {
  test("splits words while preserving whitespace tokens", () => {
    expect(splitPlainTokens("hello world", "word")).toEqual(["hello", " ", "world"]);
  });

  test("splits unicode characters without empty fragments", () => {
    expect(splitPlainTokens("a🙂b", "char")).toEqual(["a", "🙂", "b"]);
  });
});

describe("nextDiffState", () => {
  test("returns the same reference when input is unchanged", () => {
    const state = nextDiffState(createDiffState(), "Hello");
    expect(nextDiffState(state, "Hello")).toBe(state);
  });

  test("appends only newly streamed content", () => {
    let state = createDiffState();
    state = nextDiffState(state, "Hello");
    expect(state.tokens).toEqual([{ text: "Hello", source: 0 }]);

    state = nextDiffState(state, "Hello world");
    expect(state.tokens).toEqual([
      { text: "Hello", source: 0 },
      { text: " world", source: 1 },
    ]);
  });

  test("resets when streamed content shrinks", () => {
    let state = createDiffState();
    state = nextDiffState(state, "Hello world");
    state = nextDiffState(state, "Hi");
    expect(state.tokens).toEqual([{ text: "Hi", source: 0 }]);
  });

  test("replaces tokens when content diverges", () => {
    let state = createDiffState();
    state = nextDiffState(state, "alpha");
    state = nextDiffState(state, "beta");
    expect(state.tokens).toEqual([{ text: "beta", source: 0 }]);
  });
});
