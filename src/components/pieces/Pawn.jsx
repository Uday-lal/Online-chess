"use client";
import { motion, useDragControls } from "framer-motion";
import { useState } from "react";

function Pawn(props) {
  const controls = useDragControls();
  const keyword = props.side === "black" ? "pb" : "pw";
  const [moveBack, setMoveBack] = useState(false);

  const activation = () => {
    setMoveBack(false);
    props.activationCallback();
  };

  const calculateNextMoves = () => {
    let x = props.posX;
    let y = props.posY;
    let forwardSteps = x == 1 || 7 - x == 1 ? 2 : 1;
    // let diagonalSteps = 1;
    let moves = [];

    // Move forward
    for (let i = 0; i < forwardSteps; i++) {
      x += 1 * props.direction;
      if (props.board[x][y] === "") moves.push([x, y]);
    }

    x = props.posX; // resetting values for further calculations

    // Move diagonal left <-
    const dlx = x + 1 * props.direction;
    const dly = y - 1;
    if (dlx > -1 && dlx < 8 && dly > -1 && dly < 8) {
      moves.push([x + 1 * props.direction, y - 1]);
    }
    // Move diagonal right ->
    const drx = x + 1 * props.direction;
    const dry = y + 1;

    if (drx > -1 && drx < 8 && dry > -1 && dry < 8) {
      moves.push([x + 1 * props.direction, y + 1]);
    }
    return moves;
  };

  const deactivation = () => {
    const moves = calculateNextMoves();
    const isValidMoves = props.checkMoveValidity(moves);
    if (isValidMoves) {
      props.deActivationCallback(props.posX, props.posY, keyword);
    } else {
      setMoveBack(true);
    }
  };

  return (
    <>
      {props.side === "black" ? (
        <motion.span
          style={props.style}
          drag={!props.pause}
          dragControls={controls}
          animate={moveBack ? { x: 0, y: 0 } : {}}
          className="bg-[url('/images/pawn_black.svg')] bg-cover w-full h-full block"
          onMouseDown={activation}
          onMouseUp={deactivation}
        />
      ) : (
        <>
          <motion.span
            style={props.style}
            drag={!props.pause}
            className="bg-[url('/images/pawn_white.svg')] bg-cover w-full h-full block"
            animate={moveBack ? { x: 0, y: 0 } : {}}
            dragControls={controls}
            onMouseDown={activation}
            onMouseUp={deactivation}
          />
        </>
      )}
    </>
  );
}
export default Pawn;
