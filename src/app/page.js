import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Board from "@/components/Board";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <main className="w-full">
        <div className="absolute z-[-10] right-[0px] rotate-[45deg] top-[-12%] h-[200vh] w-1/3 bg-black"></div>
        <section className="w-full h-[90vh] pt-[20vh] p-4 md:px-[100px] 3xl:px-[200px] *:w-full grid grid-cols-[65%_35%]">
          <div className="section_left pt-[50px] relative">
            <img
              src="/images/big_hourse.svg"
              className="absolute top-[-20%] z-[-100] left-[30%]"
            />
            <h1 className="text-3xl font-semibold">Hi There, I’m Uday</h1>
            <h2 className="text-[3vw] font-bold mt-4">
              And This Is My Chess Game
            </h2>
            <div>
              <button className="bg-black text-white px-[35px] py-[10px] mt-8 rounded-md">
                Let's Play
              </button>
            </div>
          </div>
          <div className="section_right !w-[55vh] h-[55vh]">
            <div className="w-full h-full board_container">
              <Board />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
