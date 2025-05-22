import Link from "next/link";
import { SubmitButton, TextButton } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
import { Fieldset } from "@repo/ui/input";
import { Header } from "../../components/Header";

export default function LoginPage() {
  return (
    <main className="relative overflow-y-hidden min-h-screen flex flex-col items-center pb-12 before:absolute before:inset-0 before:opacity-50 before:bg-center before:bg-cover before:bg-[url(/img/netflix-background.jpg)]">
      <Header />
      <form className="z-10 w-full max-w-[450px] rounded-md p-16 bg-black/75">
        <div className="mb-3">
          <h1 className="text-4xl font-bold">Entrar</h1>
        </div>
        <Fieldset label="Email" />
        <Fieldset label="Senha" type="password" />
        <SubmitButton
          text="Entrar"
          className="mb-3 bg-red-600 hover:bg-red-700"
        />
        <div className="flex items-center">
          <hr className="w-full border-neutral-600" />
          <p className="text-neutral-400 uppercase px-2">ou</p>
          <hr className="w-full border-neutral-600" />
        </div>
        <SubmitButton
          text="Usar um código de acesso"
          className="my-3 bg-white/20 hover:bg-white/10"
        />
        <div className="w-full text-center mb-2">
          <TextLink text="Esqueceu a senha?" />
        </div>
        <Checkbox id="rememberMe" label="Lembre-se de mim" />
        <div className="mb-3">
          <p className="inline">Primeira vez aqui? </p>
          <TextLink text="Assine agora" />
        </div>
        <TextButton />
      </form>
    </main>
  );
}

const TextLink = ({ text }: { text: string }) => (
  <Link
    href="/"
    className="inline underline underline-offset-3 rounded transition-colors duration-200 hover:text-neutral-400 outline-2 outline-transparent focus-visible:outline-white focus-visible:outline-offset-2 focus-within:text-neutral-400"
  >
    {text}
  </Link>
);
