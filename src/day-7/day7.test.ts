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

  describe("bagContentCount", () => {
    test("empty bags have a content count of 0", () => {
      const ruleSet = new BagRuleSet([
        "bright yellow bags contain 1 faded blue bag.",
        "dotted black bags contain no other bags.",
        "faded blue bags contain 2 dotted black bags.",
      ]);
      expect(ruleSet.bagContentCount("dotted black")).toBe(0);
    });

    test("bags with one inner bag have 1", () => {
      const ruleSet = new BagRuleSet([
        "bright yellow bags contain no other bags.",
        "dotted black bags contain no other bags.",
        "faded blue bags contain 1 dotted black bag.",
      ]);
      expect(ruleSet.bagContentCount("faded blue")).toBe(1);
    });

    test("bags with two inner bags have 2", () => {
      const ruleSet = new BagRuleSet([
        "bright yellow bags contain no other bags.",
        "dotted black bags contain no other bags.",
        "faded blue bags contain 1 dotted black bag, 1 bright yellow bag.",
      ]);
      expect(ruleSet.bagContentCount("faded blue")).toBe(2);
    });

    test("bags with two identical inner bags have 2", () => {
      const ruleSet = new BagRuleSet([
        "bright yellow bags contain no other bags.",
        "dotted black bags contain no other bags.",
        "faded blue bags contain 2 dotted black bags.",
      ]);
      expect(ruleSet.bagContentCount("faded blue")).toBe(2);
    });

    test("bags with nested inner bags include those inner bags", () => {
      const ruleSet = new BagRuleSet([
        "bright yellow bags contain no other bags.",
        "dotted black bags contain 1 bright yellow bag.",
        "faded blue bags contain 1 dotted black bag.",
      ]);
      expect(ruleSet.bagContentCount("faded blue")).toBe(2);
    });

    test("bags with multiple copies of nested inner bags include those inner bags", () => {
      const ruleSet = new BagRuleSet([
        "bright yellow bags contain no other bags.",
        "dotted black bags contain 1 bright yellow bag.",
        "faded blue bags contain 2 dotted black bags.",
      ]);
      expect(ruleSet.bagContentCount("faded blue")).toBe(4);
    });

    test("part 2 example 1 input", () => {
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
      expect(ruleSet.bagContentCount("shiny gold")).toBe(32);
    });

    test("part 2 example 1 input", () => {
      const ruleSet = new BagRuleSet([
        "shiny gold bags contain 2 dark red bags.",
        "dark red bags contain 2 dark orange bags.",
        "dark orange bags contain 2 dark yellow bags.",
        "dark yellow bags contain 2 dark green bags.",
        "dark green bags contain 2 dark blue bags.",
        "dark blue bags contain 2 dark violet bags.",
        "dark violet bags contain no other bags.",
      ]);
      expect(ruleSet.bagContentCount("shiny gold")).toBe(126);
    });
  });
});
