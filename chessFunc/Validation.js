class Validation {
  /*
        Args:
            Board and Piece are pritty stright forward
            cPosX: Mean current position X
            cPosY: Mean current position Y
            wPosX: Mean wishes position X 
            wPosY: Mean wishes position Y 
    */
  constructor(board, piece, cPosx, cPosY, wPosX, wPosY) {
    this.board = board;
    this.piece = piece;
    this.cPosX = cPosX;
    this.cPosY = cPosY;
    this.wPosX = wPosX;
    this.wPosY = wPosY;
    this.calculatedMove = [];
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
