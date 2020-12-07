function sum(answerCounts: number[]): number {
  return answerCounts.reduce((a, b) => {
    return a + b;
  });
}

export class Survey {
  answers: string[];
  answerCount(): number {
    return this.answers.reduce((set, str) => {
      for (var ch of str) {
        set.add(ch);
      }
      return set;
    }, new Set()).size;
  }
  unanimousAnswerCount(): number {
    return this.answers.reduce((set, str) => {
      const newSet = new Set();
      for (var ch of str) {
        if (set.has(ch)) {
          newSet.add(ch);
        }
      }
      return newSet;
    }, new Set(this.answers[0])).size;
  }
  constructor(answers: string[]) {
    this.answers = answers;
  }
}

export class SurveyCollection {
  surveys: Survey[];
  totalAnswerCount(): number {
    return sum(
      this.surveys.map((survey) => {
        return survey.answerCount();
      })
    );
  }
  totalUnanimousAnswerCount(): number {
    return sum(
      this.surveys.map((survey) => {
        return survey.unanimousAnswerCount();
      })
    );
  }
  constructor(input: string) {
    const families = input.split("\n\n");
    this.surveys = families.map((familyInput) => {
      const answers = familyInput.split("\n");
      return new Survey(answers);
    });
  }
}

const fs = require("fs");
const input = fs.readFileSync("files/day6.txt", "utf8");

console.log(new SurveyCollection(input).totalAnswerCount());
console.log(new SurveyCollection(input).totalUnanimousAnswerCount());
