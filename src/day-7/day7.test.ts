import { BagRuleSet } from "./day7";

describe("BagRuleSet", () => {
  describe("bagContains", () => {
    test("with a bag that contains no other bags", () => {
      const ruleSet = new BagRuleSet([
        "bright yellow bags contain no other bags.",
      ]);
      expect(ruleSet.bagContains("bright yellow", "dotted black")).toBe(false);
    });

    test("with a bag that contains another type of bag", () => {
      const ruleSet = new BagRuleSet([
        "dotted black bags contain no other bags.",
        "bright yellow bags contain 1 dotted black bag.",
      ]);
      expect(ruleSet.bagContains("bright yellow", "dotted black")).toBe(true);
      expect(ruleSet.bagContains("dotted black", "bright yellow")).toBe(false);
    });

    test("with a bag that does not contain every other type of bag", () => {
      const ruleSet = new BagRuleSet([
        "bright yellow bags contain 1 faded blue bag.",
        "dotted black bags contain no other bags.",
        "faded blue bags contain no other bags.",
      ]);
      expect(ruleSet.bagContains("bright yellow", "dotted black")).toBe(false);
      expect(ruleSet.bagContains("bright yellow", "faded blue")).toBe(true);
      expect(ruleSet.bagContains("dotted black", "bright yellow")).toBe(false);
    });

    test("with a bag that contains more than one type of bag", () => {
      const ruleSet = new BagRuleSet([
        "bright yellow bags contain 1 faded blue bag, 2 dotted black bags.",
        "dotted black bags contain no other bags.",
        "faded blue bags contain no other bags.",
      ]);
      expect(ruleSet.bagContains("bright yellow", "dotted black")).toBe(true);
      expect(ruleSet.bagContains("bright yellow", "faded blue")).toBe(true);
      expect(ruleSet.bagContains("dotted black", "bright yellow")).toBe(false);
    });

    test("with a bag that contains another bag by proxy", () => {
      const ruleSet = new BagRuleSet([
        "bright yellow bags contain 1 faded blue bag.",
        "dotted black bags contain no other bags.",
        "faded blue bags contain 2 dotted black bags.",
      ]);
      expect(ruleSet.bagContains("bright yellow", "dotted black")).toBe(true);
    });

    test("bags do not contain themselves", () => {
      const ruleSet = new BagRuleSet([
        "bright yellow bags contain 1 faded blue bag.",
        "dotted black bags contain no other bags.",
        "faded blue bags contain 2 dotted black bags.",
      ]);
      expect(ruleSet.bagContains("bright yellow", "bright yellow")).toBe(false);
      expect(ruleSet.bagContains("dotted black", "dotted black")).toBe(false);
      expect(ruleSet.bagContains("faded blue", "faded blue")).toBe(false);
    });
  });

  describe("bagContains", () => {
    test("with a bag that contains another bag by proxy", () => {
      const ruleSet = new BagRuleSet([
        "bright yellow bags contain 1 faded blue bag.",
        "dotted black bags contain no other bags.",
        "faded blue bags contain 2 dotted black bags.",
      ]);
      expect(ruleSet.bagContainsCount("bright yellow")).toBe(0);
      expect(ruleSet.bagContainsCount("faded blue")).toBe(1);
      expect(ruleSet.bagContainsCount("dotted black")).toBe(2);
    });

    test("part 1 example input", () => {
      const ruleSet = new BagRuleSet([
        "light red bags contain 1 bright white bag, 2 muted yellow bags.",
        "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
        "bright white bags contain 1 shiny gold bag.",
        "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
        "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
        "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
        "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
        "faded blue bags contain no other bags.",
        "dotted black bags contain no other bags.",
      ]);
      expect(ruleSet.bagContainsCount("shiny gold")).toBe(4);
    });
  });
});
