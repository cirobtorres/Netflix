"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    MercadoPago: any;
    paymentBrickController: any;
  }
}

type PaymentBrickProps = {
  publicKey: string;
  preferenceId: string;
  amount: number;
  payer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
};

export const PaymentBrick = ({
  publicKey,
  preferenceId,
  amount,
  payer = {},
}: PaymentBrickProps) => {
  useEffect(() => {
    const initializeBrick = async () => {
      if (!window.MercadoPago) return;

      const mp = new window.MercadoPago(publicKey, { locale: "pt" });
      const bricksBuilder = mp.bricks();

      const settings = {
        initialization: {
          amount,
          preferenceId,
          payer: {
            firstName: payer.firstName || "",
            lastName: payer.lastName || "",
            email: payer.email || "",
          },
        },
        customization: {
          visual: {
            hideFormTitle: true,
            hidePaymentButton: false,
            style: {
              theme: "dark",
            },
          },
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            ticket: "all",
            bankTransfer: "all",
            atm: "all",
            onboarding_credits: "all",
            wallet_purchase: "all",
            maxInstallments: 1,
          },
        },
        callbacks: {
          onReady: () => {
            console.log("Brick ready!");
            // Brick pronto
          },
          onSubmit: ({ selectedPaymentMethod, formData }: any) => {
            return new Promise((resolve, reject) => {
              fetch("http://localhost:3001/api/payments/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              })
                .then((res) => {
                  console.log("SUCCESS 01: PaymentBrick", res);
                  // res {
                  //   body: ReadableStream,
                  //   bodyUsed: true, // 'true' indica que o corpo da resposta já foi consumido (via .json(), .text(), etc)
                  //   headers: Headers {}, // Metadados úteis da resposta
                  //   ok: true, // 'true' se status ∈ [200, 299]
                  //   redirected: false,
                  //   status: 201,
                  //   statusText: "Created",
                  //   type: "cors",
                  //   url: "http://localhost:3001/api/payments/create"
                  // }
                  return res.json();
                })
                .then((data) => {
                  // O retorno do backend
                  console.log("SUCCESS 02: PaymentBrick", data);
                  resolve(data);
                })
                .catch((err) => {
                  console.error(err);
                  reject(err);
                });
            });
          },
          onError: (error: any) => {
            console.error(error);
          },
        },
      };

      await bricksBuilder.create("payment", "paymentBrick_container", settings);
    };

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = initializeBrick;
    document.body.appendChild(script);

    return () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
      }
    };
  }, [publicKey, preferenceId, amount, payer]);

  return (
    <div
      id="paymentBrick_container"
      className="w-full max-w-xl mx-auto p-4 bg-zinc-900 rounded-2xl shadow-lg"
    />
  );
};
