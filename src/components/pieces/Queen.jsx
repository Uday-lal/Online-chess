"use client";

function Queen(props) {
  return (
    <>
      {props.side === "black" ? (
        <img
          style={props.style}
          src="/images/queen_black.svg"
          alt="queen_black"
        />
      ) : (
        <>
          <img
            style={props.style}
            src="/images/queen_white.svg"
            alt="queen_black"
          />
        </>
      )}
    </>
  );
}

export default Queen;
