import { Preambulator } from "./day9";

describe("Preambulator", () => {
  describe("validity", () => {
    describe("with a preamble of size 2", () => {
      test("the first two values are valid by default", () => {
        const preambulator = new Preambulator(2, [1, 2, 3]);
        expect(preambulator.isValid(0)).toBe(true);
        expect(preambulator.isValid(1)).toBe(true);
      });

      test("the third value is invalid if it is not the sum of the first two", () => {
        const preambulator = new Preambulator(2, [1, 2, 5]);
        expect(preambulator.isValid(2)).toBe(false);
      });

      test("the third value is valid if it is the sum of the first two", () => {
        const preambulator = new Preambulator(2, [1, 2, 3]);
        expect(preambulator.isValid(2)).toBe(true);
      });

      test("the fourth value is invalid if it is not the sum of the second and third", () => {
        const preambulator = new Preambulator(2, [1, 2, 3, 4]);
        expect(preambulator.isValid(3)).toBe(false);
      });

      test("the fourth value is valid if it is the sum of the second and third", () => {
        const preambulator = new Preambulator(2, [1, 2, 3, 5]);
        expect(preambulator.isValid(3)).toBe(true);
      });
    });

    describe("with a preamble of size 3", () => {
      test("the first three values are valid by default", () => {
        const preambulator = new Preambulator(3, [1, 2, 4, 6]);
        expect(preambulator.isValid(0)).toBe(true);
        expect(preambulator.isValid(1)).toBe(true);
        expect(preambulator.isValid(2)).toBe(true);
      });

      test("the fourth value is not valid if it's not the sum of any of the first three", () => {
        const preambulator = new Preambulator(3, [1, 2, 4, 8]);
        expect(preambulator.isValid(3)).toBe(false);
      });

      test("the fourth value is valid if it's the sum of the second and third", () => {
        const preambulator = new Preambulator(3, [1, 2, 4, 6]);
        expect(preambulator.isValid(3)).toBe(true);
      });

      test("the fourth value is valid if it's the sum of the first and third", () => {
        const preambulator = new Preambulator(3, [1, 2, 4, 5]);
        expect(preambulator.isValid(3)).toBe(true);
      });

      test("the fourth value is valid if it's the sum of the first and second", () => {
        const preambulator = new Preambulator(3, [1, 2, 4, 3]);
        expect(preambulator.isValid(3)).toBe(true);
      });

      test("can get the first invalid value", () => {
        const preambulator = new Preambulator(3, [1, 2, 4, 8]);
        expect(preambulator.firstInvalid()).toBe(8);
      });
    });

    describe("with a preamble of size 5", () => {
      test("part 1 example", () => {
        const preambulator = new Preambulator(5, [
          35,
          20,
          15,
          25,
          47,
          40,
          62,
          55,
          65,
          95,
          102,
          117,
          150,
          182,
          127,
          219,
          299,
          277,
          309,
          576,
        ]);
        expect(preambulator.isValid(13)).toBe(true);
        expect(preambulator.isValid(14)).toBe(false);
        expect(preambulator.isValid(15)).toBe(true);

        expect(preambulator.firstInvalid()).toBe(127);
      });
    });
  });

  describe("sumThru", () => {
    test("can sum two consecutive items", () => {
      const preambulator = new Preambulator(3, [1, 2, 4, 8]);
      expect(preambulator.sumThru(0, 1)).toBe(3);
      expect(preambulator.sumThru(1, 2)).toBe(6);
      expect(preambulator.sumThru(2, 3)).toBe(12);
    });

    test("can sum three items in a row", () => {
      const preambulator = new Preambulator(3, [1, 2, 4, 8]);
      expect(preambulator.sumThru(0, 2)).toBe(7);
      expect(preambulator.sumThru(1, 3)).toBe(14);
    });
  });

  describe("findBorderForSum", () => {
    test("works when the region has only two items", () => {
      const preambulator = new Preambulator(3, [1, 2, 4, 8]);
      expect(preambulator.findExtremaForSum(3)).toBe(3);
    });

    test("excludes the middle when the first item is at the beginning", () => {
      const preambulator = new Preambulator(3, [1, 2, 4, 8]);
      expect(preambulator.findExtremaForSum(7)).toBe(5);
      expect(preambulator.findExtremaForSum(15)).toBe(9);
    });

    test("excludes the middle when the first item is at the beginning and the items are not sorted", () => {
      const preambulator = new Preambulator(3, [4, 1, 2, 8]);
      expect(preambulator.findExtremaForSum(7)).toBe(5);
      expect(preambulator.findExtremaForSum(15)).toBe(9);
    });

    test("excludes the middle when the first item is not at the beginning", () => {
      const preambulator = new Preambulator(3, [1, 2, 8, 4]);
      expect(preambulator.findExtremaForSum(14)).toBe(10);
    });
  });
});
