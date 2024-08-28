"use client";

function Bishop(props) {
  return (
    <>
      {props.side === "black" ? (
        <img
          style={props.style}
          src="/images/bishop_black.svg"
          alt="bishop_black"
        />
      ) : (
        <>
          <img
            style={props.style}
            src="/images/bishop_white.svg"
            alt="bishop_black"
          />
        </>
      )}
    </>
  );
}

export default Bishop;
