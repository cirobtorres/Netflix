import Link from "next/link";
import { cookies } from "next/headers";
import { SubmitButton } from "@repo/ui/button";
import { TextButton } from "@repo/ui/clientButtons";
import { Checkbox } from "@repo/ui/checkbox";
import { Fieldset, Input, Label, PasswordFieldset } from "@repo/ui/input";
import { LoginHeader } from "../../components/Header";
import { getUser } from "../../services/user";
import { cn } from "@acme/utils/index";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  const { error } = await searchParams;

  const token = (await cookies()).get("token");

  if (token) {
    const user = await getUser(token.value);

    if (user.ok) {
      const email = user.data.email;

      return <LoginForm initialData={{ email }} />;
    }

    if (user.statusCode === 403) {
      return <LoginForm error={{ invalidToken: true }} />;
    }
  }

  return <LoginForm error={{ invalidToken: error === "invalid_token" }} />;
}

const LoginForm = ({
  initialData,
  error,
}: {
  initialData?: { email?: string };
  error?: { invalidToken?: boolean };
}) => {
  return (
    <main
      className="relative overflow-y-hidden min-h-screen flex flex-col items-center pb-12 before:absolute before:inset-0 before:bg-center before:bg-cover before:[background:linear-gradient(7deg,_rgba(0,_0,_0,_0.85)_10%,_rgba(0,_0,_0,_0.6)_97%),_url('/img/netflix-background.jpg')]" // before:opacity-50
    >
      <LoginHeader />
      <form className="z-10 w-full max-w-[450px] rounded-md p-16 bg-black/75">
        {error?.invalidToken && (
          <Notification
            message="Sua conta expirou. Refaça seu login."
            options={{ color: "error" }}
          />
        )}
        {initialData?.email && (
          <Notification
            message="Parece que você já possui uma conta."
            options={{ color: "exists" }}
          />
        )}
        <div className="mb-3">
          <h1 className="text-4xl font-bold">Entrar</h1>
        </div>
        <Fieldset>
          <Input defaultValue={initialData?.email} />
          <Label label="Email" />
        </Fieldset>
        <PasswordFieldset label="Senha" setFocus={!!initialData?.email} />
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
};

const Notification = ({
  message,
  options,
}: {
  message: string;
  options?: { color?: "error" | "exists" };
}) => {
  let color;

  switch (options?.color) {
    case "error":
      color = "bg-red-900";
      break;
    case "exists":
      color = "bg-indigo-900";
      break;
    default:
      color = "bg-white/25";
  }

  return (
    <div
      className={cn("w-full p-4 flex items-center gap-4 mb-4 rounded", color)}
    >
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
      <p>{message}</p>
    </div>
  );
};

const TextLink = ({ text }: { text: string }) => (
  <Link
    href="/" // TODO
    className="inline underline underline-offset-3 rounded transition-colors duration-200 hover:text-neutral-400 outline-2 outline-transparent focus-visible:outline-white focus-visible:outline-offset-2 focus-within:text-neutral-400"
  >
    {text}
  </Link>
);
