"use client";
import { useEffect } from "react";
import Board from "./Board";

function BoardController(props) {
  const intiateBoard = () => {
    const board = [];
    const maxCount = 8;

    const firstCol =
      props.side == "black"
        ? ["rw", "hw", "bw", "kw", "qw", "bw", "hw", "rw"]
        : ["rb", "hb", "bb", "kb", "qb", "bb", "hb", "rb"];

    const secondCol =
      props.side == "black"
        ? Array.from({ length: maxCount }, () => "pw")
        : Array.from({ length: maxCount }, () => "pb");

    const lastCol =
      props.side == "white"
        ? ["rw", "hw", "bw", "kw", "qw", "bw", "hw", "rw"]
        : ["rb", "hb", "bb", "kb", "qb", "bb", "hb", "rb"];

    const lastSecondCol =
      props.side == "white"
        ? Array.from({ length: maxCount }, () => "pw")
        : Array.from({ length: maxCount }, () => "pb");

    const emptyCol = Array.from({ length: maxCount }, () => "");

    for (let i = 0; i < maxCount; i++) {
      if (i === 0) {
        board.push(firstCol);
      } else if (i === 1) {
        board.push(secondCol);
      } else if (i === maxCount - 2) {
        board.push(lastSecondCol);
      } else if (i === maxCount - 1) {
        board.push(lastCol);
      } else {
        board.push(emptyCol);
      }
    }
    return board;
  };
  const board = intiateBoard();

  return (
    <>
      <Board board={board} />
    </>
  );
}

export default BoardController;
