export class Preambulator {
  preambleLength: number;
  data: number[];

  constructor(preambleLength: number, data: number[]) {
    this.preambleLength = preambleLength;
    this.data = data;
  }

  isValid(index: number): boolean {
    if (index < this.preambleLength) {
      return true;
    }

    for (var i = 1; i <= this.preambleLength; i++) {
      for (var j = i + 1; j <= this.preambleLength; j++) {
        if (this.data[index - j] + this.data[index - i] == this.data[index]) {
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
}

const fs = require("fs");
const contents = fs.readFileSync("files/day9.txt", "utf8");

const input = contents.split("\n").map((i) => parseInt(i));
const grid = new Preambulator(25, input);
console.log(grid.firstInvalid());
