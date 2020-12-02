export function findNumbersForSum(input: string[], sum: number) {
  for (var i = 0; i < input.length; i++) {
    const x = parseInt(input[i]);
    for (var j = 1; j < input.length; j++) {
      const y = parseInt(input[j]);

      if (x + y === sum) {
        return [x, y];
      }
    }
  }
}

export function findProductGivenSum(input: string[], sum: number) {
  const [x, y] = findNumbersForSum(input, sum);
  return x * y;
}

export function findNumbersForSum3(input: string[], sum: number) {
  for (var i = 0; i < input.length; i++) {
    const x = parseInt(input[i]);
    for (var j = 1; j < input.length; j++) {
      const y = parseInt(input[j]);
      for (var k = 1; k < input.length; k++) {
        const z = parseInt(input[k]);

        if (x + y + z === sum) {
          return [x, y, z];
        }
      }
    }
  }
}

export function findProductGivenSum3(input: string[], sum: number) {
  const [x, y, z] = findNumbersForSum3(input, sum);
  return x * y * z;
}

const fs = require("fs");
const contents = fs.readFileSync("files/day1.txt", "utf8");

const input = contents.split("\n");
console.log(findProductGivenSum(input, 2020));
console.log(findProductGivenSum3(input, 2020));
