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

  describe("superValidity", () => {
    test("sample valid passport", () => {
      expect(
        new Passport(
          "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
        ).isSuperValid()
      ).toBe(true);
    });

    describe("byr superValidity", () => {
      test("must be present", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be >= 1920", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1919 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be <= 2002", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:2003 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be a number", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:sup eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });
    });

    describe("iyr superValidity", () => {
      test("must be present", () => {
        expect(
          new Passport(
            "hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be >= 2010", () => {
        expect(
          new Passport(
            "iyr:2009 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be <= 2020", () => {
        expect(
          new Passport(
            "iyr:2021 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be a number", () => {
        expect(
          new Passport(
            "iyr:howdy hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });
    });

    describe("eyr superValidity", () => {
      test("must be present", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be >= 2020", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2019 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be <= 2030", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2031 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be a number", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:never pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });
    });

    describe("hgt superValidity", () => {
      test("must be present", () => {
        expect(
          new Passport(
            "iyr:2010 hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be either in or cm", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:6ft hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be at least 150 cm", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:149cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be at most 193 cm", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:194cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be at least 59 in", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:58in hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be at most 76 in", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:77in hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });
    });

    describe("hcl superValidity", () => {
      test("must be present", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must begin with a #", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:b6652a ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must be exactly length 7", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652 ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652aa ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must have only 0-9 and a-f", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6g652 ecl:blu byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });
    });

    describe("ecl superValidity", () => {
      test("must be present", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must not be some other random color", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:foo byr:1944 eyr:2021 pid:093154719"
          ).isSuperValid()
        ).toBe(false);
      });
    });

    describe("pid superValidity", () => {
      test("must be present", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must have length exactly 9", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:09315471"
          ).isSuperValid()
        ).toBe(false);
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:0931547192"
          ).isSuperValid()
        ).toBe(false);
      });

      test("must have only 0-9", () => {
        expect(
          new Passport(
            "iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093abc719"
          ).isSuperValid()
        ).toBe(false);
      });
    });
  });
});
