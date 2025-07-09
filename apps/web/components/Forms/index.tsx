"use client";

import { Fieldset, EmailInput, Label, PasswordFieldset } from "@repo/ui/input";
import { SubmitButton } from "@repo/ui/button";
import { PlanSelectForm } from "../PlanSelect";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { CustomPaymentBrick } from "./CustomBrick";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, register } from "../../services/authentication/client";
import { useState } from "react";
import Link from "next/link";
import { updatePassword } from "../../services/user";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

// ----------------------------------------------------------------------------------------------------
// -----------------------------------========== FORMS ==========--------------------------------------
// ----------------------------------------------------------------------------------------------------
export const HomeForm = ({ token }: { token: RequestCookie | undefined }) => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onSuccess = () => {
    router.push(`/signup`);
  };

  const onError = (e: Error) => {
    console.error("HomeForm Error", e);
  };

  const mutationFn = async ({ email }: { email: string }) => {
    try {
      if (token) return;
      const regResult = await register({ email });

      if (regResult.ok) return regResult;

      if (regResult.statusCode === 409) {
        // 409 = conflict (user exists)
        const logResult = await login({ email });

        if (logResult.ok) {
          return logResult;
        }

        // Login failed
      }

      // register failed
    } catch (e) {
      console.error(e);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
    };

    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h3 className="text-center mb-6">
        Quer assistir? Informe seu email para criar ou reiniciar sua assinatura.
      </h3>
      <div className="flex gap-2 flex-col md:flex-row">
        <Fieldset className="mb-0 bg-neutral-900/75">
          <EmailInput
            value={email}
            onChange={handleChangeEmail}
            placeholder=""
            name="sign-up-email-input"
          />
          <Label label="Email" />
        </Fieldset>
        <SubmitButton
          disabled={isPending}
          text="Inscrever-se"
          className="mx-auto text-2xl"
        />
      </div>
    </form>
  );
};

// ----------------------------------------------------------------------------------------------------
export const SignupForm = () => {
  return (
    <div className="max-w-[400px] flex-1 flex flex-col justify-start items-start mt-10 mb-20">
      <Steps />
      <form className="flex flex-col">
        <h1 className="text-4xl font-extrabold">Escolha seu plano</h1>
        <ul>
          <CheckMark options={{ size: "32" }}>
            Sem compromisso, cancele quando quiser.
          </CheckMark>
          <CheckMark options={{ size: "32" }}>
            Entretenimento sem fim, por um preço baixo.
          </CheckMark>
          <CheckMark options={{ size: "32" }}>
            Divirta-se com a Netflix em todos os seus aparelhos.
          </CheckMark>
        </ul>
        <Link
          href="/signup/planform"
          className={
            `flex-1 flex-nowrap cursor-pointer` +
            ` text-2xl text-center text-nowrap font-medium` +
            ` px-6 py-4 shrink-0` +
            ` rounded outline-2 outline-transparent` +
            ` transition-colors duration-300` +
            ` bg-red-600 hover:bg-red-700 disabled:bg-neutral-700` +
            ` focus-visible:outline-white focus-visible:outline-offset-2`
          }
        >
          Prómixo
        </Link>
      </form>
    </div>
  );
};

// ----------------------------------------------------------------------------------------------------
export const ProceedForm = () => (
  <div className="max-w-[400px] flex-1 flex flex-col justify-start items-start mt-10 mb-20">
    <Steps />
    <form className="flex flex-col">
      <h1 className="text-4xl font-extrabold">
        Termine de configurar sua conta
      </h1>
      <p className="text-neutral-500 font-medium my-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quia
        perspiciatis beatae sit fugit facilis!
      </p>
      <Link
        href="/signup/regform"
        className={
          `flex-1 flex-nowrap cursor-pointer` +
          ` text-2xl text-center text-nowrap font-medium` +
          ` px-6 py-4 shrink-0` +
          ` rounded outline-2 outline-transparent` +
          ` transition-colors duration-300` +
          ` bg-red-600 hover:bg-red-700 disabled:bg-neutral-700` +
          ` focus-visible:outline-white focus-visible:outline-offset-2`
        }
      >
        Prómixo
      </Link>
    </form>
  </div>
);

