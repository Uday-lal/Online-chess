"use client";

function Pawn(props) {
  return (
    <>
      {props.side === "black" ? (
        <img
          style={props.style}
          src="/images/pawn_black.svg"
          alt="pawn_black"
        />
      ) : (
        <>
          <img
            style={props.style}
            src="/images/pawn_white.svg"
            alt="pawn_black"
          />
        </>
      )}
    </>
  );
}
export default Pawn;
