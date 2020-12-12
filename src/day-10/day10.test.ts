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
});
