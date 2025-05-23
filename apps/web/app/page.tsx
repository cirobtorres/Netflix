import { Fieldset } from "@repo/ui/input";
import { HomeHeader } from "../components/Header";
import { SubmitButton } from "@repo/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-y-hidden flex flex-col items-center">
      <div
        className="h-full w-full flex-1 flex flex-col items-center"
        style={{
          background:
            "linear-gradient(7deg, rgba(0, 0, 0, 0.85) 10%, rgba(0, 0, 0, 0.6) 97%), url('/img/netflix-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <HomeHeader />
        <div className="z-10 my-auto max-w-[550px] md:max-w-[650px] w-full px-10">
          <h1 className="text-center font-extrabold text-4xl leading-14 md:text-5xl md:leading-16 lg:text-7xl lg:leading-20">
            Filmes, séries e muito mais, sem limites
          </h1>
          <p className="text-center text-lg font-bold my-6">
            A partir de R$&nbsp;20,90. Cancele quando quiser.
          </p>
          <form className="flex flex-col">
            <h3 className="text-center mb-6">
              Quer assistir? Informe seu email para criar ou reiniciar sua
              assinatura.
            </h3>
            <div className="flex gap-2 flex-col md:flex-row">
              <Fieldset label="Email" className="mb-0 bg-neutral-900/75" />
              <SubmitButton text="Inscrever-se" className="mx-auto text-2xl" />
            </div>
          </form>
        </div>
        <NetflixBottomBorder />
      </div>
    </main>
  );
}

const NetflixBottomBorder = () => (
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
);
