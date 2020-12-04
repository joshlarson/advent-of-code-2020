import { TreeGrid } from "./day3";

describe("Grid", () => {
  describe("treeAt", () => {
    test("a tiny empty field has no trees", () => {
      const grid = new TreeGrid(["."]);
      expect(grid.treeAt(0, 0)).toBe(0);
      expect(grid.treeAt(0, 1)).toBe(0);
      expect(grid.treeAt(0, 10)).toBe(0);
    });

    test("a tiny full field has trees", () => {
      const grid = new TreeGrid(["#"]);
      expect(grid.treeAt(0, 0)).toBe(1);
      expect(grid.treeAt(0, 1)).toBe(1);
      expect(grid.treeAt(0, 10)).toBe(1);
    });

    test("a short field with alternating trees", () => {
      const grid = new TreeGrid(["#."]);
      expect(grid.treeAt(0, 0)).toBe(1);
      expect(grid.treeAt(0, 1)).toBe(0);
      expect(grid.treeAt(0, 2)).toBe(1);
      expect(grid.treeAt(0, 3)).toBe(0);
    });

    test("a taller field with some trees", () => {
      const grid = new TreeGrid(["#.", ".#"]);
      expect(grid.treeAt(0, 0)).toBe(1);
      expect(grid.treeAt(0, 1)).toBe(0);
      expect(grid.treeAt(1, 0)).toBe(0);
      expect(grid.treeAt(1, 1)).toBe(1);
    });
  });

  describe("treesEncountered", () => {
    test("for one row, it's just the top left corner", () => {
      expect(new TreeGrid(["."]).treesEncountered()).toBe(0);
      expect(new TreeGrid(["#"]).treesEncountered()).toBe(1);
      expect(new TreeGrid([".#"]).treesEncountered()).toBe(0);
      expect(new TreeGrid(["#."]).treesEncountered()).toBe(1);
    });

    test("for two rows, also includes 1 down and 3 to the right", () => {
      expect(new TreeGrid(["....", "...#"]).treesEncountered()).toBe(1);
      expect(new TreeGrid(["....", "...."]).treesEncountered()).toBe(0);
    });

    test("for three rows, also includes 1 down and 3 to the right twice (and wraps around)", () => {
      expect(new TreeGrid(["....", "....", "..#."]).treesEncountered()).toBe(1);
      expect(new TreeGrid(["....", "....", "...."]).treesEncountered()).toBe(0);
    });

    test("example", () => {
      const grid = new TreeGrid([
        "..##.......",
        "#...#...#..",
        ".#....#..#.",
        "..#.#...#.#",
        ".#...##..#.",
        "..#.##.....",
        ".#.#.#....#",
        ".#........#",
        "#.##...#...",
        "#...##....#",
        ".#..#...#.#",
      ]);

      expect(grid.treesEncountered()).toBe(7);
    });

    test("can take other rowSkips and colSkips", () => {
      expect(new TreeGrid(["....", "...#"]).treesEncountered(1, 2)).toBe(0);
      expect(new TreeGrid(["....", "..#."]).treesEncountered(1, 2)).toBe(1);
      expect(
        new TreeGrid(["....", "####", "...."]).treesEncountered(2, 2)
      ).toBe(0);
    });
  });
});
