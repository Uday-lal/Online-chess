"use client";
import { useState } from "react";
import io from "socket.io-client";
import CircularProgress from "@mui/material/CircularProgress";

function ConnectButton(props) {
  const [token, setToken] = useState(null);
  const [deactivate, setDeactivate] = useState(false);

  const handleClick = () => {
    const socket = io();
    const _token = makeToken(10);
    setToken(_token);
    setDeactivate(true);
    const message = JSON.stringify({
      userName: "uday",
      token: _token,
    });
    socket.emit("findMatch", message);
    socket.on("findMatchStatus", handleMatchStatus);
  };

  const handleMatchStatus = (response) => {
    const message = JSON.parse(response);
    const matchStatus = message.matchStatus;

    if (matchStatus === "wait") {
      console.log("Server put you in the waiting list");
      console.log(message);
    } else if (matchStatus === "startMatch") {
      console.log("Match Started");
      console.log(message);
    }
  };

  function makeToken(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  return (
    <>
      {deactivate ? (
        <button
          onClick={handleClick}
          className={`${props.className} flex justify-center items-center w-[143px] h-[44px]`}
          disabled
          style={props.style}
        >
          <CircularProgress sx={{ color: "white" }} size="30px" />
        </button>
      ) : (
        <button
          onClick={handleClick}
          className={props.className}
          style={props.style}
        >
          {props.children}
        </button>
      )}
    </>
  );
}

export default ConnectButton;
