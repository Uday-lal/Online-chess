"use client";

export class MoveCalculator {
  constructor(posX, posY, pieceName) {
    this.posX = posX;
    this.posY = posY;
    this.pieceName = pieceName;
    this.direction = pieceName[1] === "b" ? -1 : 1;
  }

  calculateMoves() {
    let moves = [];
    if (this.pieceName[0] === "p") {
      moves = this.#pawnMoveCalculation();
    }
    return moves;
  }

  #pawnMoveCalculation() {
    const diagonaLeft = this.#leftDiagonalMotion(1);
    const diagonaRight = this.#rightDiagonalMotion(1);
    let straightMotion;
    if (this.posX === 1 || this.posX - 8 === 1) {
      straightMotion = this.#straightMotion(2);
    } else {
      straightMotion = this.#straightMotion(1);
    }

    const moves = [straightMotion, diagonaLeft, diagonaRight];

    return moves;
  }

  #straightMotion(steps) {
    let x = this.posX;
    let stepCount = 0;

    while (x < 8 && stepCount < steps) {
      x += this.direction;
      stepCount++;
    }

    return [x, this.posY];
  }

  #sideMotion(steps) {
    // ...
  }

  #leftDiagonalMotion(steps) {
    // ...
  }

  #rightDiagonalMotion(steps) {
    // ...
  }
}
