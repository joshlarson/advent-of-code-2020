export class TreeGrid {
  lines: string[];
  constructor(lines: string[]) {
    this.lines = lines;
  }

  treeAt(row: number, col: number): number {
    if (this.lines[row][col % this.lines[row].length] == "#") {
      return 1;
    } else {
      return 0;
    }
  }

  treesEncountered(): number {
    var trees = 0;
    var col = 0;
    for (var row = 0; row < this.lines.length; row++) {
      trees += this.treeAt(row, col);
      col += 3;
    }
    return trees;
  }
}

const fs = require("fs");
const contents = fs.readFileSync("files/day3.txt", "utf8");

const input = contents.split("\n");
console.log(new TreeGrid(input).treesEncountered());
