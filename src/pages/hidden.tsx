import { Game } from "~/components/game";
import Image from "next/image";
export default function Hidden() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#6d0202] to-[#000000]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Image alt="logo" src="/tube-logo.png" width={420} height={420}></Image>
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Title Me
        </h1>
        <h1 className="text-2xl font-medium tracking-tight text-white sm:text-[2rem]">
          Guess the title for these youtube comments.
        </h1>
        <Game />
      </div>
    </main>
  );
}
