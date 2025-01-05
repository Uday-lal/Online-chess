function initalizeBoard() {
  const boardState = {};

  const maxCount = 8;

  const firstCol = ["rb1", "hb1", "bb1", "kb", "qb", "bb2", "hb2", "rb2"];
  const secondCol = Array.from(
    { length: maxCount },
    (_, index) => `pb${index}`
  );
  const lastCol = ["rw1", "hw1", "bw1", "kw", "qw", "bw2", "hw2", "rw2"];
  const lastSecondCol = Array.from(
    { length: maxCount },
    (_, index) => `pw${index}`
  );

  for (let i = 0; i < maxCount; i++) {
    if (i === 0) {
      for (let j = 0; j < firstCol.length; j++) {
        boardState[firstCol[j]] = [i, j];
      }
    } else if (i === 1) {
      for (let j = 0; j < secondCol.length; j++) {
        boardState[secondCol[j]] = [i, j];
      }
    } else if (i === maxCount - 2) {
      for (let j = 0; j < lastSecondCol.length; j++) {
        boardState[lastSecondCol[j]] = [i, j];
      }
    } else if (i === maxCount - 1) {
      for (let j = 0; j < lastCol.length; j++) {
        boardState[lastCol[j]] = [i, j];
      }
    }
  }

  return boardState;
}

module.exports = initalizeBoard;
