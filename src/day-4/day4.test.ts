import { Passport, passportBatch, validPassportCount } from "./day4";

describe("Passport", () => {
  describe("validity", () => {
    test("a passport with all fields is valid", () => {
      expect(
        new Passport(
          "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm"
        ).isValid()
      ).toBe(true);
    });

    test("a passport missing any of the required fields is invalid", () => {
      expect(
        new Passport(
          "pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm"
        ).isValid()
      ).toBe(false);

      expect(
        new Passport(
          "ecl:gry eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm"
        ).isValid()
      ).toBe(false);

      expect(
        new Passport(
          "ecl:gry pid:860033327 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm"
        ).isValid()
      ).toBe(false);

      expect(
        new Passport(
          "ecl:gry pid:860033327 eyr:2020 byr:1937 iyr:2017 cid:147 hgt:183cm"
        ).isValid()
      ).toBe(false);

      expect(
        new Passport(
          "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd iyr:2017 cid:147 hgt:183cm"
        ).isValid()
      ).toBe(false);

      expect(
        new Passport(
          "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 cid:147 hgt:183cm"
        ).isValid()
      ).toBe(false);

      expect(
        new Passport(
          "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147"
        ).isValid()
      ).toBe(false);
    });

    test("a passport missing the country ID is valid", () => {
      expect(
        new Passport(
          "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 hgt:183cm"
        ).isValid()
      ).toBe(true);
    });

    test("a passport may use newlines instead of spaces as its delimiter", () => {
      expect(
        new Passport(
          "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\nbyr:1937 iyr:2017\ncid:147 hgt:183cm"
        ).isValid()
      ).toBe(true);
    });
  });

  describe("passportBatch", () => {
    test("can parse two passports", () => {
      const passports = passportBatch(
        "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n" +
          "byr:1937 iyr:2017 cid:147 hgt:183cm\n" +
          "\n" +
          "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\n" +
          "hcl:#cfa07d byr:1929"
      );

      expect(passports.length).toBe(2);
      expect(passports[0].isValid()).toBe(true);
      expect(passports[1].isValid()).toBe(false);
    });

    test("part 1 example input", () => {
      const passports = passportBatch(
        "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n" +
          "byr:1937 iyr:2017 cid:147 hgt:183cm\n" +
          "\n" +
          "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\n" +
          "hcl:#cfa07d byr:1929\n" +
          "\n" +
          "hcl:#ae17e1 iyr:2013\n" +
          "eyr:2024\n" +
          "ecl:brn pid:760753108 byr:1931\n" +
          "hgt:179cm\n" +
          "\n" +
          "hcl:#cfa07d eyr:2025 pid:166559648\n" +
          "iyr:2011 ecl:brn hgt:59in"
      );
      expect(passports.length).toBe(4);

      expect(passports[0].isValid()).toBe(true);
      expect(passports[1].isValid()).toBe(false);
      expect(passports[2].isValid()).toBe(true);
      expect(passports[3].isValid()).toBe(false);
    });
  });

  describe("validPassportCount", () => {
    test("filters only the valid passports", () => {
      expect(
        validPassportCount(
          "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n" +
            "byr:1937 iyr:2017 cid:147 hgt:183cm\n" +
            "\n" +
            "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\n" +
            "hcl:#cfa07d byr:1929"
        )
      ).toBe(1);
    });

    test("part 1 example input", () => {
      expect(
        validPassportCount(
          "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n" +
            "byr:1937 iyr:2017 cid:147 hgt:183cm\n" +
            "\n" +
            "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\n" +
            "hcl:#cfa07d byr:1929\n" +
            "\n" +
            "hcl:#ae17e1 iyr:2013\n" +
            "eyr:2024\n" +
            "ecl:brn pid:760753108 byr:1931\n" +
            "hgt:179cm\n" +
            "\n" +
            "hcl:#cfa07d eyr:2025 pid:166559648\n" +
            "iyr:2011 ecl:brn hgt:59in"
        )
      ).toBe(2);
    });
  });
});
