"use client";
import { motion, useDragControls } from "framer-motion";

function King(props) {
  const controls = useDragControls();

  return (
    <>
      {props.side === "black" ? (
        <motion.img
          style={props.style}
          drag
          dragControls={controls}
          src="/images/king_black.svg"
          alt="king_black"
        />
      ) : (
        <>
          <motion.img
            style={props.style}
            src="/images/king_white.svg"
            drag
            dragControls={controls}
            alt="king_black"
          />
        </>
      )}
    </>
  );
}

export default King;
