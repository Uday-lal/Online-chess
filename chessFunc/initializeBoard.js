function initalizeBoard() {
  const boardState = {};

  const maxCount = 8;

  const firstCol = ["rb", "hb", "bb", "kb", "qb", "bb", "hb", "rb"];
  const secondCol = Array.from({ length: maxCount }, (_, index) => `pb`);
  const lastCol = ["rw", "hw", "bw", "kw", "qw", "bw", "hw", "rw"];
  const lastSecondCol = Array.from({ length: maxCount }, (_, index) => `pw`);

  for (let i = 0; i < maxCount; i++) {
    for (let j = 0; j < maxCount; j++) {
      if (i === 0) {
        for (let j = 0; j < firstCol.length; j++) {
          const peiceData = boardState[firstCol[j]];
          if (peiceData) {
            peiceData.quantity += 1;
            peiceData.position.push([i, j]);
          } else {
            peiceData.quantity = 1;
            peiceData.position = [];
          }
          boardState[firstCol[j]] = peiceData;
        }
      } else if (i === 1) {
        for (let j = 0; j < secondCol.length; j++) {
          const peiceData = boardState[secondCol[j]];
          if (peiceData) {
            peiceData.quantity += 1;
            peiceData.position.push([i, j]);
          } else {
            peiceData.quantity = 1;
            peiceData.position = [];
          }
          boardState[firstCol[j]] = peiceData;
        }
      } else if (i === maxCount - 2) {
        for (let j = 0; j < lastSecondCol.length; j++) {
          const peiceData = boardState[lastSecondCol[j]];
          if (peiceData) {
            peiceData.quantity += 1;
            peiceData.position.push([i, j]);
          } else {
            peiceData.quantity = 1;
            peiceData.position = [];
          }
          boardState[firstCol[j]] = peiceData;
        }
      } else if (i === maxCount - 1) {
        for (let j = 0; j < lastCol.length; j++) {
          const peiceData = boardState[lastCol[j]];
          if (peiceData) {
            peiceData.quantity += 1;
            peiceData.position.push([i, j]);
          } else {
            peiceData.quantity = 1;
            peiceData.position = [];
          }
          boardState[firstCol[j]] = peiceData;
        }
      }
    }
  }

  return boardState;
}

module.exports = initalizeBoard;
