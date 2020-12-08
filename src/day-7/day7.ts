function sum(array: number[]): number {
  return array.reduce((a, b) => {
    return a + b;
  }, 0);
}

export class BagRuleSet {
  rules: {};

  constructor(input: string[]) {
    this.rules = {};
    for (const line of input) {
      this.addLineToRules(line);
    }
  }

  private addLineToRules(line: string) {
    const [bag, contents] = line.split(" bags contain ");

    this.rules[bag] = [];

    if (contents !== "no other bags.") {
      for (const innerBag of contents.split(", ")) {
        this.rules[bag].push(this.parseInnerBag(innerBag));
      }
    }
  }

  private parseInnerBag(innerBag: string) {
    const [count, color1, color2, __] = innerBag.split(" ");
    return { color: color1 + " " + color2, count: +count };
  }

  bagContains(outerBag: string, innerBag: string): boolean {
    for (const { color: testBag } of this.rules[outerBag]) {
      if (testBag == innerBag || this.bagContains(testBag, innerBag)) {
        return true;
      }
    }
    return false;
  }

  bagContainsCount(innerBag: string): number {
    return Object.keys(this.rules).filter((outerBag) =>
      this.bagContains(outerBag, innerBag)
    ).length;
  }

  bagContentCount(outerBag: string): number {
    return sum(
      this.rules[outerBag].map(
        ({ count, color }) => count * (1 + this.bagContentCount(color))
      )
    );
  }
}

const fs = require("fs");
const contents = fs.readFileSync("files/day7.txt", "utf8");

const input = contents.split("\n");
const ruleSet = new BagRuleSet(input);
console.log(ruleSet.bagContainsCount("shiny gold"));
console.log(ruleSet.bagContentCount("shiny gold"));
