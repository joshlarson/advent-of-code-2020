function parsePolicy(policy: string) {
  const [bounds, char] = policy.split(" ");
  const [min, max] = bounds.split("-");
  return {
    policyMin: +min,
    policyMax: +max,
    policyChar: char,
  };
}

export function validPasswordByCount(line: string) {
  const [policy, password] = line.split(": ");

  const { policyMin, policyMax, policyChar } = parsePolicy(policy);

  var count = 0;
  for (var ch of password) {
    if (ch == policyChar) {
      count++;
    }
  }

  return count >= policyMin && count <= policyMax;
}

export function countValidPasswordsByCount(lines: string[]) {
  var count = 0;
  for (const line of lines) {
    if (validPasswordByCount(line)) {
      count++;
    }
  }
  return count;
}

// const fs = require("fs");
// const contents = fs.readFileSync("files/day2.txt", "utf8");

// const input = contents.split("\n");
// console.log(countValidPasswordsByCount(input));
