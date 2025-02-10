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
            boardState[firstCol[j]] = peiceData;
          } else {
            let _peiceData = {};
            _peiceData.quantity = 1;
            _peiceData.position = [];
            boardState[firstCol[j]] = _peiceData;
          }
        }
      } else if (i === 1) {
        for (let j = 0; j < secondCol.length; j++) {
          const peiceData = boardState[secondCol[j]];
          if (peiceData) {
            peiceData.quantity += 1;
            peiceData.position.push([i, j]);
            boardState[secondCol[j]] = peiceData;
          } else {
            let _peiceData = {};
            _peiceData.quantity = 1;
            _peiceData.position = [];
            boardState[secondCol[j]] = _peiceData;
          }
        }
      } else if (i === maxCount - 2) {
        for (let j = 0; j < lastSecondCol.length; j++) {
          const peiceData = boardState[lastSecondCol[j]];
          if (peiceData) {
            peiceData.quantity += 1;
            peiceData.position.push([i, j]);
            boardState[lastSecondCol[j]] = peiceData;
          } else {
            let _peiceData = {};
            _peiceData.quantity = 1;
            _peiceData.position = [];
            boardState[lastSecondCol[j]] = _peiceData;
          }
        }
      } else if (i === maxCount - 1) {
        for (let j = 0; j < lastCol.length; j++) {
          const peiceData = boardState[lastCol[j]];
          if (peiceData) {
            peiceData.quantity += 1;
            peiceData.position.push([i, j]);
            boardState[lastCol[j]] = peiceData;
          } else {
            let _peiceData = {};
            _peiceData.quantity = 1;
            _peiceData.position = [];
            boardState[lastCol[j]] = _peiceData;
          }
        }
      }
    }
  }

  return boardState;
}

module.exports = initalizeBoard;
