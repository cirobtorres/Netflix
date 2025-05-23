import Link from "next/link";
import { SubmitButton } from "@repo/ui/button";
import { TextButton } from "@repo/ui/clientButtons";
import { Checkbox } from "@repo/ui/checkbox";
import { Fieldset } from "@repo/ui/input";
import { LoginHeader } from "../../components/Header";

// Se o usuário já tiver uma conta, essa conta já tiver sido identificada e o usuário acessar a page login

export default function LoginPage() {
  return (
    <main
      className="relative overflow-y-hidden min-h-screen flex flex-col items-center pb-12 before:absolute before:inset-0 before:bg-center before:bg-cover before:[background:linear-gradient(7deg,_rgba(0,_0,_0,_0.85)_10%,_rgba(0,_0,_0,_0.6)_97%),_url('/img/netflix-background.jpg')]" // before:opacity-50
    >
      <LoginHeader />
      <form className="z-10 w-full max-w-[450px] rounded-md p-16 bg-black/75">
        <Notification />
        <div className="mb-3">
          <h1 className="text-4xl font-bold">Entrar</h1>
        </div>
        <Fieldset label="Email" />
        <Fieldset label="Senha" type="password" />
        <SubmitButton text="Entrar" className="w-full mb-3" />
        <div className="flex items-center">
          <hr className="w-full border-neutral-600" />
          <p className="text-neutral-400 uppercase px-2">ou</p>
          <hr className="w-full border-neutral-600" />
        </div>
        <SubmitButton
          text="Usar um código de acesso"
          variant="ghost"
          className="w-full my-3"
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

const Notification = () => (
  <div className="w-full p-4 flex items-center gap-4 mb-4 rounded bg-indigo-900">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-check-icon lucide-circle-check shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
    <p>
      Parece que você já tem uma conta. Acesse abaixo para começar a assistir
    </p>
  </div>
);

const TextLink = ({ text }: { text: string }) => (
  <Link
    href="/"
    className="inline underline underline-offset-3 rounded transition-colors duration-200 hover:text-neutral-400 outline-2 outline-transparent focus-visible:outline-white focus-visible:outline-offset-2 focus-within:text-neutral-400"
  >
    {text}
  </Link>
);
