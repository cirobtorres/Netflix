"use client";

import { Fieldset, Input, Label, PasswordFieldset } from "@repo/ui/input";
import { SubmitButton } from "@repo/ui/button";
import { PlanSelectForm } from "../PlanSelect";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { CustomPaymentBrick } from "./CustomBrick";

export const HomeForm = () => (
  <form className="flex flex-col">
    <h3 className="text-center mb-6">
      Quer assistir? Informe seu email para criar ou reiniciar sua assinatura.
    </h3>
    <div className="flex gap-2 flex-col md:flex-row">
      <Fieldset className="mb-0 bg-neutral-900/75">
        <Input placeholder="" />
        <Label label="Email" />
      </Fieldset>
      <SubmitButton text="Inscrever-se" className="mx-auto text-2xl" />
    </div>
  </form>
);

export const Form1 = () => (
  <div className="max-w-[400px] flex-1 flex flex-col justify-start items-start mt-10 mb-20">
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
      <PasswordFieldset label="Informe a senha" />
      <div>
        <SubmitButton text="Próximo" className="w-full h-14 text-xl" />
      </div>
    </form>
  </div>
);

export const Form2 = () => (
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

export const Form3 = () => (
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

const mercadoPagoPublicKey =
  process.env.NEXT_PUBLIC_MP_TEST_PUBLIC_KEY ?? "NO-KEY";

await loadMercadoPago();

export const Form4 = () => {
  return (
    <div className="max-w-[400px] flex-1 flex flex-col justify-start items-start mt-10 mx-4 mb-20">
      <Steps step="3" />
      {/* <form>
        <PaymentBrick
          amount={60}
          publicKey={mercadoPagoPublicKey}
          preferenceId=""
          payer={{ email: "teste@teste.com" }}
        />
      </form> */}
      <CustomPaymentBrick publicKey={mercadoPagoPublicKey} amount="20" />
    </div>
  );
};

// const postPaymentFormdata = async() => {
// const cardToken = await mp.createCardToken({
//   cardNumber: '4509953566233704',
//   expirationMonth: 12,
//   expirationYear: 2025,
//   securityCode: '123',
//   cardholder: {
//     name: 'APRO',
//     identification: {
//       type: 'CPF',
//       number: '19119119100'
//     }
//   }
// });
// }
