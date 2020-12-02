import { findNumbersForSum, findProductGivenSum } from ".";

test("findNumbersForSum with two numbers", () => {
  expect(findNumbersForSum(["1", "2"], 3)).toStrictEqual([1, 2]);
  expect(findNumbersForSum(["1", "2"], 5)).toBe(undefined);
});

test("findNumbersForSum with more than two numbers", () => {
  expect(findNumbersForSum(["1", "2", "4"], 3)).toStrictEqual([1, 2]);
  expect(findNumbersForSum(["1", "2", "4"], 5)).toStrictEqual([1, 4]);
  expect(findNumbersForSum(["1", "2", "4"], 6)).toStrictEqual([2, 4]);
});

test("findProductGivenSum with more than two numbers", () => {
  expect(findProductGivenSum(["1", "2", "4"], 3)).toBe(2);
  expect(findProductGivenSum(["1", "2", "4"], 5)).toBe(4);
  expect(findProductGivenSum(["1", "2", "4"], 6)).toBe(8);
});
