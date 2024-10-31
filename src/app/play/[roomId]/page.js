import BoardController from "@/components/BoardController";

function Play() {
  return (
    <div className="w-full h-[100vh] bg-[#F4F7FA]">
      <div className="w-full h-full flex justify-center">
        <div className="flex justify-center items-center h-full w-auto">
          <div className="!w-[60vh] h-[60vh]">
            <BoardController />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Play;
