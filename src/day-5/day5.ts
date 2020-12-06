import { isConstructorDeclaration } from "typescript";

export function seatId(description: string): number {
  return parseInt(
    description
      .replace(/B/g, "1")
      .replace(/F/g, "0")
      .replace(/L/g, "0")
      .replace(/R/g, "1"),
    2
  );
}

function max(a: number, b: number): number {
  if (a > b) {
    return a;
  } else {
    return b;
  }
}

export function maxSeatId(descriptions: string[]): number {
  return descriptions.map(seatId).reduce(max, -1);
}

const fs = require("fs");
const contents = fs.readFileSync("files/day5.txt", "utf8");

const input = contents.split("\n");

console.log(maxSeatId(input));
