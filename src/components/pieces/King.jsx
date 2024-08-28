"use client";

function King(props) {
  return (
    <>
      {props.side === "black" ? (
        <img
          style={props.style}
          src="/images/king_black.svg"
          alt="king_black"
        />
      ) : (
        <>
          <img
            style={props.style}
            src="/images/king_white.svg"
            alt="king_black"
          />
        </>
      )}
    </>
  );
}

export default King;
