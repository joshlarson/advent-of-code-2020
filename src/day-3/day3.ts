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

  treesEncountered(rowSkip = 1, colSkip = 3): number {
    var trees = 0;
    var col = 0;
    for (var row = 0; row < this.lines.length; row += rowSkip) {
      trees += this.treeAt(row, col);
      col += colSkip;
    }
    return trees;
  }
}

function part2(grid: TreeGrid) {
  const slopes = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1],
  ];

  return slopes
    .map(([rowSkip, colSkip]) => {
      return grid.treesEncountered(rowSkip, colSkip);
    })
    .reduce((acc, item) => {
      return acc * item;
    });
}

// const fs = require("fs");
// const contents = fs.readFileSync("files/day3.txt", "utf8");

// const input = contents.split("\n");
// const grid = new TreeGrid(input);
// console.log(grid.treesEncountered());
// console.log(part2(grid));
