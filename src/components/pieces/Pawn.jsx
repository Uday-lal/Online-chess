"use client";
import { motion, useDragControls } from "framer-motion";

function Pawn(props) {
  const controls = useDragControls();
  const activation = () => {
    props.activationCallback("hello");
  };
  return (
    <>
      {props.side === "black" ? (
        <motion.img
          style={props.style}
          drag
          dragControls={controls}
          src="/images/pawn_black.svg"
          onClick={activation}
          alt="pawn_black"
        />
      ) : (
        <>
          <motion.img
            style={props.style}
            drag
            dragControls={controls}
            onClick={activation}
            src="/images/pawn_white.svg"
            alt="pawn_black"
          />
        </>
      )}
    </>
  );
}
export default Pawn;