// ----------------------------------------------------------------------------------------------------
export const RegistrationForm = () => (
  <div className="max-w-[400px] flex-1 flex flex-col justify-start items-start mt-10 mb-20">
    <Steps />
    <form className="flex flex-col">
      <h1 className="text-4xl font-extrabold">
        Termine de configurar sua conta
      </h1>
      <p className="text-neutral-500 font-medium my-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quia
        perspiciatis beatae sit fugit facilis!
      </p>
      <Link
        href="/signup/planform"
        className={
          `flex-1 flex-nowrap cursor-pointer` +
          ` text-2xl text-nowrap text-center font-medium` +
          ` px-6 py-4 shrink-0` +
          ` rounded outline-2 outline-transparent` +
          ` transition-colors duration-300` +
          ` bg-red-600 hover:bg-red-700 disabled:bg-neutral-700` +
          ` focus-visible:outline-white focus-visible:outline-offset-2`
        }
      >
        Prómixo
      </Link>
    </form>
  </div>
);

// ----------------------------------------------------------------------------------------------------
export const CreateEmailPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  return (
    <div className="max-w-[400px] flex-1 flex flex-col justify-start items-start mt-10 mb-20">
      <Steps />
      <form className="flex flex-col">
        <h1 className="text-4xl font-extrabold">
          Crie uma senha para iniciar sua assinatura
        </h1>
        <p className="text-neutral-500 font-medium my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, quia
          perspiciatis beatae sit fugit facilis!
        </p>
        <Fieldset>
          <EmailInput
            value={email}
            onChange={handleChangeEmail}
            placeholder=""
            name="sign-up-email-input"
          />
          <Label label="Email" />
        </Fieldset>
        <PasswordFieldset
          label="Informe a senha"
          value={password}
          onChange={handlePassword}
        />
        <button
          className={
            `flex-1 flex-nowrap cursor-pointer` +
            ` text-2xl text-nowrap font-medium` +
            ` px-6 py-4 shrink-0` +
            ` rounded outline-2 outline-transparent` +
            ` transition-colors duration-300` +
            ` bg-red-600 hover:bg-red-700 disabled:bg-neutral-700` +
            ` focus-visible:outline-white focus-visible:outline-offset-2`
          }
        >
          Prómixo
        </button>
      </form>
    </div>
  );
};

// ----------------------------------------------------------------------------------------------------
export const VerifyEmailForm = () => (
  <div className="max-w-[400px] flex-1 flex flex-col justify-start items-start mt-10 mb-20">
    <Steps />
    <form className="flex flex-col">
      <h1 className="text-4xl font-extrabold">Verifique seu email</h1>
      <p className="text-neutral-500 font-medium my-4">
        Para confirmar, clique no link que enviamos para{" "}
        <span className="text-foreground font-bold">johndoe@email.com.br</span>.
      </p>
      <p className="text-neutral-500 font-medium my-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, a
        dolores. Sequi ipsum sit itaque deserunt labore, voluptatibus tempora
        magnam repellendus!
      </p>
      <button className="flex-1 px-6 shrink-0 flex-nowrap text-nowrap font-medium rounded cursor-pointer py-4 transition-colors duration-300 outline-2 outline-transparent bg-white/20 hover:bg-white/10 focus-visible:outline-white focus-visible:outline-offset-2">
        Reenviar link
      </button>
    </form>
  </div>
);

