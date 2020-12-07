import { Survey, SurveyCollection } from "./day6";

describe("Survey", () => {
  test("one person, one answer", () => {
    expect(new Survey(["a"]).answerCount()).toBe(1);
  });
  test("one person, two answers", () => {
    expect(new Survey(["ab"]).answerCount()).toBe(2);
  });
  test("two people, two answers", () => {
    expect(new Survey(["a", "b"]).answerCount()).toBe(2);
  });
  test("two people, one answer", () => {
    expect(new Survey(["a", "a"]).answerCount()).toBe(1);
  });
  test("part 1 example", () => {
    expect(new Survey(["abcx", "abcy", "abcz"]).answerCount()).toBe(6);
  });
});

describe("SurveyCollection", () => {
  test("one family, one person", () => {
    expect(new SurveyCollection("abc").totalAnswerCount()).toBe(3);
    expect(new SurveyCollection("abcd").totalAnswerCount()).toBe(4);
  });

  test("one family, two people", () => {
    expect(new SurveyCollection("abc\n" + "bcd").totalAnswerCount()).toBe(4);
  });

  test("two families, one person each", () => {
    expect(
      new SurveyCollection("abc\n" + "\n" + "bcd").totalAnswerCount()
    ).toBe(6);
  });

  test("part 1 example", () => {
    expect(
      new SurveyCollection(
        "abc\n" +
          "\n" +
          "a\n" +
          "b\n" +
          "c\n" +
          "\n" +
          "ab\n" +
          "ac\n" +
          "\n" +
          "a\n" +
          "a\n" +
          "a\n" +
          "a\n" +
          "\n" +
          "b"
      ).totalAnswerCount()
    ).toBe(11);
  });
});
