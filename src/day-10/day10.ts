export class AdapterGroup {
  differences: number[];
  arrangementCountMemos: any;

  constructor(values: number[]) {
    const sortedValues = values.map((i) => i);
    sortedValues.sort((a, b) => a - b);

    this.differences = [sortedValues[0]];
    for (var i = 1; i < sortedValues.length; i++) {
      this.differences.push(sortedValues[i] - sortedValues[i - 1]);
    }

    this.arrangementCountMemos = {};
  }

  getDifferenceCounts() {
    return this.differences.reduce(
      (acc, item) => {
        acc[item]++;
        return acc;
      },
      { 1: 0, 2: 0, 3: 1 }
    );
  }

  getArrangementCount(): number {
    return this.getArrangementCountMemo(this.differences);
  }

  private getArrangementCountMemo(differenceArray: number[]) {
    if (this.arrangementCountMemos["" + differenceArray] !== undefined) {
      return this.arrangementCountMemos["" + differenceArray];
    }
    const result = this.getArrangementCountHelper(differenceArray);
    this.arrangementCountMemos["" + differenceArray] = result;
    return result;
  }

  private getArrangementCountHelper(differenceArray: number[]) {
    if (differenceArray[0] > 3) {
      return 0;
    }
    if (differenceArray.length == 1) {
      return 1;
    }

    const arrangementCountWithRemoval = this.getArrangementCountMemo(
      [differenceArray[0] + differenceArray[1]].concat(differenceArray.slice(2))
    );
    const arrangementCountWithoutRemoval = this.getArrangementCountMemo(
      differenceArray.slice(1)
    );
    return arrangementCountWithRemoval + arrangementCountWithoutRemoval;
  }
}

const fs = require("fs");
const contents = fs.readFileSync("files/day10.txt", "utf8");

const input = contents.split("\n").map((i) => +i);
const adapterGroup = new AdapterGroup(input);
const differenceCounts = adapterGroup.getDifferenceCounts();
console.log(differenceCounts[1] * differenceCounts[3]);
console.log(adapterGroup.getArrangementCount());
