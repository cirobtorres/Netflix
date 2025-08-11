"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@acme/utils/index";
import { submitButtonVariants } from "@repo/ui/buttonVariants";
import { ColorfulBox, PriceBox } from "..";
import { useRouter } from "next/navigation";
import { setCookies } from "../../../services/payments";

interface FeatureProp {
  feature: string;
  text: string;
}

interface PlanTypeProps {
  planType: "premium" | "standard" | "ads";
}

interface PlanProps {
  plan: React.ReactNode;
  planType: PlanTypeProps;
  className: string;
  price: string;
  features: FeatureProp[];
}

export const DesktopPlanSelect = ({
  plans,
  recommendedIndex,
}: {
  plans: PlanProps[];
  recommendedIndex: number;
}) => {
  const [card, setCard] = useState<PlanTypeProps>({ planType: "premium" });
  const router = useRouter();

  const onSuccess = () => {
    // TODO: if no token, redirect to registration
    // router.push("/signup/registration");
    // TODO: if token, redirect to payment/credit card
    router.push("/signup/payment");
  };

  const onError = (e: Error) => {
    console.error("HomeForm Error", e);
  };

  const mutationFn = async ({ card }: { card: PlanTypeProps }) => {
    try {
      await setCookies(
        {
          plan: String(card),
        },
        {
          path: "/",
          maxAge: 60 * 60 * 24,
          httpOnly: false,
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const { mutate } = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      card,
    };

    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full hidden lg:flex lg:gap-2">
      {plans.map((planObj, i) => {
        const handleSetCard = () => {
          setCard(() => planObj.planType);
        };
        return (
          <DesktopPlanSelectCard
            key={i}
            fields={planObj}
            onClick={handleSetCard}
            isRecommended={i === recommendedIndex}
          />
        );
      })}
    </form>
  );
};

export const DesktopPlanSelectCard = ({
  fields,
  onClick,
  isRecommended,
}: {
  fields: PlanProps;
  onClick: () => void;
  isRecommended: boolean;
}) => (
  <div
    className={cn(
      "relative before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] mt-8",
      isRecommended
        ? "before:-m-[2px] rounded-b-xl before:content-['Recomendado!'] before:font-medium before:leading-9 before:text-center before:-top-8 before:rounded-t-xl before:bg-gradient-to-b before:from-neutral-800 before:to-5% before:to-neutral-700"
        : "before:-m-[1px] rounded-xl before:bg-neutral-800",
      "w-full flex flex-col bg-clip-padding bg-neutral-900"
    )}
  >
    <div className="w-full flex flex-col items-center">
      <ColorfulBox className={fields.className}>{fields.plan}</ColorfulBox>
      <PriceBox price={fields.price} />
      <ConfirmationButton isRecommended={isRecommended} onClick={onClick} />
      <FeatureList fields={fields} />
    </div>
  </div>
);

// BELOW: utilities ----------------------------------------------------------------------------------------------------
const ConfirmationButton = ({
  isRecommended,
  onClick,
}: {
  isRecommended: boolean;
  onClick: () => void;
}) => (
  <div className="px-4">
    <button
      type="submit"
      onClick={onClick}
      className={cn(
        submitButtonVariants({ variant: "default" }),
        "text-xl",
        isRecommended
          ? "border border-red-400"
          : "border border-neutral-700 text-red-500 bg-neutral-800 hover:bg-neutral-900"
      )}
    >
      Próximo
    </button>
  </div>
);

const FeatureList = ({
  fields: { features },
}: {
  fields: { features: FeatureProp[] };
}) => (
  <ul className="w-full p-4">
    {features.map((feature, i) => (
      <Feature key={i} {...feature} />
    ))}
  </ul>
);

const Feature = ({ feature, text }: FeatureProp) => (
  <li className="my-6 border-b border-neutral-800">
    <p className="text-xs font-bold text-neutral-600 uppercase">{feature}</p>
    <p className="">{text}</p>
  </li>
);
