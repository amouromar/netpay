import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen mt-8 md:mt-0 p-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="row-start-1 flex gap-4 flex-col items-center justify-center md:mb-12">
        <Link href="/">
          <Image src="/logo.svg" alt="NetPay" width={50} height={50} />
        </Link>
        <span className="text-red-500 font-bold text-3xl bg-red-100 py-2 px-4 rounded opacity-50">
          THIS IS A CONCEPT
        </span>
      </header>

      {/* Main */}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-2xl text-center sm:text-left">
        <h1 className="text-3xl font-bold text-[#0f3471]">
          About <span className="underline underline-offset-8">NetPay</span>
        </h1>
        <p className="text-lg">
          NetPay is a conceptual tool designed to illustrate how hourly workers
          might track their take-home pay in real-time, accounting for federal
          and state taxes.
        </p>
        <p className="text-lg">
          This project is purely experimental, created to explore the idea of
          transparent earnings calculations for W-2 employees and self-employed
          individuals.
        </p>
        <p className="text-lg font-semibold">
          <span className="font-bold text-xl text-white bg-red-700 py-1 px-1 rounded">
            Disclaimer:
          </span>{" "}
          NetPay is not a legal or financial service. It does not provide tax
          advice, professional accounting, or certified payroll calculations.
          Always consult a qualified tax professional for accurate financial
          guidance.
        </p>
        <p className="text-lg">
          Developed as a proof-of-concept by Amour Hamisi Omar, NetPay aims to
          spark curiosity about personal finance tools while remaining a
          non-commercial experiment.
        </p>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex flex-col gap-[24px] flex-wrap items-center justify-center">
        <span className="text-[#0f3471] font-bold text-xs">
          Made by Amour Hamisi Omar © {new Date().getFullYear()} -- experiment
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
