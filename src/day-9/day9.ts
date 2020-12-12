import { maxHeaderSize } from "http";

export class Preambulator {
  preambleLength: number;
  data: number[];
  sumData: number[];

  constructor(preambleLength: number, data: number[]) {
    this.preambleLength = preambleLength;
    this.data = data;
    this.sumData = [0];
    var sum = 0;
    for (const item of data) {
      sum += item;
      this.sumData.push(sum);
    }
  }

  isValid(index: number): boolean {
    if (index < this.preambleLength) {
      return true;
    }

    for (var i = 1; i <= this.preambleLength; i++) {
      for (var j = i + 1; j <= this.preambleLength; j++) {
        if (this.data[index - j] + this.data[index - i] === this.data[index]) {
          return true;
        }
      }
    }
    return false;
  }

  firstInvalid(): number {
    for (var i = 0; i < this.data.length; i++) {
      if (!this.isValid(i)) {
        return this.data[i];
      }
    }
  }

  sumThru(begindex: number, endex: number): number {
    return this.sumData[endex + 1] - this.sumData[begindex];
  }

  findExtremaForSum(fullSum: number): number {
    for (var i = 0; i <= this.data.length; i++) {
      for (var j = i; j < this.data.length; j++) {
        if (this.sumThru(i, j) === fullSum) {
          return (
            Math.min(...this.data.slice(i, j + 1)) +
            Math.max(...this.data.slice(i, j + 1))
          );
        }
      }
    }
  }
}

const fs = require("fs");
const contents = fs.readFileSync("files/day9.txt", "utf8");

const input = contents.split("\n").map((i) => parseInt(i));
const grid = new Preambulator(25, input);
console.log(grid.firstInvalid());
console.log(grid.findExtremaForSum(grid.firstInvalid()));
