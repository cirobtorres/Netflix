"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitButton } from "@repo/ui/button";
import {
  CreditCardInput,
  ExpirationDateInput,
  Fieldset,
  Input,
  Label,
  SecurityCodeInput,
} from "@repo/ui/input";
import { PaymentMethodRadio } from "../../Inputs";
import { cn } from "@acme/utils/index";

type PaymentProps = {
  publicKey: string;
  amount: string;
  plan: string;
};

interface CardFormCallbacks {
  onFormMounted: (error: Error | undefined) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onFetching: (resource: string) => () => void;
  onValidityChange: (error: Error | null, field: string) => void;
  onError: (error: unknown) => () => void;
}

interface CardFormFieldConfig {
  id: string;
  placeholder: string;
}

interface CardFormConfig {
  amount: string;
  iframe: boolean;
  form: {
    id: string;
    cardNumber: CardFormFieldConfig;
    expirationDate: CardFormFieldConfig;
    securityCode: CardFormFieldConfig;
    cardholderName: CardFormFieldConfig;
    issuer: CardFormFieldConfig;
    installments: CardFormFieldConfig;
    identificationType: CardFormFieldConfig;
    identificationNumber: CardFormFieldConfig;
    cardholderEmail: CardFormFieldConfig;
  };
  callbacks: CardFormCallbacks;
}

interface CardFormData {
  paymentMethodId: string;
  issuerId: string;
  cardholderEmail: string;
  amount: string;
  token: string;
  installments: string;
  identificationNumber: string;
  identificationType: string;
}

// Add MercadoPago types to window if not already present
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MercadoPago: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cardForm?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paymentBrickController: any;
  }
}

const options = [
  { id: "paymentRadio-CC", value: "CC", label: "Crédito" },
  { id: "paymentRadio-CD", value: "CD", label: "Débito" },
];

const userEmail = "johndoe@email.com";

