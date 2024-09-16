"use client";
import { motion, useDragControls } from "framer-motion";

function Pawn(props) {
  const controls = useDragControls();
  const activation = () => {
    // calculale next moves
    props.activationCallback("hello");
  };

  const deactivation = () => {
    const keyword = props.side === "black" ? "pb" : "pw";
    props.deActivationCallback(props.posX, props.posY, keyword);
  };
  return (
    <>
      {props.side === "black" ? (
        <motion.img
          style={props.style}
          drag
          dragControls={controls}
          src="/images/pawn_black.svg"
          onMouseDown={activation}
          onMouseUp={deactivation}
          alt="pawn_black"
        />
      ) : (
        <>
          <motion.img
            style={props.style}
            drag
            dragControls={controls}
            onMouseDown={activation}
            onMouseUp={deactivation}
            src="/images/pawn_white.svg"
            alt="pawn_black"
          />
        </>
      )}
    </>
  );
}
export default Pawn;
