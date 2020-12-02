import { findNumbersForSum, findProductGivenSum } from ".";

test("findNumbersForSum when the desired list size is 1", () => {
  expect(findNumbersForSum(["1"], 1, 1)).toStrictEqual([1]);
  expect(findNumbersForSum(["2"], 1, 1)).toStrictEqual(undefined);
  expect(findNumbersForSum(["1", "2"], 2, 1)).toStrictEqual([2]);
});

test("findNumbersForSum when the desired list size is 2", () => {
  expect(findNumbersForSum(["1", "2"], 3, 2)).toStrictEqual([1, 2]);
  expect(findNumbersForSum(["1", "2"], 5, 2)).toBe(undefined);
  expect(findNumbersForSum(["1", "2", "4"], 3, 2)).toStrictEqual([1, 2]);
  expect(findNumbersForSum(["1", "2", "4"], 5, 2)).toStrictEqual([1, 4]);
  expect(findNumbersForSum(["1", "2", "4"], 6, 2)).toStrictEqual([2, 4]);
});

test("findNumbersForSum when the desired list size is 3", () => {
  expect(findNumbersForSum(["1", "2", "4"], 7, 3)).toStrictEqual([1, 2, 4]);
  expect(findNumbersForSum(["1", "2", "4", "8"], 7, 3)).toStrictEqual([
    1,
    2,
    4,
  ]);
  expect(findNumbersForSum(["1", "2", "4", "8"], 11, 3)).toStrictEqual([
    1,
    2,
    8,
  ]);
  expect(findNumbersForSum(["1", "2", "4", "8"], 13, 3)).toStrictEqual([
    1,
    4,
    8,
  ]);
  expect(findNumbersForSum(["1", "2", "4", "8"], 14, 3)).toStrictEqual([
    2,
    4,
    8,
  ]);
});

test("findProductGivenSum when the desired list size is 3", () => {
  expect(findProductGivenSum(["1", "2", "4"], 7, 3)).toStrictEqual(8);
  expect(findProductGivenSum(["1", "2", "4", "8"], 7, 3)).toStrictEqual(8);
  expect(findProductGivenSum(["1", "2", "4", "8"], 11, 3)).toStrictEqual(16);
  expect(findProductGivenSum(["1", "2", "4", "8"], 13, 3)).toStrictEqual(32);
  expect(findProductGivenSum(["1", "2", "4", "8"], 14, 3)).toStrictEqual(64);
});
