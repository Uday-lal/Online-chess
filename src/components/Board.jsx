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
  const [boardState, setBoardState] = useState([]);
  const [turn, setTurn] = useState("white");
  const coordinates = {
    x: null,
    y: null,
  };

  const handleActivation = () => {
    if (boxWidth > 0 && boxHeight > 0) {
      document.addEventListener("mousemove", handleMouseMove);
    }
  };

  const handleDeactivation = (x, y, keyword) => {
    document.removeEventListener("mousemove", handleMouseMove);

    if (boardState[x][y] === keyword) {
      const board = boardState.map((row) => [...row]);

      if (props.board) props.handleMove(keyword, coordinates.x, coordinates.y);

      board[x][y] = "";
      board[coordinates.x][coordinates.y] = keyword;
      setBoardState(board);
      setTurn((turn) => {
        return turn === "white" ? "black" : "white";
      });
    }
  };

  const checkMoveValidity = (validMoves) => {
    return validMoves.some(
      (move) => move[0] === coordinates.x && move[1] === coordinates.y
    );
  };

  const pieceKewords = {
    kw: (props) => (
      <King
        side="white"
        style={{ zIndex: "100" }}
        activationCallback={props.handleActivation || handleActivation}
        deActivationCallback={props.handleDeactivation || handleDeactivation}
        posX={props.posX}
        posY={props.posY}
      />
    ),
    kb: (props) => (
      <King
        side="black"
        style={{ zIndex: "100" }}
        activationCallback={props.handleActivation || handleActivation}
        deActivationCallback={props.handleDeactivation || handleDeactivation}
        posX={props.posX}
        posY={props.posY}
      />
    ),
    qw: (props) => (
      <Queen
        side={"white"}
        style={{ zIndex: "100" }}
        activationCallback={props.handleActivation || handleActivation}
        deActivationCallback={props.handleDeactivation || handleDeactivation}
        posX={props.posX}
        posY={props.posY}
      />
    ),
    qb: (props) => (
      <Queen
        side={"black"}
        style={{ zIndex: "100" }}
        activationCallback={props.handleActivation || handleActivation}
        deActivationCallback={props.handleDeactivation || handleDeactivation}
        posX={props.posX}
        posY={props.posY}
      />
    ),
    pw: (props) => (
      <Pawn
        side={"white"}
        style={{ zIndex: "100", pointerEvent: "none" }}
        activationCallback={props.handleActivation || handleActivation}
        deActivationCallback={props.handleDeactivation || handleDeactivation}
        checkMoveValidity={props.checkMoveValidity || checkMoveValidity}
        posX={props.posX}
        posY={props.posY}
        board={boardState}
        direction={-1}
        pause={turn === "black"}
      />
    ),
    pb: (props) => (
      <Pawn
        side={"black"}
        style={{ zIndex: "100", pointerEvent: "none" }}
        activationCallback={props.handleActivation || handleActivation}
        deActivationCallback={props.handleDeactivation || handleDeactivation}
        checkMoveValidity={props.checkMoveValidity || checkMoveValidity}
        posX={props.posX}
        board={boardState}
        posY={props.posY}
        direction={1}
        pause={turn === "white"}
      />
    ),
    bw: (props) => (
      <Bishop
        side="white"
        style={{ zIndex: "100" }}
        activationCallback={props.handleActivation || handleActivation}
        deActivationCallback={props.handleDeactivation || handleDeactivation}
        posX={props.posX}
        posY={props.posY}
      />
    ),
    bb: (props) => (
      <Bishop
        side="black"
        style={{ zIndex: "100" }}
        activationCallback={props.handleActivation || handleActivation}
        deActivationCallback={props.handleDeactivation || handleDeactivation}
        posX={props.posX}
        posY={props.posY}
      />
    ),
    hw: (props) => (
      <Hourse
        side="white"
        style={{ zIndex: "100" }}
        activationCallback={props.handleActivation || handleActivation}
        deActivationCallback={props.handleDeactivation || handleDeactivation}
        posX={props.posX}
        posY={props.posY}
      />
    ),
    hb: (props) => (
      <Hourse
        side="black"
        style={{ zIndex: "100" }}
        activationCallback={props.handleActivation || handleActivation}
        deActivationCallback={props.handleDeactivation || handleDeactivation}
        posX={props.posX}
        posY={props.posY}
      />
    ),
    rw: (props) => (
      <Rook
        side="white"
        style={{ zIndex: "100" }}
        activationCallback={props.handleActivation || handleActivation}
        deActivationCallback={props.handleDeactivation || handleDeactivation}
        posX={props.posX}
        posY={props.posY}
      />
    ),
    rb: (props) => (
      <Rook
        side="black"
        style={{ zIndex: "100" }}
        activationCallback={props.handleActivation || handleActivation}
        deActivationCallback={props.handleDeactivation || handleDeactivation}
        posX={props.posX}
        posY={props.posY}
      />
    ),
  };

  const intiateBoard = () => {
    const board = [];
    const maxCount = 8;

    const firstCol = ["rb", "hb", "bb", "kb", "qb", "bb", "hb", "rb"];
    const secondCol = Array.from({ length: maxCount }, () => "pb");
    const lastCol = ["rw", "hw", "bw", "kw", "qw", "bw", "hw", "rw"];
    const lastSecondCol = Array.from({ length: maxCount }, () => "pw");

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

  const calculateCoordinates = (posx, posy) => {
    const coordinates = [
      Math.floor(posy / boxHeight),
      Math.floor(posx / boxWidth),
    ];

    return coordinates;
  };

  const handleMouseMove = (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    const elementReact = boardRef.current.getBoundingClientRect();
    const boardWidth = elementReact.width;
    const boardHeight = elementReact.height;
    const boardX = elementReact.left + window.scrollX;
    const boardY = elementReact.top + window.scrollY;

    const x = posX - boardX;
    const y = posY - boardY;
    if (x >= 0 && y >= 0 && x < boardWidth && y < boardHeight) {
      const _coordinates = calculateCoordinates(x, y);
      // console.log(_coordinates);
      coordinates.x = _coordinates[0];
      coordinates.y = _coordinates[1];
    }
  };

  useEffect(() => {
    if (boardRef.current) {
      const elementReact = boardRef.current.getBoundingClientRect();
      const boardWidth = elementReact.width;
      const boardHeight = elementReact.height;
      setBoxWidth(boardWidth / 8);
      setBoxHeight(boardHeight / 8);
      props.board ? setBoardState(props.board) : intiateBoard();
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

                  {pieceKewords[piece]
                    ? pieceKewords[piece]({
                        posX: i,
                        posY: j,
                      })
                    : null}
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

                  {pieceKewords[piece]
                    ? pieceKewords[piece]({
                        posX: i,
                        posY: j,
                      })
                    : null}
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
