import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
import { Fieldset } from "@repo/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-y-hidden flex justify-center items-center before:absolute before:inset-0 before:opacity-50 before:bg-center before:bg-cover before:bg-[url(/img/netflix-background.jpg)]">
      <div className="z-10 w-full max-w-[450px] rounded-md p-16 bg-black/85">
        <div className="mb-4">
          <h1 className="text-4xl font-bold">Entrar</h1>
        </div>
        <form>
          <Fieldset label="Email" />
          <Fieldset label="Senha" type="password" />
          <Button text="Entrar" className="mb-4 bg-red-600" />
          <div className="flex items-center">
            <hr className="w-full border-neutral-600" />
            <p className="text-neutral-400 uppercase px-2">ou</p>
            <hr className="w-full border-neutral-600" />
          </div>
          <Button
            text="Usar um código de acesso"
            className="my-4 bg-white/20"
          />
        </form>
        <div className="w-full text-center mb-2">
          <Link
            href="/"
            className="inline underline underline-offset-3 hover:text-neutral-400"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <Checkbox id="rememberMe" label="Lembre-se de mim" />
        <div className="mb-4">
          <p>Primeira vez aqui? Assine agora</p>
        </div>
        <p className="text-sm text-neutral-500">
          Esta página é protegida pelo Google reCAPTCHA para garantir que você
          não é um robô.
        </p>
        <button className="text-sm text-blue-500 underline">
          <p>Saiba mais</p>
        </button>
      </div>
    </main>
  );
}
