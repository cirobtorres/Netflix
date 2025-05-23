// import Link from "next/link";
import { SubmitButton } from "@repo/ui/button";
import { Fieldset } from "@repo/ui/input";
import { SignupHeader } from "../../components/Header";
import { PlanSelectForm } from "../../components/PlanSelect";

export default function SignupPage() {
  return (
    <main className="overflow-y-auto min-h-screen flex flex-col justify-center items-center">
      <SignupHeader />
      <Form2 />
    </main>
  );
}

const Form1 = () => (
  <div className="max-w-[400px] flex-1 flex flex-col justify-start items-start mt-10">
    <Steps step="1" />
    <form className="flex flex-col">
      <h1 className="text-4xl font-extrabold">
        Crie uma senha para iniciar sua assinatura
      </h1>
      <p className="text-neutral-500 font-medium my-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim nostrum
        vero, veritatis nobis.
      </p>
      <div className="mb-4">
        <p className="font-medium text-neutral-500">Email</p>
        <p className="font-bold">johndoe@email.com</p>
      </div>
      <Fieldset label="Informe a senha" type="password" />
      <div>
        <SubmitButton text="Próximo" className="w-full h-14 text-xl" />
      </div>
    </form>
  </div>
);

const Form2 = () => (
  <div className="w-full max-w-xl lg:max-w-6xl flex-1 flex flex-col justify-start items-start px-4 mt-10 mb-20">
    <Steps step="2" />
    <PlanHeading />
    <PlanSelectForm />
  </div>
);

const Steps = ({ step = "1" }: { step?: string }) => (
  <span className="text-xs text-neutral-500 uppercase">
    Passo <span className="text-white font-extrabold">{step}</span> de 3
  </span>
);

const PlanHeading = () => (
  <div className="w-full mb-4">
    <h1 className="text-3xl sm:text-4xl font-extrabold">Escolha seu plano</h1>
  </div>
);
