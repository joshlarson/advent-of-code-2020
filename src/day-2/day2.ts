function parsePolicy(line: string) {
  const [policy, password] = line.split(": ");
  const [bounds, char] = policy.split(" ");
  const [min, max] = bounds.split("-");
  return {
    policyMin: +min,
    policyMax: +max,
    policyChar: char,
    password,
  };
}

export function validPasswordByCount(line: string) {
  const { policyMin, policyMax, policyChar, password } = parsePolicy(line);

  var count = 0;
  for (var ch of password) {
    if (ch == policyChar) {
      count++;
    }
  }

  return count >= policyMin && count <= policyMax;
}

export function validPasswordByLocation(line: string) {
  const { policyMin, policyMax, policyChar, password } = parsePolicy(line);

  var indicesFilled = 0;
  for (var i of [policyMin - 1, policyMax - 1]) {
    if (password[i] == policyChar) {
      indicesFilled++;
    }
  }
  return indicesFilled == 1;
}

export function countValidPasswordsBy(
  lines: string[],
  filter: (line: string) => boolean
) {
  var count = 0;
  for (const line of lines) {
    if (filter(line)) {
      count++;
    }
  }
  return count;
}

export function countValidPasswordsByCount(lines: string[]) {
  return countValidPasswordsBy(lines, validPasswordByCount);
}

export function countValidPasswordsByLocation(lines: string[]) {
  return countValidPasswordsBy(lines, validPasswordByLocation);
}

// const fs = require("fs");
// const contents = fs.readFileSync("files/day2.txt", "utf8");

// const input = contents.split("\n");
// console.log(countValidPasswordsByCount(input));
// console.log(countValidPasswordsByLocation(input));
