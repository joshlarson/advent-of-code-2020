export function findNumbersForSum(
  input: string[],
  sum: number,
  outputSize: number,
  startingIndex = 0
) {
  if (outputSize === 0) {
    if (sum == 0) {
      return [];
    } else {
      return undefined;
    }
  }

  for (var i = 0; i < input.length; i++) {
    const x = +input[i];
    const restOfNumbers = findNumbersForSum(
      input,
      sum - x,
      outputSize - 1,
      startingIndex + 1
    );
    if (restOfNumbers != undefined) {
      return [x].concat(restOfNumbers);
    }
  }
}

export function findProductGivenSum(
  input: string[],
  sum: number,
  outputSize: number
) {
  const numbers: number[] = findNumbersForSum(input, sum, outputSize);
  var result = 1;
  for (var x of numbers) {
    result = result * <number>x;
  }
  return result;
}

// const fs = require("fs");
// const contents = fs.readFileSync("files/day1.txt", "utf8");

// const input = contents.split("\n");
// console.log(findProductGivenSum(input, 2020, 2));
// console.log(findProductGivenSum(input, 2020, 3));
