"use client";
import { useState } from "react";
import io from "socket.io-client";
import CircularProgress from "@mui/material/CircularProgress";
import { motion, AnimatePresence } from "framer-motion";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useRouter } from "next/navigation";

function ConnectButton(props) {
  // const [token, setToken] = useState(null);
  const [deactivate, setDeactivate] = useState(false);
  const [openJoinRoomModel, setOpenJoinRoomModel] = useState(false);
  const [openCreateRoomModel, setOpenCreateRoomModel] = useState(false);
  const router = useRouter();
  const _token = makeToken(10);
  const socket = io();

  const sendConnectionReq = (userObj) => {
    const message = JSON.stringify(userObj);
    socket.emit("findMatch", message);
    socket.on("findMatchStatus", handleMatchStatus);
  };

  const handleCreateRoom = () => {
    // ...
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = new URLSearchParams();

    for (let input of form) {
      data.append(input[0], input[1]);
    }
    const name = data.get("name");
    sendConnectionReq({ name: name, token: _token });
    setDeactivate(true);
    setOpenJoinRoomModel(false);
  };

  const getUUID = (serverMsg) => {
    const players = serverMsg.players;
    for (let player of players) {
      if (player.token === _token) {
        return player.uuid;
      }
    }
  };

  const handleMatchStatus = (response) => {
    const message = JSON.parse(response);
    const matchStatus = message.matchStatus;

    if (matchStatus === "wait") {
      console.log("Server put you in the waiting list");
      console.log(message);
    } else if (matchStatus === "startMatch") {
      const uuid = getUUID(message);
      localStorage.setItem("uuid", uuid);
      socket.disconnect();
      router.push(`/play/${message.roomId}`);
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
      <AnimatePresence>
        {openJoinRoomModel && (
          <motion.div
            initial={{
              background: "#00000000",
            }}
            animate={{
              background: "#00000098",
            }}
            exit={{
              background: "#00000000",
            }}
            className="fixed z-[99999] top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center"
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="p-4 bg-white rounded-2xl relative"
            >
              <h3 className="text-[1.5rem] font-bold">Join Room</h3>
              <div className="absolute top-2 right-2">
                <IconButton onClick={() => setOpenJoinRoomModel(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </div>
              <form onSubmit={handleJoinRoom}>
                <div className="w-full *:w-full *:!my-1.5 my-2.5">
                  <TextField
                    id="name"
                    label="Enter Name"
                    name="name"
                    type="text"
                    variant="outlined"
                  />
                  {/* <TextField
                    id="room_code"
                    label="Enter Room Code"
                    name="room_code"
                    type="text"
                    variant="outlined"
                  /> */}
                </div>
                <Button
                  style={{ backgroundColor: "black" }}
                  type="submit"
                  size="medium"
                  variant="contained"
                >
                  Submit
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {openCreateRoomModel && (
          <motion.div
            initial={{
              background: "#00000000",
            }}
            animate={{
              background: "#00000098",
            }}
            exit={{
              background: "#00000000",
            }}
            className="fixed z-[99999] top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center"
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="p-4 bg-white rounded-2xl relative"
            >
              <h3 className="text-[1.5rem] font-bold">Create Room</h3>
              <div className="absolute top-2 right-2">
                <IconButton onClick={() => setOpenCreateRoomModel(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </div>
              <form action="">
                <div className="w-[500px] *:w-full *:!my-1.5 my-2.5">
                  <TextField
                    id="name"
                    label="Enter Name"
                    name="name"
                    type="text"
                    variant="outlined"
                  />
                </div>
                <Button
                  style={{ backgroundColor: "black" }}
                  type="submit"
                  size="medium"
                  variant="contained"
                >
                  Submit
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-5">
        {deactivate ? (
          <>
            <button
              disabled
              className="cursor-not-allowed w-[157px] flex items-center justify-center px-[35px] py-[10px] text-white bg-black mr-[10px] rounded-md font-bold shadow-md"
            >
              <CircularProgress size="30px" style={{ color: "white" }} />
            </button>
            {/* <button
              disabled
              className="cursor-not-allowed px-[35px] py-[10px] bg-[#B7C0D8] rounded-md font-bold shadow-md"
            >
              Create Room
            </button> */}
          </>
        ) : (
          <>
            <button
              onClick={() => setOpenJoinRoomModel(true)}
              className="px-[35px] py-[10px] text-white bg-black mr-[10px] rounded-md font-bold shadow-md"
            >
              Join Room
            </button>
            {/* <button
              onClick={() => setOpenCreateRoomModel(true)}
              className="px-[35px] py-[10px] bg-[#B7C0D8] rounded-md font-bold shadow-md"
            >
              Create Room
            </button> */}
          </>
        )}
      </div>
    </>
  );
}

export default ConnectButton;
