class Validation {
  /*
        Args:
            Board and Piece are pritty stright forward
            posX: Mean wishes position X 
            posY: Mean wishes position Y 
    */
  constructor(board, piece, posX, posY) {
    this.board = board;
    this.piece = piece;
    this.posX = posX;
    this.posY = posY;
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
