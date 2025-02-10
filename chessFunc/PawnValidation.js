class PawnValidation {
  constructor(direction, currX, currY, posX, posY, boardState) {
    this.direction = direction;
    this.currX = currX;
    this.currY = currY;
    this.posX = posX;
    this.posY = posY;
    this.boardState = boardState;
  }

  runMoveValidation() {
    // Moves activation based on its direction
    let moves;

    if (this.currY === this.posY) {
      moves = this.northMoves();
      //   if (moves.includes([this.posX, this.posY])) {
      //     return
      //   }
    } else if (this.currX + 1 === this.posX) {
      moves = this.northEastMoves();
    } else if (this.currX - 1 === this.posX) {
      moves = this.northWestMoves();
    }
    throw new Error("Invalid Move");
  }

  northMoves() {
    let tempY = this.currY;
    const moves = Array({ length: 2 }).map((_, index) => {
      tempY += this.direction;
      return [this.currX, tempY];
    });
    return moves;
  }

  northWestMoves() {
    const moves = [[this.currX - 1, this.currY + this.direction]];
    return moves;
  }

  northEastMoves() {
    const moves = [[this.currX + 1, this.currY + this.direction]];
    return moves;
  }
}

module.exports = PawnValidation;
