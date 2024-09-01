"use client";
import { useEffect, useRef, useState } from "react";
import Pawn from "./pieces/Pawn";
import King from "./pieces/King";
import Queen from "./pieces/Queen";
import Bishop from "./pieces/Bishop";
import Hourse from "./pieces/Hourse";
import Rook from "./pieces/Rook";

function Board(props) {
  const boardRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const rowCount = 8;
  const colCount = 8;
  const [boardState, setBoardState] = useState([]);

  const handleActivation = (d) => {
    console.log(d);
  };

  const pieceKewords = {
    kw: (
      <King
        side="white"
        style={{ zIndex: "100" }}
        activationCallback={handleActivation}
      />
    ),
    kb: (
      <King
        side="black"
        style={{ zIndex: "100" }}
        activationCallback={handleActivation}
      />
    ),
    qw: (
      <Queen
        side="white"
        style={{ zIndex: "100" }}
        activationCallback={handleActivation}
      />
    ),
    qb: (
      <Queen
        side="black"
        style={{ zIndex: "100" }}
        activationCallback={handleActivation}
      />
    ),
    pw: (
      <Pawn
        side="white"
        style={{ zIndex: "100" }}
        activationCallback={handleActivation}
      />
    ),
    pb: (
      <Pawn
        side="black"
        style={{ zIndex: "100" }}
        activationCallback={handleActivation}
      />
    ),
    bw: (
      <Bishop
        side="white"
        style={{ zIndex: "100" }}
        activationCallback={handleActivation}
      />
    ),
    bb: (
      <Bishop
        side="black"
        style={{ zIndex: "100" }}
        activationCallback={handleActivation}
      />
    ),
    hw: (
      <Hourse
        side="white"
        style={{ zIndex: "100" }}
        activationCallback={handleActivation}
      />
    ),
    hb: (
      <Hourse
        side="black"
        style={{ zIndex: "100" }}
        activationCallback={handleActivation}
      />
    ),
    rw: (
      <Rook
        side="white"
        style={{ zIndex: "100" }}
        activationCallback={handleActivation}
      />
    ),
    rb: (
      <Rook
        side="black"
        style={{ zIndex: "100" }}
        activationCallback={handleActivation}
      />
    ),
  };

  const intiateBoard = () => {
    const board = [];
    const maxCount = 8;

    const firstCol = ["rw", "hw", "bw", "kw", "qw", "bw", "hw", "rw"];
    const secondCol = Array.from({ length: maxCount }, () => "pw");
    const lastSecondCol = Array.from({ length: maxCount }, () => "pb");
    const lastCol = ["rb", "hb", "bb", "kb", "qb", "bb", "hb", "rb"];

    const emptyCol = Array.from({ length: maxCount }, () => "");

    for (let i = 0; i < maxCount; i++) {
      if (i === 0) {
        board.push(firstCol);
      } else if (i === 1) {
        board.push(secondCol);
      } else if (i === maxCount - 2) {
        board.push(lastSecondCol);
      } else if (i === maxCount - 1) {
        board.push(lastCol);
      } else {
        board.push(emptyCol);
      }
    }

    setBoardState(board);
  };

  useEffect(() => {
    if (boardRef.current) {
      const elementReact = boardRef.current.getBoundingClientRect();
      const boardWidth = elementReact.width;
      const boardHeight = elementReact.height;
      setBoxWidth(boardWidth / 8);
      setBoxHeight(boardHeight / 8);

      intiateBoard();
    }
  }, []);

  return (
    <div ref={boardRef} className="w-full h-full border shadow-2xl rounded-lg">
      {boardState.map((boardCol, i) => (
        <div key={i} className="box_col grid grid-cols-8">
          {i % 2 === 0 ? (
            <>
              {boardCol.map((piece, j) => (
                <div
                  className={`box ${
                    j % 2 === 0 ? "bg-[#E8EDF9]" : "bg-[#B7C0D8]"
                  }`}
                  key={j + i}
                  // onMouseOver={() => handleHover(i, j)}
                  style={{
                    width: `${boxWidth}px`,
                    height: `${boxHeight}px`,
                  }}
                >
                  {/* <div
                    onMouseOver={() => handleHover(i, j)}
                    className="absolute top-0 left-0 w-full h-full"
                  /> */}
                  {pieceKewords[piece]}
                </div>
              ))}
            </>
          ) : (
            <>
              {boardCol.map((piece, j) => (
                <div
                  className={`box ${
                    j % 2 === 0 ? "bg-[#B7C0D8]" : "bg-[#E8EDF9]"
                  }`}
                  key={j + i}
                  style={{
                    width: `${boxWidth}px`,
                    height: `${boxHeight}px`,
                  }}
                >
                  {/* <div
                    onMouseOver={() => handleHover(i, j)}
                    className="absolute top-0 left-0 w-full h-full"
                  /> */}
                  {pieceKewords[piece]}
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Board;
