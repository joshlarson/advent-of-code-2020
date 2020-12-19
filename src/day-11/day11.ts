interface Seat {
  isFloor(): boolean;
  shouldChange(neighborCount: number, neighborThreshold: number);
  next(neighborCount: number, neighborThreshold: number): Seat;
  isOccupied(): boolean;
}

class WallSeat implements Seat {
  isFloor(): boolean {
    return false;
  }
  shouldChange(neighborCount: number, neighborThreshold: number) {
    return false;
  }
  next(neighborCount: number, neighborThreshold: number): Seat {
    return this;
  }
  isOccupied(): boolean {
    return false;
  }
}

class OccupiedSeat implements Seat {
  isFloor(): boolean {
    return false;
  }

  next(neighborCount: number, neighborThreshold: number): Seat {
    if (this.shouldChange(neighborCount, neighborThreshold)) {
      return new EmptySeat();
    } else {
      return this;
    }
  }

  shouldChange(neighborCount: number, neighborThreshold: number) {
    return neighborCount >= neighborThreshold;
  }

  isOccupied(): boolean {
    return true;
  }
}

class FloorSeat implements Seat {
  isFloor(): boolean {
    return true;
  }

  next(neighborCount: number, neighborThreshold: number): Seat {
    return this;
  }

  shouldChange(neighborCount: number, neighborThreshold: number) {
    return false;
  }

  isOccupied(): boolean {
    return false;
  }
}

class EmptySeat implements Seat {
  isFloor(): boolean {
    return false;
  }

  next(neighborCount: number, neighborThreshold: number): Seat {
    if (this.shouldChange(neighborCount, neighborThreshold)) {
      return new OccupiedSeat();
    } else {
      return this;
    }
  }

  shouldChange(neighborCount: number, neighborThreshold: number) {
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
    return this.getSeatAt(rowNumber, colNumber).isOccupied();
  }

  private getSeatAt(rowNumber: number, colNumber: number): Seat {
    if (rowNumber < 0 || rowNumber >= this.seats.length) {
      return new WallSeat();
    }
    const row = this.seats[rowNumber];
    if (colNumber < 0 || colNumber >= row.length) {
      return new WallSeat();
    }
    return row[colNumber];
  }

  occupantCount(): number {
    return this.seats
      .map((row) => row.filter((seat) => seat.isOccupied()).length)
      .reduce((a, b) => a + b);
  }

  nextGrid(
    { neighborThreshold, lineOfSight } = {
      neighborThreshold: 4,
      lineOfSight: false,
    }
  ): SeatGrid {
    const { nextGrid } = this.nextGridHelper({
      neighborThreshold,
      lineOfSight,
    });
    return nextGrid;
  }

  nextUntilStable(
    { neighborThreshold, lineOfSight } = {
      neighborThreshold: 4,
      lineOfSight: false,
    }
  ): SeatGrid {
    const { nextGrid, changed } = this.nextGridHelper({
      neighborThreshold,
      lineOfSight,
    });
    if (changed) {
      return nextGrid.nextUntilStable({
        neighborThreshold,
        lineOfSight,
      });
    } else {
      return nextGrid;
    }
  }

  isStable(
    { neighborThreshold, lineOfSight } = {
      neighborThreshold: 4,
      lineOfSight: false,
    }
  ): boolean {
    const { changed } = this.nextGridHelper({
      neighborThreshold,
      lineOfSight,
    });
    return !changed;
  }

  private nextGridHelper({
    neighborThreshold,
    lineOfSight,
  }: {
    neighborThreshold: number;
    lineOfSight: boolean;
  }) {
    const newSeats = [];
    let changed = false;
    for (const rowNumber in this.seats) {
      const row = this.seats[rowNumber];
      const newRow = [];
      for (const colNumber in row) {
        const seat = row[colNumber];
        const neighborCount = lineOfSight
          ? this.getLineOfSightNeighborCount(+rowNumber, +colNumber)
          : this.getNeighborCount(+rowNumber, +colNumber);
        if (seat.shouldChange(neighborCount, neighborThreshold)) {
          changed = true;
        }
        newRow.push(seat.next(neighborCount, neighborThreshold));
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

  private getLineOfSightNeighborCount(rowNumber: number, colNumber: number) {
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
      .map(([dx, dy]) => this.findFirstNonFloor(rowNumber, colNumber, dx, dy))
      .filter(([x, y]) => this.isOccupied(x, y)).length;
  }

  private findFirstNonFloor(
    rowNumber: number,
    colNumber: number,
    dRowNumber: number,
    dColNumber: number
  ) {
    const newRowNumber = rowNumber + dRowNumber;
    const newColNumber = colNumber + dColNumber;
    if (!this.isFloor(newRowNumber, newColNumber)) {
      return [newRowNumber, newColNumber];
    } else {
      return this.findFirstNonFloor(
        newRowNumber,
        newColNumber,
        dRowNumber,
        dColNumber
      );
    }
  }

  private isFloor(rowNumber: number, colNumber: number): boolean {
    return this.getSeatAt(rowNumber, colNumber).isFloor();
  }
}

// const fs = require("fs");
// const contents = fs.readFileSync("files/day11.txt", "utf8");

// const input = contents.split("\n");
// const grid = SeatGrid.parseFullGrid(input);
// console.log(grid.nextUntilStable().occupantCount());
// console.log(
//   grid
//     .nextUntilStable({ neighborThreshold: 5, lineOfSight: true })
//     .occupantCount()
// );
