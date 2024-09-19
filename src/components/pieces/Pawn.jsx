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
        <motion.span
          style={props.style}
          drag={!props.pause}
          dragControls={controls}
          src="/images/pawn_black.svg"
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
