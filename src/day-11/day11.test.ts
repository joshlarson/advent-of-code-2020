import { SeatGrid } from "./day11";

describe("SeatGrid", () => {
  describe("isOccupied", () => {
    it("is false for a small room with only floor", () => {
      const grid = SeatGrid.parseFullGrid(["."]);
      expect(grid.isOccupied(0, 0)).toBe(false);
    });

    it("is false for a small room with only an empty seat", () => {
      const grid = SeatGrid.parseFullGrid(["L"]);
      expect(grid.isOccupied(0, 0)).toBe(false);
    });

    it("is true for a small room with an occupied seat", () => {
      const grid = SeatGrid.parseFullGrid(["#"]);
      expect(grid.isOccupied(0, 0)).toBe(true);
    });

    it("works for a larger grid as well", () => {
      const grid = SeatGrid.parseFullGrid(["#.", "L#"]);
      expect(grid.isOccupied(0, 0)).toBe(true);
      expect(grid.isOccupied(0, 1)).toBe(false);
      expect(grid.isOccupied(1, 0)).toBe(false);
      expect(grid.isOccupied(1, 1)).toBe(true);
    });

    it("is false outside the grid", () => {
      const grid = SeatGrid.parseFullGrid(["#.", "L#"]);
      expect(grid.isOccupied(-1, 0)).toBe(false);
      expect(grid.isOccupied(2, 0)).toBe(false);
      expect(grid.isOccupied(1, -1)).toBe(false);
      expect(grid.isOccupied(1, 2)).toBe(false);
    });
  });

  describe("occupantCount", () => {
    it("counts all occupants", () => {
      expect(SeatGrid.parseFullGrid(["L.", "L."]).occupantCount()).toBe(0);
      expect(SeatGrid.parseFullGrid(["#.", "L#"]).occupantCount()).toBe(2);
    });
  });

  describe("nextGrid", () => {
    it("the floor does not get occupied", () => {
      const grid = SeatGrid.parseFullGrid(["."]);
      expect(grid.nextGrid().isOccupied(0, 0)).toBe(false);
    });

    it("empty seats do get occupied", () => {
      const grid = SeatGrid.parseFullGrid(["L"]);
      expect(grid.nextGrid().isOccupied(0, 0)).toBe(true);
    });

    it("occupied seats do not get emptied", () => {
      const grid = SeatGrid.parseFullGrid(["#"]);
      expect(grid.nextGrid().isOccupied(0, 0)).toBe(true);
    });

    it("empty seats do not get occupied if they have neighbors", () => {
      expect(
        SeatGrid.parseFullGrid(["LLL", "LL#", "LLL"])
          .nextGrid()
          .isOccupied(1, 1)
      ).toBe(false);
      expect(
        SeatGrid.parseFullGrid(["LLL", "LLL", "LL#"])
          .nextGrid()
          .isOccupied(1, 1)
      ).toBe(false);
      expect(
        SeatGrid.parseFullGrid(["LLL", "LLL", "L#L"])
          .nextGrid()
          .isOccupied(1, 1)
      ).toBe(false);
      expect(
        SeatGrid.parseFullGrid(["LLL", "LLL", "#LL"])
          .nextGrid()
          .isOccupied(1, 1)
      ).toBe(false);
      expect(
        SeatGrid.parseFullGrid(["LLL", "#LL", "LLL"])
          .nextGrid()
          .isOccupied(1, 1)
      ).toBe(false);
      expect(
        SeatGrid.parseFullGrid(["#LL", "LLL", "LLL"])
          .nextGrid()
          .isOccupied(1, 1)
      ).toBe(false);
      expect(
        SeatGrid.parseFullGrid(["L#L", "LLL", "LLL"])
          .nextGrid()
          .isOccupied(1, 1)
      ).toBe(false);
      expect(
        SeatGrid.parseFullGrid(["LL#", "LLL", "LLL"])
          .nextGrid()
          .isOccupied(1, 1)
      ).toBe(false);
    });

    it("occupied seats get emptied if they have too many neighbors", () => {
      expect(
        SeatGrid.parseFullGrid(["LLL", "L##", "###"])
          .nextGrid()
          .isOccupied(1, 1)
      ).toBe(false);
    });

    it("occupied seats only get emptied if they have too many neighbors", () => {
      expect(
        SeatGrid.parseFullGrid(["LLL", "L##", "##L"])
          .nextGrid()
          .isOccupied(1, 1)
      ).toBe(true);
    });
  });

  describe("isStable", () => {
    it("is false if nextGrid would cause any changes", () => {
      expect(SeatGrid.parseFullGrid(["L.", "L."]).isStable()).toBe(false);
    });

    it("is true if nextGrid would cause no changes", () => {
      expect(SeatGrid.parseFullGrid(["..", ".."]).isStable()).toBe(true);
      expect(SeatGrid.parseFullGrid(["#.", "#."]).isStable()).toBe(true);
    });
  });

  describe("nextUntilStable", () => {
    it("returns the next grid if it's stable", () => {
      const grid = SeatGrid.parseFullGrid(["L.", "L."]).nextUntilStable();
      expect(grid.isOccupied(0, 0)).toBe(true);
      expect(grid.occupantCount()).toBe(2);
    });

    it("returns the grid after the next one if that's stable", () => {
      const grid = SeatGrid.parseFullGrid(["LLL", "LL."]).nextUntilStable();
      expect(grid.isOccupied(1, 1)).toBe(false);
      expect(grid.occupantCount()).toBe(3);
    });
  });

  describe("part 1 example", () => {
    it("one iteration", () => {
      const grid = SeatGrid.parseFullGrid([
        "L.LL.LL.LL",
        "LLLLLLL.LL",
        "L.L.L..L..",
        "LLLL.LL.LL",
        "L.LL.LL.LL",
        "L.LLLLL.LL",
        "..L.L.....",
        "LLLLLLLLLL",
        "L.LLLLLL.L",
        "L.LLLLL.LL",
      ]).nextGrid();
      expect(grid.isOccupied(0, 0)).toBe(true);
      expect(grid.isOccupied(0, 1)).toBe(false);
      expect(grid.isOccupied(0, 2)).toBe(true);
    });

    it("two iterations", () => {
      const grid = SeatGrid.parseFullGrid([
        "L.LL.LL.LL",
        "LLLLLLL.LL",
        "L.L.L..L..",
        "LLLL.LL.LL",
        "L.LL.LL.LL",
        "L.LLLLL.LL",
        "..L.L.....",
        "LLLLLLLLLL",
        "L.LLLLLL.L",
        "L.LLLLL.LL",
      ])
        .nextGrid()
        .nextGrid();
      expect(grid.isOccupied(0, 0)).toBe(true);
      expect(grid.isOccupied(0, 1)).toBe(false);
      expect(grid.isOccupied(0, 2)).toBe(false);
    });

    it("until stable", () => {
      const grid = SeatGrid.parseFullGrid([
        "L.LL.LL.LL",
        "LLLLLLL.LL",
        "L.L.L..L..",
        "LLLL.LL.LL",
        "L.LL.LL.LL",
        "L.LLLLL.LL",
        "..L.L.....",
        "LLLLLLLLLL",
        "L.LLLLLL.L",
        "L.LLLLL.LL",
      ]).nextUntilStable();
      expect(grid.isOccupied(0, 0)).toBe(true);
      expect(grid.isOccupied(0, 1)).toBe(false);
      expect(grid.isOccupied(0, 2)).toBe(true);
      expect(grid.isOccupied(0, 3)).toBe(false);
      expect(grid.occupantCount()).toBe(37);
    });
  });
});
