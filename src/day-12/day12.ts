class Location {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  south(amount: number): Location {
    return new Location(this.x, this.y - amount);
  }

  west(amount: number): Location {
    return new Location(this.x - amount, this.y);
  }

  east(amount: number): Location {
    return new Location(this.x + amount, this.y);
  }

  north(amount: number): Location {
    return new Location(this.x, this.y + amount);
  }
}

export abstract class Ship {
  location: Location;

  static startingShip(): Ship {
    return new EastFacingShip(new Location(0, 0));
  }

  constructor(location: Location) {
    this.location = location;
  }

  getLocation(): { x: number; y: number } {
    return { x: this.location.x, y: this.location.y };
  }

  runCommands(commands: string[]): Ship {
    if (commands.length == 0) {
      return this;
    } else {
      return this.runCommand(commands[0]).runCommands(commands.slice(1));
    }
  }

  runCommand(command: string): Ship {
    const direction = command[0];
    const amount = +command.substring(1);
    switch (direction) {
      case "N":
        return this.moveNorth(amount);
      case "E":
        return this.moveEast(amount);
      case "W":
        return this.moveWest(amount);
      case "S":
        return this.moveSouth(amount);
      case "F":
        return this.moveForward(amount);
      case "R":
        return this.turnRightBy(amount);
      case "L":
        return this.turnRightBy(360 - amount);
      default:
        throw `Invalid command ${command}`;
    }
  }

  turnRightBy(amount: number): Ship {
    if (amount == 0) {
      return this;
    }
    return this.turnRightBy(amount - 90).turnRight();
  }

  abstract turnRight(): Ship;

  abstract moveTo(location: Location): Ship;

  abstract moveForward(amount: number): Ship;

  abstract moveSouth(amount: number): Ship;

  abstract moveWest(amount: number): Ship;

  abstract moveEast(amount: number): Ship;

  abstract moveNorth(amount: number): Ship;
}

abstract class SimpleShip extends Ship {
  moveSouth(amount: number): Ship {
    return this.moveTo(this.location.south(amount));
  }

  moveWest(amount: number): Ship {
    return this.moveTo(this.location.west(amount));
  }

  moveEast(amount: number): Ship {
    return this.moveTo(this.location.east(amount));
  }

  moveNorth(amount: number): Ship {
    return this.moveTo(this.location.north(amount));
  }
}

class EastFacingShip extends SimpleShip {
  turnRight(): Ship {
    return new SouthFacingShip(this.location);
  }

  moveTo(location: Location): Ship {
    return new EastFacingShip(location);
  }

  moveForward(amount: number): Ship {
    return this.moveEast(amount);
  }
}

class SouthFacingShip extends SimpleShip {
  turnRight(): Ship {
    return new WestFacingShip(this.location);
  }

  moveTo(location: Location): Ship {
    return new SouthFacingShip(location);
  }

  moveForward(amount: number): Ship {
    return this.moveSouth(amount);
  }
}

class WestFacingShip extends SimpleShip {
  turnRight(): Ship {
    return new NorthFacingShip(this.location);
  }

  moveTo(location: Location): Ship {
    return new WestFacingShip(location);
  }

  moveForward(amount: number): Ship {
    return this.moveWest(amount);
  }
}

class NorthFacingShip extends SimpleShip {
  turnRight(): Ship {
    return new EastFacingShip(this.location);
  }

  moveTo(location: Location): Ship {
    return new NorthFacingShip(location);
  }

  moveForward(amount: number): Ship {
    return this.moveNorth(amount);
  }
}

const fs = require("fs");
const contents = fs.readFileSync("files/day12.txt", "utf8");

const input = contents.split("\n");
const ship = Ship.startingShip().runCommands(input);
console.log(ship.getLocation());
