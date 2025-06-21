import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="row-start-1 flex gap-[24px] flex-wrap items-center justify-center">
        <span className="text-red-500 font-bold text-3xl bg-red-100 py-2 px-4 rounded opacity-50">
          THIS IS A CONCEPT
        </span>
      </header>
      {/* Main */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="NetPay"
            width={150}
            height={150}
            className="rounded-full"
          />
          <h1 className="text-7xl text-[#0f3471] font-bold">NetPay</h1>
          <p className="font-bold mt-8">
            <Link
              href="/calculator"
              className="text-[white] font-bold bg-[#0f3471] py-2 px-4 rounded"
            >
              See your NetPay
            </Link>
          </p>
        </div>
      </main>
      {/* Footer */}
      <footer className="row-start-3 flex flex-col gap-[24px] flex-wrap items-center justify-center">
        <span className="text-[#0f3471] font-bold text-xs">
          Made by Amour Hamisi Omar &copy; {new Date().getFullYear()} --
          experiment
        </span>
        <div className="flex gap-4 flex-wrap items-center justify-center">
          <span>
            <Link href="/about" className="text-[#0f3471] font-bold text-xs">
              About
            </Link>
          </span>
          <span>
            <Link
              href="https://github.com/amouromar"
              className="text-[#0f3471] font-bold text-xs"
            >
              GitHub
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
