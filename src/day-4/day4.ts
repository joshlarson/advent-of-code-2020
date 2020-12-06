export class Passport {
  attrs: {};

  constructor(input: string) {
    this.attrs = {};
    input
      .replace(/\n/g, " ")
      .split(" ")
      .forEach((entry) => this.initAttr(entry));
  }

  private initAttr(entry: string) {
    const [key, value] = entry.split(":");
    this.attrs[key] = value;
  }

  isValid(): boolean {
    const requiredKeys = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];

    for (var key of requiredKeys) {
      if (this.attrs[key] === undefined) {
        return false;
      }
    }

    return true;
  }
}

export function passportBatch(input: string): Passport[] {
  return input.split("\n\n").map((s) => {
    return new Passport(s);
  });
}

export function validPassportCount(input: string): number {
  return passportBatch(input).filter((pp) => pp.isValid()).length;
}

const fs = require("fs");
const input = fs.readFileSync("files/day4.txt", "utf8");

console.log(validPassportCount(input));
