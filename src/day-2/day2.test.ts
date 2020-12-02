import { validPasswordByCount, countValidPasswordsByCount } from "./day2";

describe("validPasswordByCount", () => {
  test("a simple valid password", () => {
    expect(validPasswordByCount("1-3 a: abcde")).toBe(true);
    expect(validPasswordByCount("1-3 a: abada")).toBe(true);
  });

  test("expected at least 1 a, got 0", () => {
    expect(validPasswordByCount("1-3 a: ubcde")).toBe(false);
  });

  test("expected at least 2 a's, got 1", () => {
    expect(validPasswordByCount("2-3 a: abcde")).toBe(false);
  });

  test("expected at most 2 a's, got 3", () => {
    expect(validPasswordByCount("1-2 a: abada")).toBe(false);
  });

  test("expected at least 2 b's, got 1", () => {
    expect(validPasswordByCount("2-3 b: abada")).toBe(false);
  });

  test("part 1 examples", () => {
    expect(validPasswordByCount("1-3 a: abcde")).toBe(true);
    expect(validPasswordByCount("1-3 b: cdefg")).toBe(false);
    expect(validPasswordByCount("2-9 c: ccccccccc")).toBe(true);
  });
});

describe("countValidPasswordsByCount", () => {
  test("with one valid password", () => {
    expect(countValidPasswordsByCount(["1-3 a: abcde"])).toBe(1);
  });

  test("with one invalid password", () => {
    expect(countValidPasswordsByCount(["1-3 b: cdefg"])).toBe(0);
  });

  test("with one invalid and one valid password", () => {
    expect(countValidPasswordsByCount(["1-3 b: cdefg", "1-3 a: abcde"])).toBe(
      1
    );
  });

  test("part 1 examples for countValidPasswordsByCount", () => {
    expect(
      countValidPasswordsByCount([
        "1-3 a: abcde",
        "1-3 b: cdefg",
        "2-9 c: ccccccccc",
      ])
    ).toBe(2);
  });
});
