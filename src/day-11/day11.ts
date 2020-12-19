interface Seat {
  shouldChange(neighborCount: number);
  next(neighborCount: number): Seat;
  isOccupied(): boolean;
}

class OccupiedSeat implements Seat {
  next(neighborCount: number): Seat {
    if (this.shouldChange(neighborCount)) {
      return new EmptySeat();
    } else {
      return this;
    }
  }

  shouldChange(neighborCount: number) {
    return neighborCount >= 4;
  }

  isOccupied(): boolean {
    return true;
  }
}

class FloorSeat implements Seat {
  next(neighborCount: number): Seat {
    return this;
  }

  shouldChange(neighborCount: number) {
    return false;
  }

  isOccupied(): boolean {
    return false;
  }
}

class EmptySeat implements Seat {
  next(neighborCount: number): Seat {
    if (this.shouldChange(neighborCount)) {
      return new OccupiedSeat();
    } else {
      return this;
    }
  }

  shouldChange(neighborCount: number) {
    return neighborCount == 0;
  }

  isOccupied(): boolean {
    return false;
  }
}

export class SeatGrid {
  seats: Seat[][];

  static parseFullGrid(rows: string[]) {
    return new SeatGrid(rows.map(this.parseRow));
  }

  private constructor(seats: Seat[][]) {
    this.seats = seats;
  }

  private static parseRow(row: string): Seat[] {
    const result = [];
    for (const ch of row) {
      result.push(SeatGrid.parseSeat(ch));
    }
    return result;
  }

  private static parseSeat(ch: string) {
    switch (ch) {
      case "#":
        return new OccupiedSeat();
      case ".":
        return new FloorSeat();
      case "L":
        return new EmptySeat();
    }
  }

  isOccupied(rowNumber: number, colNumber: number): boolean {
    if (rowNumber < 0 || rowNumber >= this.seats.length) {
      return false;
    }
    const row = this.seats[rowNumber];
    if (colNumber < 0 || colNumber >= row.length) {
      return false;
    }
    return row[colNumber].isOccupied();
  }

  occupantCount(): number {
    return this.seats
      .map((row) => row.filter((seat) => seat.isOccupied()).length)
      .reduce((a, b) => a + b);
  }

  nextGrid(): SeatGrid {
    const { nextGrid } = this.nextGridHelper();
    return nextGrid;
  }

  nextUntilStable(): SeatGrid {
    const { nextGrid, changed } = this.nextGridHelper();
    if (changed) {
      return nextGrid.nextUntilStable();
    } else {
      return nextGrid;
    }
  }

  isStable(): boolean {
    const { changed } = this.nextGridHelper();
    return !changed;
  }

  private nextGridHelper() {
    const newSeats = [];
    let changed = false;
    for (const rowNumber in this.seats) {
      const row = this.seats[rowNumber];
      const newRow = [];
      for (const colNumber in row) {
        const seat = row[colNumber];
        const neighborCount = this.getNeighborCount(+rowNumber, +colNumber);
        if (seat.shouldChange(neighborCount)) {
          changed = true;
        }
        newRow.push(seat.next(neighborCount));
      }
      newSeats.push(newRow);
    }
    return { nextGrid: new SeatGrid(newSeats), changed };
  }

  private getNeighborCount(rowNumber: number, colNumber: number) {
    return [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ]
      .map(([dx, dy]) => [rowNumber + dx, colNumber + dy])
      .filter(([x, y]) => this.isOccupied(x, y)).length;
  }
}

const fs = require("fs");
const contents = fs.readFileSync("files/day11.txt", "utf8");

const input = contents.split("\n");
const grid = SeatGrid.parseFullGrid(input);
console.log(grid.nextUntilStable().occupantCount());
