export abstract class Ship {
  y: number;
  x: number;

  static startingShip(): Ship {
    return new EastFacingShip({ x: 0, y: 0 });
  }

  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  getLocation(): { x: number; y: number } {
    return { x: this.x, y: this.y };
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

  abstract moveTo({ x, y }): Ship;

  abstract moveForward(amount: number): Ship;

  moveSouth(amount: number): Ship {
    return this.moveTo({ x: this.x, y: this.y - amount });
  }

  moveWest(amount: number): Ship {
    return this.moveTo({ x: this.x - amount, y: this.y });
  }

  moveEast(amount: number): Ship {
    return this.moveTo({ x: this.x + amount, y: this.y });
  }

  moveNorth(amount: number): Ship {
    return this.moveTo({ x: this.x, y: this.y + amount });
  }
}

class EastFacingShip extends Ship {
  turnRight(): Ship {
    return new SouthFacingShip({ x: this.x, y: this.y });
  }

  moveTo({ x, y }): Ship {
    return new EastFacingShip({ x, y });
  }

  moveForward(amount: number): Ship {
    return this.moveEast(amount);
  }
}

class SouthFacingShip extends Ship {
  turnRight(): Ship {
    return new WestFacingShip({ x: this.x, y: this.y });
  }

  moveTo({ x, y }): Ship {
    return new SouthFacingShip({ x, y });
  }

  moveForward(amount: number): Ship {
    return this.moveSouth(amount);
  }
}

class WestFacingShip extends Ship {
  turnRight(): Ship {
    return new NorthFacingShip({ x: this.x, y: this.y });
  }

  moveTo({ x, y }): Ship {
    return new WestFacingShip({ x, y });
  }

  moveForward(amount: number): Ship {
    return this.moveWest(amount);
  }
}

class NorthFacingShip extends Ship {
  turnRight(): Ship {
    return new EastFacingShip({ x: this.x, y: this.y });
  }

  moveTo({ x, y }): Ship {
    return new NorthFacingShip({ x, y });
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
