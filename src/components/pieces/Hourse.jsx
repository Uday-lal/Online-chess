"use client";

function Hourse(props) {
  return (
    <>
      {props.side === "black" ? (
        <img
          style={props.style}
          src="/images/hourse_black.svg"
          alt="hourse_black"
        />
      ) : (
        <>
          <img
            style={props.style}
            src="/images/hourse_white.svg"
            alt="hourse_black"
          />
        </>
      )}
    </>
  );
}

export default Hourse;