// ----------------------------------------------------------------------------------------------------
export const CreatePasswordForm = ({
  token,
  user,
}: {
  token: RequestCookie;
  user: User;
}) => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onSuccess = () => {
    router.push(`/signup`); // TODO
  };

  const onError = (e: Error) => {
    console.error("CreatePasswordForm Error", e);
  };

  const mutationFn = async ({
    token,
    data,
  }: {
    token: RequestCookie;
    data: { password: string };
  }) => {
    try {
      await updatePassword({
        token,
        data: { password: data.password },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      password,
    };

    mutate({ token, data });
  };

  return (
    <div className="max-w-[400px] flex-1 flex flex-col justify-start items-start mt-10 mb-20">
      <Steps step="2" />
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h1 className="text-4xl font-extrabold">
          Crie uma senha para iniciar sua assinatura
        </h1>
        <p className="text-neutral-500 font-medium my-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim nostrum
          vero, veritatis nobis.
        </p>
        <div className="mb-4">
          <p className="font-medium text-neutral-500">Email</p>
          <p className="font-bold">{user.email}</p>
        </div>
        <PasswordFieldset
          label="Informe a senha"
          value={password}
          onChange={handlePassword}
        />
        <div>
          <SubmitButton text="Próximo" className="w-full h-14 text-xl" />
        </div>
      </form>
    </div>
  );
};

// ----------------------------------------------------------------------------------------------------
export const PaymentPlanForm = () => (
  <div className="w-full max-w-xl lg:max-w-6xl flex-1 flex flex-col justify-start items-start px-4 mt-10 mb-20">
    <Steps step="3" />
    <PlanHeading />
    <PlanSelectForm />
  </div>
);

// ----------------------------------------------------------------------------------------------------
export const PickPlanForm = () => (
  <div className="max-w-[400px] flex-1 flex flex-col justify-start items-start mt-10 mb-20">
    <Steps step="3" />
    <form className="flex flex-col">
      <h1 className="text-4xl font-extrabold">Escolha como você quer pagar</h1>
      <p className="text-neutral-500 font-medium my-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim nostrum
        vero, veritatis nobis.
      </p>
      <div className="flex flex-col gap-2">
        <PaymentMethod label="PIX" />
        <PaymentMethod label="Cartão" />
        <PaymentMethod label="Boleto" />
      </div>
    </form>
  </div>
);

// ----------------------------------------------------------------------------------------------------
// -------------------------------------========== MP ==========---------------------------------------
// ----------------------------------------------------------------------------------------------------
const mercadoPagoPublicKey =
  process.env.NEXT_PUBLIC_MP_TEST_PUBLIC_KEY ?? "NO-KEY";

await loadMercadoPago();

export const BrickForm = () => {
  return (
    <div className="max-w-[400px] flex-1 flex flex-col justify-start items-start mt-10 mx-4 mb-20">
      <Steps step="4" />
      <CustomPaymentBrick publicKey={mercadoPagoPublicKey} amount="20" />
    </div>
  );
};

// ----------------------------------------------------------------------------------------------------
// ------------------------------------========== UTILS ==========-------------------------------------
// ----------------------------------------------------------------------------------------------------
const Steps = ({
  step = "1",
  totalSteps = "4",
}: {
  step?: string;
  totalSteps?: string;
}) => (
  <span className="text-xs text-neutral-500 uppercase">
    Passo <span className="text-white font-extrabold">{step}</span> de{" "}
    {totalSteps}
  </span>
);

// ----------------------------------------------------------------------------------------------------
const CheckMark = ({
  children,
  options = { size: "24" },
}: {
  children: React.ReactNode;
  options?: { size?: string };
}) => (
  <li className="flex items-start gap-2 text-neutral-500 text-2xl font-medium my-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={options.size}
      height={options.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-check-icon lucide-check shrink-0 text-red-600"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
    {children}
  </li>
);

// ----------------------------------------------------------------------------------------------------
const PlanHeading = () => (
  <div className="w-full mb-4">
    <h1 className="text-3xl sm:text-4xl font-extrabold">Escolha seu plano</h1>
  </div>
);

// ----------------------------------------------------------------------------------------------------
const PaymentMethod = ({ label }: { label: string }) => (
  <button
    type="button"
    className="grid grid-cols-[1fr_32px] cursor-pointer py-4 rounded border border-neutral-700 bg-neutral-800 transition-outline duration-100 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white"
  >
    <div className="flex flex-col items-start mx-4">
      <span>{label}</span>
      <span></span>
    </div>
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
      className="lucide lucide-chevron-right-icon lucide-chevron-right"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  </button>
);
