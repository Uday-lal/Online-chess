"use client";

function Rook(props) {
  const nextMove = () => {
    // ...
  };
  return (
    <>
      {props.side === "black" ? (
        <img
          style={props.style}
          src="/images/rook_black.svg"
          alt="rook_black"
        />
      ) : (
        <>
          <img
            style={props.style}
            src="/images/rook_white.svg"
            alt="rook_black"
          />
        </>
      )}
    </>
  );
}

export default Rook;
