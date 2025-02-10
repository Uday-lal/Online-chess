const PawnValidation = require("./PawnValidation");

/*
{
  peice: {
    quantity: number,
    positions: [[x, y] ... [x, y]]
  }
}
*/

class Validation {
  constructor(board, piece, cPosX, cPosY, wPosX, wPosY) {
    this.board = board;
    this.piece = piece;
    this.cPosX = cPosX;
    this.cPosY = cPosY;
    this.wPosX = wPosX;
    this.wPosY = wPosY;
    this.calculatedMove = [];
    this.side = null;

    this.getSide();
  }

  getSide() {
    if (this.piece[1] === "w") {
      this.side = "white";
    } else {
      this.side = "black";
    }
  }

  validate() {
    if (this.piece[0] == "p") {
      const moves = this.calculatePawnMoves();
    } else if (this.piece[0] === "r") {
      this.calculateRookMoves();
    } else if (this.piece[0] === "k") {
      this.calculateKingMoves();
    } else if (this.piece[0] === "q") {
      this.calculateQueenMoves();
    } else if (this.piece[0] === "h") {
      this.calculateKnightMoves();
    } else if (this.piece[0] === "b") {
      this.calculateBishopMoves();
    }
  }

  calculatePawnMoves() {}

  calculateRookMoves() {
    // ...
  }

  calculateKingMoves() {
    // ...
  }

  calculateQueenMoves() {
    // ...
  }

  calculateBishopMoves() {
    // ...
  }

  calculateKnightMoves() {
    // ...
  }
}

module.exports = Validation;
