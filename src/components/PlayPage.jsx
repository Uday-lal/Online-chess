"use client";
import BoardController from "@/components/BoardController";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function PlayPage(props) {
  const router = useRouter();
  const [playerData, setPlayerData] = useState(null);

  const getPlayersData = async () => {
    const uuid = localStorage.getItem("uuid");
    const url = `/v1/room/info?uuid=${uuid}&roomId=${props.roomId}`;
    try {
      const res = await axios.get(url);
      setPlayerData(res.data);
    } catch (err) {
      if (err.response && err.response.status == "404") {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    getPlayersData();
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex justify-center items-center h-full w-auto">
        <div className="!w-[60vh] h-[60vh]">
          {playerData && (
            <BoardController
              playerName={playerData.name}
              opp={playerData.opp}
              roomId={props.roomId}
              side={playerData.side}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayPage;
