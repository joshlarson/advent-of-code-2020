import { AdapterGroup } from "./day10";

describe("AdapterGroup", () => {
  describe("differenceCounts", () => {
    test("when there is one adapter with a value of 1", () => {
      const differenceCounts = new AdapterGroup([1]).getDifferenceCounts();
      expect(differenceCounts).toStrictEqual({ 1: 1, 2: 0, 3: 1 });
    });

    test("when there is one adapter with a value of 2", () => {
      const differenceCounts = new AdapterGroup([2]).getDifferenceCounts();
      expect(differenceCounts).toStrictEqual({ 1: 0, 2: 1, 3: 1 });
    });

    test("when there are two adapters with values of 1 and 2", () => {
      const differenceCounts = new AdapterGroup([1, 2]).getDifferenceCounts();
      expect(differenceCounts).toStrictEqual({ 1: 2, 2: 0, 3: 1 });
    });

    test("when there are two adapters not sorted", () => {
      const differenceCounts = new AdapterGroup([2, 1]).getDifferenceCounts();
      expect(differenceCounts).toStrictEqual({ 1: 2, 2: 0, 3: 1 });
    });

    test("part 1 example", () => {
      const differenceCounts = new AdapterGroup([
        16,
        10,
        15,
        5,
        1,
        11,
        7,
        19,
        6,
        12,
        4,
      ]).getDifferenceCounts();
      expect(differenceCounts).toStrictEqual({ 1: 7, 2: 0, 3: 5 });
    });
  });

  describe("arrangementCount", () => {
    test("when there is one adapter (the last adapter can never be removed)", () => {
      expect(new AdapterGroup([1]).getArrangementCount()).toBe(1);
    });

    test("when there are two adapters and the first one can be removed", () => {
      expect(new AdapterGroup([1, 2]).getArrangementCount()).toBe(2);
      expect(new AdapterGroup([2, 3]).getArrangementCount()).toBe(2);
    });

    test("when there are two adapters and the first one cannot be removed", () => {
      expect(new AdapterGroup([3, 4]).getArrangementCount()).toBe(1);
    });

    test("when there are three adapters and either of the first two could be removed", () => {
      expect(new AdapterGroup([1, 2, 3]).getArrangementCount()).toBe(4);
    });

    test("when there are three adapters but the first one also can't be removed and either of the first two could be removed", () => {
      expect(new AdapterGroup([3, 4, 5]).getArrangementCount()).toBe(2);
    });

    test("when there are three adapters and either of the first two could be removed but not both", () => {
      expect(new AdapterGroup([2, 3, 5]).getArrangementCount()).toBe(3);
    });

    test("part 2 example 1", () => {
      expect(
        new AdapterGroup([
          16,
          10,
          15,
          5,
          1,
          11,
          7,
          19,
          6,
          12,
          4,
        ]).getArrangementCount()
      ).toBe(8);
    });

    test("part 2 example 2", () => {
      expect(
        new AdapterGroup([
          28,
          33,
          18,
          42,
          31,
          14,
          46,
          20,
          48,
          47,
          24,
          23,
          49,
          45,
          19,
          38,
          39,
          11,
          1,
          32,
          25,
          35,
          8,
          17,
          7,
          9,
          4,
          2,
          34,
          10,
          3,
        ]).getArrangementCount()
      ).toBe(19208);
    });
  });
});
