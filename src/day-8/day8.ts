export class GameConsole {
  acc: number;
  commands: ((gameConsole: GameConsole) => void)[];
  ptr: number;
  ptrs: Set<number>;
  looped: boolean;

  constructor(input: string[]) {
    this.commands = input.map(this.parseLine);
    this.ptr = 0;
    this.acc = 0;
    this.ptrs = new Set();
    this.looped = false;
  }

  private parseLine(line: string) {
    const [command, amount] = line.split(" ");
    switch (command) {
      case "acc":
        return (self: GameConsole) => {
          self.doAcc(parseInt(amount));
        };
      case "jmp":
        return (self: GameConsole) => {
          self.doJmp(parseInt(amount));
        };
      case "nop":
        return (self: GameConsole) => {
          self.doNop();
        };
    }
  }

  accumulator(): number {
    return this.acc;
  }

  hasLooped(): boolean {
    return this.looped;
  }

  hasTerminated() {
    return this.ptr >= this.commands.length;
  }

  execute() {
    while (!this.hasLooped() && !this.hasTerminated()) {
      this.step();
    }
  }

  step() {
    this.ptrs.add(this.ptr);
    this.commands[this.ptr](this);
    if (this.ptrs.has(this.ptr)) {
      this.looped = true;
    }
  }

  private doAcc(amount: number) {
    this.acc += amount;
    this.ptr++;
  }

  private doJmp(amount: number) {
    this.ptr += amount;
  }

  private doNop() {
    this.ptr++;
  }
}

export function repairLine(line: string): string {
  const [command, amount] = line.split(" ");
  switch (command) {
    case "jmp":
      return "nop " + amount;
    case "nop":
      return "jmp " + amount;
  }
  return null;
}

export function repairLines(lines: string[]): string[][] {
  const result = [];

  for (var index = 0; index < lines.length; index++) {
    const repairedLine = repairLine(lines[index]);
    if (repairedLine !== null) {
      const repairedInstructions = lines.map((x) => x);
      repairedInstructions[index] = repairedLine;
      result.push(repairedInstructions);
    }
  }

  return result;
}

export function findRepairedConsole(lines: string[]): number {
  for (const repairedLines of repairLines(lines)) {
    const gameConsole = new GameConsole(repairedLines);
    gameConsole.execute();
    if (gameConsole.hasTerminated()) {
      return gameConsole.accumulator();
    }
  }
}

const fs = require("fs");
const contents = fs.readFileSync("files/day8.txt", "utf8");

const input = contents.split("\n");
const gameConsole = new GameConsole(input);
gameConsole.execute();
console.log(gameConsole.accumulator());
console.log(findRepairedConsole(input));
