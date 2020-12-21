import { Ship } from "./day12";

describe("Ship", () => {
  describe("location", () => {
    it("starts out at 0, 0", () => {
      const ship = Ship.startingShip();
      expect(ship.getLocation()).toStrictEqual({ x: 0, y: 0 });
    });

    it("moving north moves it north", () => {
      const ship = Ship.startingShip().runCommands(["N1", "N3"]);
      expect(ship.getLocation()).toStrictEqual({ x: 0, y: 4 });
    });

    it("moving east moves it east", () => {
      const ship = Ship.startingShip().runCommands(["E4", "E9"]);
      expect(ship.getLocation()).toStrictEqual({ x: 13, y: 0 });
    });

    it("moves in all four directions", () => {
      const ship = Ship.startingShip().runCommands(["E1", "N2", "W3", "S4"]);
      expect(ship.getLocation()).toStrictEqual({ x: -2, y: -2 });
    });

    it("moving forward moves it east", () => {
      const ship = Ship.startingShip().runCommands(["F4", "F3"]);
      expect(ship.getLocation()).toStrictEqual({ x: 7, y: 0 });
    });

    it("turning changes the forward direction", () => {
      const ship = Ship.startingShip().runCommands(["R90", "F4", "F3"]);
      expect(ship.getLocation()).toStrictEqual({ x: 0, y: -7 });
    });

    it("can turn by 180 degrees", () => {
      const ship = Ship.startingShip().runCommands(["R180", "F4", "F3"]);
      expect(ship.getLocation()).toStrictEqual({ x: -7, y: 0 });
    });

    it("can turn by 270 degrees", () => {
      const ship = Ship.startingShip().runCommands(["R270", "F4", "F3"]);
      expect(ship.getLocation()).toStrictEqual({ x: 0, y: 7 });
    });

    it("can turn by 360 degrees", () => {
      const ship = Ship.startingShip().runCommands([
        "R180",
        "R180",
        "F4",
        "F3",
      ]);
      expect(ship.getLocation()).toStrictEqual({ x: 7, y: 0 });
    });

    it("can turn left", () => {
      const ship = Ship.startingShip().runCommands(["L90", "F4", "F3"]);
      expect(ship.getLocation()).toStrictEqual({ x: 0, y: 7 });
    });

    it("can turn left by 180 degrees", () => {
      const ship = Ship.startingShip().runCommands(["L180", "F4", "F3"]);
      expect(ship.getLocation()).toStrictEqual({ x: -7, y: 0 });
    });

    it("can turn left by 270 degrees", () => {
      const ship = Ship.startingShip().runCommands(["L270", "F4", "F3"]);
      expect(ship.getLocation()).toStrictEqual({ x: 0, y: -7 });
    });

    it("part 1 example", () => {
      const ship = Ship.startingShip().runCommands([
        "F10",
        "N3",
        "F7",
        "R90",
        "F11",
      ]);
      expect(ship.getLocation()).toStrictEqual({ x: 17, y: -8 });
    });
  });

  describe("ship with waypoint", () => {
    it("starts at the origin", () => {
      const ship = Ship.withWaypoint();
      expect(ship.getLocation()).toStrictEqual({ x: 0, y: 0 });
    });

    it("moving north does not move the ship", () => {
      const ship = Ship.withWaypoint().runCommands(["N3"]);
      expect(ship.getLocation()).toStrictEqual({ x: 0, y: 0 });
    });

    it("moving forward moves it through the waypoint", () => {
      const ship = Ship.withWaypoint().runCommands(["F1"]);
      expect(ship.getLocation()).toStrictEqual({ x: 10, y: 1 });
    });

    it("can move forward more than once", () => {
      const ship = Ship.withWaypoint().runCommands(["F1", "F1"]);
      expect(ship.getLocation()).toStrictEqual({ x: 20, y: 2 });
    });

    it("moves through the waypoint by some scaled amount", () => {
      const ship = Ship.withWaypoint().runCommands(["F3"]);
      expect(ship.getLocation()).toStrictEqual({ x: 30, y: 3 });
    });

    it("moving north moves the waypoint", () => {
      const ship = Ship.withWaypoint().runCommands(["N3", "F1"]);
      expect(ship.getLocation()).toStrictEqual({ x: 10, y: 4 });
    });

    it("moving south moves the waypoint", () => {
      const ship = Ship.withWaypoint().runCommands(["S3", "F1"]);
      expect(ship.getLocation()).toStrictEqual({ x: 10, y: -2 });
    });

    it("moving east moves the waypoint", () => {
      const ship = Ship.withWaypoint().runCommands(["E3", "F1"]);
      expect(ship.getLocation()).toStrictEqual({ x: 13, y: 1 });
    });

    it("moving west moves the waypoint", () => {
      const ship = Ship.withWaypoint().runCommands(["W3", "F1"]);
      expect(ship.getLocation()).toStrictEqual({ x: 7, y: 1 });
    });

    it("can rotate the waypoint", () => {
      const ship = Ship.withWaypoint().runCommands(["R90", "F1"]);
      expect(ship.getLocation()).toStrictEqual({ x: 1, y: -10 });
    });

    it("part 2 example", () => {
      const ship = Ship.withWaypoint().runCommands([
        "F10",
        "N3",
        "F7",
        "R90",
        "F11",
      ]);
      expect(ship.getLocation()).toStrictEqual({ x: 214, y: -72 });
    });
  });
});
