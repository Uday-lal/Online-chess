"use client";

export class MoveCalculator {
  constructor(posX, posY, board, keyword) {
    this.posX = posX;
    this.posY = posY;
    this.board = board;
    this.keyword = keyword;
  }

  calculateMoves() {
    let moves = [];
    if (this.keyword[0] === "p") {
      moves = this.#pawnMoveCalculation();
    }
    return moves;
  }

  #pawnMoveCalculation() {
    // ...
  }

  #straightMotion(steps) {
    // ...
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
