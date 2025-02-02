"use client";
import { useEffect, useState } from "react";
import Board from "./Board";
import Avatar from "@mui/material/Avatar";
import StyledBadge from "./StyledBadge";
import io from "socket.io-client";

function BoardController(props) {
  const [matchStart, setMatchStart] = useState(false);
  const socket = io();

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

  const onMove = (piece, posx, posy) => {
    console.log([piece, posx, posy]);
    const moveMsg = JSON.stringify({
      piece: piece,
      posx: posx,
      posy: posy,
      uuid: props.uuid
    });
  };

  const onOppMove = () => {
    // TODO: Handle opponent's your move
  };

  const isOppOnline = (response) => {
    const message = JSON.parse(response);
    console.log(message);
    console.log("working");
    const allOnline = message.allOnline;
    setMatchStart(allOnline);
  };

  useEffect(() => {
    // const uuid = localStorage.getItem("uuid");
    const msg = { token: props.joinToken };
    socket.emit("joinRoom", JSON.stringify(msg));
    socket.on("matchStatus", isOppOnline);
  }, []);

  const board = intiateBoard();

  return (
    <>
      <div className="mb-5 flex">
        {matchStart ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar src="/images/user.png" alt="user_1" />
          </StyledBadge>
        ) : (
          <Avatar src="/images/user.png" alt="user_2" />
        )}
        <div className="ml-2">
          <h4 className="font-bold">{props.opp.name}</h4>
        </div>
      </div>
      <Board board={board} handleMove={onMove} />
      <div className="mt-5 flex">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar src="/images/user.png" alt="user_1" />
        </StyledBadge>
        <div className="ml-2">
          <h4 className="font-bold">{props.playerName}</h4>
        </div>
      </div>
    </>
  );
}

export default BoardController;
