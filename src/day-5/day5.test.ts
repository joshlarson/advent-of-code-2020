import { maxSeatId, missingSeatId, seatId } from "./day5";

describe("seatId", () => {
  test("all the way in the front, all the way to the left", () => {
    expect(seatId("FFFFFFFLLL")).toBe(0);
  });

  test("all the way in the front, one seat to the right", () => {
    expect(seatId("FFFFFFFLLR")).toBe(1);
  });

  test("all the way in the front, all the way to the right", () => {
    expect(seatId("FFFFFFFRRR")).toBe(7);
  });

  test("all the way in the front, all the way to the left", () => {
    expect(seatId("BFFFFFFLLL")).toBe(512);
  });

  test("all the way in the back, all the way to the right", () => {
    expect(seatId("BBBBBBBRRR")).toBe(1023);
  });

  test("Part 1 example", () => {
    expect(seatId("FBFBBFFRLR")).toBe(357);
  });
});

describe("maxSeatId", () => {
  test("with some seats", () => {
    expect(maxSeatId(["FFFFFFFRLL", "FFFFFFFLLR", "FFFFFFFLLL"])).toBe(4);
    expect(maxSeatId(["FFFFFFFLLL", "FFFFFFFRLR", "FFFFFFFLRL"])).toBe(5);
  });
});

describe("missingSeatId", () => {
  test("with some seats", () => {
    expect(missingSeatId(["FFFFFFFLLL", "FFFFFFFLLR", "FFFFFFFLRR"])).toBe(2);
  });

  test("with the front of the plane empty", () => {
    expect(missingSeatId(["FFFFFFBLLL", "FFFFFFBLLR", "FFFFFFBLRR"])).toBe(10);
  });
});
