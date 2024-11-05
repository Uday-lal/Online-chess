import PlayPage from "@/components/PlayPage";

function Play({ params }) {
  return (
    <div className="w-full h-[100vh] bg-[#F4F7FA]">
      <PlayPage roomId={params.roomId} />
    </div>
  );
}

export default Play;
