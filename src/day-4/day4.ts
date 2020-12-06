function inRange(attr: string, min: number, max: number) {
  const attrInt = +attr;
  return attrInt >= min && attrInt <= max;
}

export class Passport {
  REQUIRED_KEYS = {
    byr: function (attr: string) {
      return inRange(attr, 1920, 2002);
    },
    iyr: function (attr: string) {
      return inRange(attr, 2010, 2020);
    },
    eyr: function (attr: string) {
      return inRange(attr, 2020, 2030);
    },
    hgt: function (attr: string) {
      const units = attr.substring(attr.length - 2, attr.length);
      const measurement = attr.substring(0, attr.length - 2);
      if (units === "cm") {
        return inRange(measurement, 150, 193);
      } else if (units === "in") {
        return inRange(measurement, 59, 76);
      } else {
        return false;
      }
    },
    hcl: function (attr: string) {
      return attr.length === 7 && /\#[0-9a-f]{6}/g.test(attr);
    },
    ecl: function (attr: string) {
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(attr);
    },
    pid: function (attr: string) {
      return attr.length === 9 && /[0-9]{9}/g.test(attr);
    },
  };

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
    for (var key in this.REQUIRED_KEYS) {
      if (this.attrs[key] === undefined) {
        return false;
      }
    }

    return true;
  }

  isSuperValid(): boolean {
    for (var key in this.REQUIRED_KEYS) {
      const validationFun = this.REQUIRED_KEYS[key];
      const attr = this.attrs[key];
      if (attr === undefined || !validationFun(attr)) {
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

export function superValidPassportCount(input: string): number {
  return passportBatch(input).filter((pp) => pp.isSuperValid()).length;
}

// const fs = require("fs");
// const input = fs.readFileSync("files/day4.txt", "utf8");

// console.log(validPassportCount(input));
// console.log(superValidPassportCount(input));
