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
  const pieceKewords = {
    kw: <King side="white" />,
    kb: <King side="black" />,
    qw: <Queen side="white" />,
    qb: <Queen side="black" />,
    pw: <Pawn side="white" />,
    pb: <Pawn side="black" />,
    bw: <Bishop side="white" />,
    bb: <Bishop side="black" />,
    hw: <Hourse side="white" />,
    hb: <Hourse side="black" />,
    rw: <Rook side="white" />,
    rb: <Rook side="black" />,
  };

  const intiateBoard = () => {
    const board = [];
    const maxCount = 8;

    const firstCol = ["rw", "hw", "bw", "kw", "qw", "bw", "hw", "rw"];
    const secondCol = Array.from({ length: maxCount }, () => "pw");
    const lastSecondCol = Array.from({ length: maxCount }, () => "pb");
    const lastCol = ["rb", "hb", "bb", "qb", "kb", "bb", "hb", "rb"];

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
      {/* {Array.from({ length: colCount }).map((_, i) => (
        <div key={i} className="box_col grid grid-cols-8">
          {i % 2 === 0 ? (
            <>
              {Array.from({ length: rowCount }).map((_, j) => (
                <div
                  className={`box ${
                    j % 2 === 0 ? "bg-[#E8EDF9]" : "bg-[#B7C0D8]"
                  } `}
                  key={j + i}
                  style={{
                    width: `${boxWidth}px`,
                    height: `${boxHeight}px`,
                  }}
                ></div>
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: rowCount }).map((_, j) => (
                <div
                  className={`box ${
                    j % 2 === 0 ? "bg-[#B7C0D8]" : "bg-[#E8EDF9]"
                  } `}
                  key={j + i}
                  style={{
                    width: `${boxWidth}px`,
                    height: `${boxHeight}px`,
                  }}
                ></div>
              ))}
            </>
          )}
        </div>
      ))} */}
      {boardState.map((boardCol, i) => (
        <div key={i} className="box_col grid grid-cols-8">
          {i % 2 === 0 ? (
            <>
              {boardCol.map((piece, j) => (
                <div
                  className={`box ${
                    j % 2 === 0 ? "bg-[#E8EDF9]" : "bg-[#B7C0D8]"
                  } `}
                  key={j + i}
                  style={{
                    width: `${boxWidth}px`,
                    height: `${boxHeight}px`,
                  }}
                >
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
                  } `}
                  key={j + i}
                  style={{
                    width: `${boxWidth}px`,
                    height: `${boxHeight}px`,
                  }}
                >
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
