import { describe, expect, test } from "bun:test";
import { mapStreamdownAnimation, resolveAnimationName } from "../src/lib/animations";

describe("resolveAnimationName", () => {
  test("maps known FlowToken names to CSS keyframes", () => {
    expect(resolveAnimationName("fadeIn")).toBe("ft-fadeIn");
    expect(resolveAnimationName("blurIn")).toBe("ft-blurIn");
  });

  test("passes through custom animation names", () => {
    expect(resolveAnimationName("myCustom")).toBe("myCustom");
  });
});

describe("mapStreamdownAnimation", () => {
  test("maps fade-like animations to boolean true", () => {
    expect(mapStreamdownAnimation("fadeIn")).toBe(true);
    expect(mapStreamdownAnimation("typewriter")).toBe(true);
  });

  test("maps blur and slide variants", () => {
    expect(mapStreamdownAnimation("blurIn")).toBe("blur");
    expect(mapStreamdownAnimation("slideUp")).toBe("slide-up");
    expect(mapStreamdownAnimation("dropIn")).toBe("slide-down");
  });
});
