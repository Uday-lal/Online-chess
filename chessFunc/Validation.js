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
    
    this.getSide()
  }

  getSide() {
    // this.piece.
  }

  validate() {
    // ...
  }

  calculatePawnMoves() {
    // ....
  }

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

