import {
  findRepairedConsole,
  GameConsole,
  repairLine,
  repairLines,
} from "./day8";

describe("GameConsole", () => {
  test("a console starts out with accumulator 0", () => {
    const gameConsole = new GameConsole(["acc +1"]);
    expect(gameConsole.accumulator()).toBe(0);
  });

  test("a console starts out with no loop", () => {
    const gameConsole = new GameConsole(["acc +1"]);
    expect(gameConsole.hasLooped()).toBe(false);
  });

  describe("step", () => {
    test("acc +1 increases the accumulator by one", () => {
      const gameConsole = new GameConsole(["acc +1"]);
      gameConsole.step();
      expect(gameConsole.accumulator()).toBe(1);
    });

    test("acc +2 increases the accumulator by two", () => {
      const gameConsole = new GameConsole(["acc +2"]);
      gameConsole.step();
      expect(gameConsole.accumulator()).toBe(2);
    });

    test("acc +2 increases the accumulator by two on each step", () => {
      const gameConsole = new GameConsole(["acc +2", "acc +2"]);
      gameConsole.step();
      expect(gameConsole.accumulator()).toBe(2);
      gameConsole.step();
      expect(gameConsole.accumulator()).toBe(4);
    });

    test("can have different acc values per step", () => {
      const gameConsole = new GameConsole(["acc +1", "acc +2"]);
      gameConsole.step();
      expect(gameConsole.accumulator()).toBe(1);
      gameConsole.step();
      expect(gameConsole.accumulator()).toBe(3);
    });

    test("jmp does not accumulate the accumulator", () => {
      const gameConsole = new GameConsole(["jmp +2", "acc +2", "acc +3"]);
      gameConsole.step();
      expect(gameConsole.accumulator()).toBe(0);
    });

    test("jmp skips some number of instructions", () => {
      const gameConsole = new GameConsole(["jmp +2", "acc +2", "acc +3"]);
      gameConsole.step();
      gameConsole.step();
      expect(gameConsole.accumulator()).toBe(3);
    });

    test("nop doesn't do anything", () => {
      const gameConsole = new GameConsole(["nop +2", "acc +2", "acc +3"]);
      gameConsole.step();
      gameConsole.step();
      expect(gameConsole.accumulator()).toBe(2);
    });

    test("jmp'ing back to a spot that we've been before causes a loop", () => {
      const gameConsole = new GameConsole(["nop +2", "jmp -1"]);
      gameConsole.step();
      expect(gameConsole.hasLooped()).toBe(false);
      gameConsole.step();
      expect(gameConsole.hasLooped()).toBe(true);
    });

    test("jmp'ing back to a spot that we've been before causes a loop (3 steps)", () => {
      const gameConsole = new GameConsole(["acc +3", "acc +2", "jmp -2"]);
      gameConsole.step();
      expect(gameConsole.hasLooped()).toBe(false);
      gameConsole.step();
      expect(gameConsole.hasLooped()).toBe(false);
      gameConsole.step();
      expect(gameConsole.hasLooped()).toBe(true);
      expect(gameConsole.accumulator()).toBe(5);
    });
  });

  describe("execute", () => {
    test("runs until it finds a loop", () => {
      const gameConsole = new GameConsole(["acc +3", "acc +2", "jmp -2"]);
      gameConsole.execute();
      expect(gameConsole.accumulator()).toBe(5);
    });

    test("part 1 example", () => {
      const gameConsole = new GameConsole([
        "nop +0",
        "acc +1",
        "jmp +4",
        "acc +3",
        "jmp -3",
        "acc -99",
        "acc +1",
        "jmp -4",
        "acc +6",
      ]);
      gameConsole.execute();
      expect(gameConsole.accumulator()).toBe(5);
    });

    test("runs until it terminates", () => {
      const gameConsole = new GameConsole(["acc +3", "acc +2", "acc +5"]);
      gameConsole.execute();
      expect(gameConsole.accumulator()).toBe(10);
      expect(gameConsole.hasLooped()).toBe(false);
    });
  });
});

describe("repairLine", () => {
  test("does not alter acc commands", () => {
    expect(repairLine("acc +1")).toBe(null);
  });

  test("changes jmp to nop", () => {
    expect(repairLine("jmp +1")).toBe("nop +1");
  });

  test("changes nop to jmp", () => {
    expect(repairLine("nop +1")).toBe("jmp +1");
  });
});

describe("repairLines", () => {
  test("returns an array with the line repaired", () => {
    expect(repairLines(["jmp +1"])).toStrictEqual([["nop +1"]]);
  });

  test("returns a different array for each line that it repaired", () => {
    expect(repairLines(["jmp +1", "nop -1"])).toStrictEqual([
      ["nop +1", "nop -1"],
      ["jmp +1", "jmp -1"],
    ]);
  });

  test("does not include entries for a 'repaired' acc", () => {
    expect(repairLines(["jmp +1", "acc -1"])).toStrictEqual([
      ["nop +1", "acc -1"],
    ]);
  });
});

describe("findRepairedConsole", () => {
  test("part 2 example", () => {
    expect(
      findRepairedConsole([
        "nop +0",
        "acc +1",
        "jmp +4",
        "acc +3",
        "jmp -3",
        "acc -99",
        "acc +1",
        "jmp -4",
        "acc +6",
      ])
    ).toBe(8);
  });
});
