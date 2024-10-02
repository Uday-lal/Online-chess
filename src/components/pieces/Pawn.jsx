"use client";
import { motion, useDragControls } from "framer-motion";

function Pawn(props) {
  const controls = useDragControls();
  const keyword = props.side === "black" ? "pb" : "pw";

  const activation = () => {
    const moves = calculateNextMoves();
    props.activationCallback(keyword, moves);
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
      moves.push([x, y]);
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
    props.deActivationCallback(props.posX, props.posY, keyword);
  };
  return (
    <>
      {props.side === "black" ? (
        <motion.span
          style={props.style}
          drag={!props.pause}
          dragControls={controls}
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
