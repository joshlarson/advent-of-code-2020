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
  constructor(answers: string[]) {
    this.answers = answers;
  }
}

export class SurveyCollection {
  input: string;
  totalAnswerCount(): any {
    const families = this.input.split("\n\n");
    return families
      .map((familyInput) => {
        const answers = familyInput.split("\n");
        return new Survey(answers).answerCount();
      })
      .reduce((a, b) => {
        return a + b;
      });
  }
  constructor(input: string) {
    this.input = input;
  }
}

const fs = require("fs");
const input = fs.readFileSync("files/day6.txt", "utf8");

console.log(new SurveyCollection(input).totalAnswerCount());
