import Link from "next/link";
import { NetflixLogo } from "../NetflixLogo";

export const HomeHeader = () => (
  <header className="w-full z-10 bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.8000)_0.000%,_rgba(0,_0,_0,_0.7889)_8.333%,_rgba(0,_0,_0,_0.7556)_16.67%,_rgba(0,_0,_0,_0.7000)_25.00%,_rgba(0,_0,_0,_0.6222)_33.33%,_rgba(0,_0,_0,_0.5222)_41.67%,_rgba(0,_0,_0,_0.4000)_50.00%,_rgba(0,_0,_0,_0.2778)_58.33%,_rgba(0,_0,_0,_0.1778)_66.67%,_rgba(0,_0,_0,_0.1000)_75.00%,_rgba(0,_0,_0,_0.04444)_83.33%,_rgba(0,_0,_0,_0.01111)_91.67%,_rgba(0,_0,_0,_0.000)_100.0%)]">
    <div className="max-w-7xl mx-auto w-full flex justify-between items-center py-4 px-12">
      <NetflixLogo />
      <Link
        href="/login"
        className="cursor-pointer px-4 py-2 text-sm font-medium rounded transition-colors duration-200 bg-red-600 hover:bg-red-700 outline-2 outline-transparent focus-visible:outline-white focus-visible:outline-offset-2"
      >
        Entrar
      </Link>
    </div>
  </header>
);

export const LoginHeader = () => (
  <header className="w-full z-10 bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.8000)_0.000%,_rgba(0,_0,_0,_0.7889)_8.333%,_rgba(0,_0,_0,_0.7556)_16.67%,_rgba(0,_0,_0,_0.7000)_25.00%,_rgba(0,_0,_0,_0.6222)_33.33%,_rgba(0,_0,_0,_0.5222)_41.67%,_rgba(0,_0,_0,_0.4000)_50.00%,_rgba(0,_0,_0,_0.2778)_58.33%,_rgba(0,_0,_0,_0.1778)_66.67%,_rgba(0,_0,_0,_0.1000)_75.00%,_rgba(0,_0,_0,_0.04444)_83.33%,_rgba(0,_0,_0,_0.01111)_91.67%,_rgba(0,_0,_0,_0.000)_100.0%)]">
    <div className="max-w-7xl mx-auto w-full py-4 px-12">
      <NetflixLogo />
    </div>
  </header>
);

export const SignupHeader = () => (
  <header className="w-full border-b border-neutral-800 z-10 bg-background">
    <div className="w-full mx-auto flex justify-between items-center py-4 px-12">
      <NetflixLogo />
      <Link
        href="/login"
        className="text-2xl uppsercase hover:underline rounded transition-colors duration-200 outline-2 outline-transparent focus-visible:outline-white focus-visible:outline-offset-2"
      >
        Entrar
      </Link>
    </div>
  </header>
);
