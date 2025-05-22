import { Fieldset } from "@repo/ui/input";
import { Header } from "../components/Header";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-y-hidden flex flex-col items-center">
      <div
        className="h-full w-full flex-1 flex flex-col items-center"
        style={{
          background: `
            linear-gradient(7deg, rgba(0, 0, 0, 0.85) 10%, rgba(0, 0, 0, 0.6) 97%),
            url('/img/netflix-background.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <div className="z-10 my-auto max-w-[550px] w-full">
          <h1 className="text-center leading-20 text-6xl font-extrabold">
            Filmes, séries e muito mais, sem limites
          </h1>
          <p className="my-6">
            Quer assistir? Informe seu email para criar ou reiniciar sua
            assinatura.
          </p>
          <form className="flex gap-2">
            <Fieldset label="Email" className="mb-0 bg-neutral-900/75" />
            <button className="text-2xl px-6 cursor-pointer font-medium rounded transition-colors duration-200 bg-red-600 hover:bg-red-700 outline-2 outline-transparent focus-visible:outline-white focus-visible:outline-offset-2">
              Inscrever
            </button>
          </form>
        </div>
        <div className=" z-[1] w-full h-[6.5rem] relative">
          <div className="w-full h-full absolute top-0">
            <div
              className="relative h-full w-[130%] -left-[15%] border-x-4 border-t-0 border-transparent rounded-tl-[50%_100%] rounded-tr-[50%_100%]"
              style={{
                background:
                  "radial-gradient(50% 500% at 50% -420%, rgba(64, 97, 231, 0.4) 80%, rgba(0, 0, 0, 0.1) 100%), black",
              }}
            />
            <div className="absolute w-[130%] -left-[15%] inset-0 -z-[1] -mt-1 rounded-tl-[50%_100%] rounded-tr-[50%_100%] [background:linear-gradient(to_right,_rgba(33,_13,_22,_1)_16%,_rgba(184,_40,_105,_1),_rgba(229,_9,_20,_1),_rgba(184,_40,_105,_1),_rgba(33,_13,_22,_1)_84%)]" />
          </div>
        </div>
      </div>
    </main>
  );
}
