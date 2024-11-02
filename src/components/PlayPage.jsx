"use client";
import BoardController from "@/components/BoardController";
import { useEffect } from "react";

function PlayPage(props) {
  useEffect(() => {
    const uuid = localStorage.getItem("uuid");
  }, []);
  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex justify-center items-center h-full w-auto">
        <div className="!w-[60vh] h-[60vh]">
          <BoardController />
        </div>
      </div>
    </div>
  );
}

export default PlayPage;
