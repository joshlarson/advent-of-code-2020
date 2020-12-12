export class AdapterGroup {
  differenceCounts: { 1: number; 2: number; 3: number };

  constructor(values: number[]) {
    // Start with the implicit +3 because the device is 3 above the highest adapter
    this.differenceCounts = {
      1: 0,
      2: 0,
      3: 1,
    };

    const sortedValues = values.map((i) => i);
    sortedValues.sort((a, b) => a - b);

    this.differenceCounts[sortedValues[0]]++;
    for (var i = 1; i < sortedValues.length; i++) {
      this.differenceCounts[sortedValues[i] - sortedValues[i - 1]]++;
    }
  }

  getDifferenceCounts() {
    return this.differenceCounts;
  }
}

const fs = require("fs");
const contents = fs.readFileSync("files/day10.txt", "utf8");

const input = contents.split("\n").map((i) => +i);
const adapterGroup = new AdapterGroup(input);
const differenceCounts = adapterGroup.getDifferenceCounts();
console.log(differenceCounts[1] * differenceCounts[3]);