export const CreditCardBrick = ({ publicKey, amount, plan }: PaymentProps) => {
  const [cardholderName, setCardholderName] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (window.cardForm) return;

    const initializeBrick = async () => {
      if (!window.MercadoPago) return;

      const mp = new window.MercadoPago(publicKey, { locale: "pt-BR" });

      const cardForm = mp.cardForm({
        amount,
        iframe: false,
        form: {
          id: "form-checkout",
          cardNumber: {
            id: "form-checkout__cardNumber",
            // placeholder: "Número do cartão",
          },
          expirationDate: {
            id: "form-checkout__expirationDate",
            // placeholder: "MM/YY",
          },
          securityCode: {
            id: "form-checkout__securityCode",
            // placeholder: "Código de segurança",
          },
          cardholderName: {
            id: "form-checkout__cardholderName",
            // placeholder: "Titular do cartão",
          },
          issuer: {
            id: "form-checkout__issuer",
            // placeholder: "Banco emissor",
          },
          installments: {
            id: "form-checkout__installments",
            // placeholder: "Parcelas",
          },
          identificationType: {
            id: "form-checkout__identificationType",
            // placeholder: "Tipo de documento",
          },
          identificationNumber: {
            id: "form-checkout__identificationNumber",
            // placeholder: "Número do documento",
          },
          cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            // placeholder: "E-mail",
          },
        },
        callbacks: {
          onFormMounted: (error: Error | undefined) => {
            if (error)
              return console.warn("Form Mounted handling error: ", error);
            console.log("Form mounted");
          },
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (loading) return;

            setLoading(() => {
              document.body.style.overflow = "hidden";
              return true;
            });

            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              amount,
              token,
              installments,
              identificationNumber,
              identificationType,
            }: CardFormData = cardForm.getCardFormData();

            const cleanup = cardForm.callbacks?.onFetching?.("payment");

            fetch("http://localhost:3001/api/payments/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
                issuer_id,
                payment_method_id,
                transaction_amount: Number(amount),
                installments: Number(installments),
                description: "Mensalidade do Netflix",
                payer: {
                  email,
                  identification: {
                    type: identificationType,
                    number: identificationNumber,
                  },
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Payment Success:", data);
                router.push("/");
              })
              .catch((error) => console.error("Payment Error:", error))
              .finally(() => {
                if (cleanup) cleanup();
              });
          },
          onFetching: (resource: string) => {
            console.log("Fetching resource: ", resource);
            return () => {
              setLoading(() => {
                document.body.style.overflow = "";
                return false;
              });
            };
          },
          onValidityChange: (error: Error | null, fieldName: string) => {
            // ...
          },
          onError: (error: unknown) => {
            console.error(error);
            setLoading(() => {
              document.body.style.overflow = "";
              return false;
            });
          },
        },
      } as CardFormConfig);

      window.cardForm = cardForm;
    };

    if (
      !document.querySelector('script[src="https://sdk.mercadopago.com/js/v2"]')
    ) {
      const script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.onload = initializeBrick;
      document.body.appendChild(script);
    } else {
      initializeBrick();
    }

    return () => {
      window.cardForm?.unmount?.();
      window.cardForm = undefined;
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
      }
    };
  }, [publicKey, amount]);

  const handleCardholderName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCardholderName(String(e.target.value).toLocaleUpperCase());

  return (
    <form id="form-checkout" className="mt-4 flex flex-col">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/75 z-[9999]">
          <span className="text-2xl">Carregando...</span>
        </div>
      )}
      <h1 className="text-4xl font-extrabold">
        Informe os dados do seu cartão de crédito ou débito
      </h1>
      <p className="text-neutral-500 my-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore sint
        cum cupiditate sed? Placeat, odio quisquam.
      </p>
      <Fieldset className={cn("mb-2")}>
        <CreditCardInput
          id="form-checkout__cardNumber"
          placeholder="0000 0000 0000 0000" // VISA
        />
        <Label label="Número do cartão" />
      </Fieldset>
      {/* <ErrorMessage message="Digite um número de cartão válido" /> */}
      <div className="flex gap-2">
        <div className="flex-2">
          <Fieldset className="mb-2">
            <ExpirationDateInput
              id="form-checkout__expirationDate"
              placeholder="MM/AA"
            />
            <Label label="Validade" />
          </Fieldset>
          {/* <ErrorMessage message="" /> */}
        </div>
        <div className="flex-1">
          <Fieldset className="mb-2">
            <SecurityCodeInput
              id="form-checkout__securityCode"
              placeholder="000"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
            />
            <Label label="CVV" />
          </Fieldset>
          {/* <ErrorMessage message="" /> */}
        </div>
      </div>
      <Fieldset className="mb-2">
        <Input
          id="form-checkout__cardholderName"
          type="text"
          placeholder="John Doe"
          value={cardholderName}
          onChange={handleCardholderName}
        />
        <Label label="Titular" />
      </Fieldset>
      {/* ---------------------------------------------------------------------------------------------------- */}
      <select
        id="form-checkout__issuer" // (preenchido automaticamente pelo MP)
        defaultValue="123"
        name="issuer"
        hidden
        aria-hidden="true"
        tabIndex={-1}
        className="absolute left-[-9999px] size-0 pointer-events-none"
      />
      <select
        id="form-checkout__installments" // Depende do amount introduzido (preenchido automaticamente pelo MP)
        defaultValue="1"
        name="installments"
        hidden
        aria-hidden="true"
        tabIndex={-1}
        className="absolute left-[-9999px] size-0 pointer-events-none"
      />
      <select
        id="form-checkout__identificationType" // CPF ou CNPJ (preenchido automaticamente pelo MP)
        defaultValue="CPF"
        name="identificationType"
        hidden
        aria-hidden="true"
        tabIndex={-1}
        className="absolute left-[-9999px] size-0 pointer-events-none"
      />
      <input
        type="text"
        id="form-checkout__identificationNumber" // Numeração do CPF. Esse campo é MANUAL
        name="identificationNumber"
        placeholder="Número do documento"
        hidden
        aria-hidden="true"
        tabIndex={-1}
        className="absolute left-[-9999px] size-0 pointer-events-none"
      />
      <input
        type="text"
        id="form-checkout__cardholderEmail"
        placeholder="E-mail"
        hidden
        aria-hidden="true"
        tabIndex={-1}
        value={userEmail}
        readOnly
        className="absolute left-[-9999px] size-0 pointer-events-none"
      />
      {/* ---------------------------------------------------------------------------------------------------- */}
      <p className="pointer-events-none">Forma de pagamento</p>
      <div className="flex gap-1 my-2">
        <PaymentMethodRadio name="paymentMethod" options={options} />
      </div>
      <div className="flex justify-between rounded p-4 bg-neutral-900">
        <p className="text-neutral-500">R$ {plan}/mês</p>
        <Link
          href="/signup/planform"
          className="cursor-pointer font-medium rounded transition-all duration-100 text-blue-500 hover:text-blue-400 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          Trocar
        </Link>
      </div>
      <p className="text-neutral-500 my-4">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum atque
        obcaecati, autem amet possimus asperiores sint quos aut sed veritatis
        quaerat itaque tenetur non in ut fuga aliquam adipisci aliquid.
      </p>
      <SubmitButton
        id="form-checkout__submit"
        disabled={loading}
        text={loading ? "Carregando..." : "Confirmar pagamento"}
        className="w-full"
      />
      {/* <progress value="0" className="progress-bar">
        Carregando...
      </progress> */}
    </form>
  );
};

export const PixBrick = ({ publicKey, amount, plan }: PaymentProps) => {
  return <form></form>;
};

const ErrorMessage = ({ message }: { message: string }) => (
  <p className="shrink-0 flex gap-2 text-sm mb-2 text-red-400 font-medium mx-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-triangle-alert-icon lucide-triangle-alert shrink-0"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
    {message}
  </p>
);
