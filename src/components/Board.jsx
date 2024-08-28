"use client";
import { useEffect, useRef, useState } from "react";

function Board(props) {
  const boardRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const rowCount = 8;
  const colCount = 8;
  const [boardState, setBoardState] = useState([]);

  useEffect(() => {
    if (boardRef.current) {
      const elementReact = boardRef.current.getBoundingClientRect();
      const boardWidth = elementReact.width;
      const boardHeight = elementReact.height;
      setBoxWidth(boardWidth / 8);
      setBoxHeight(boardHeight / 8);
    }
  }, []);

  return (
    <div ref={boardRef} className="w-full h-full border shadow-2xl rounded-lg">
      {Array.from({ length: colCount }).map((_, i) => (
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
      ))}
    </div>
  );
}

export default Board;
