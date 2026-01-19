"use client";

import { useState } from "react";
import { SubmitButton } from "@repo/ui/button";
import { cn } from "@acme/utils/index";
import { ColorfulBox, PriceBox } from "..";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

interface FeatureProp {
  feature: string;
  text: string;
}

interface PlanProps {
  plan: React.ReactNode;
  planType: "premium" | "standard" | "ads";
  className: string;
  price: string;
  features: FeatureProp[];
}

export const MobilePlanSelect = ({
  plans,
  isRecommended,
}: {
  plans: PlanProps[];
  isRecommended: number;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const router = useRouter();

  const onSuccess = () => {
    router.push(`/signup`);
  };

  const onError = (e: Error) => {
    console.error("HomeForm Error", e);
  };

  const mutationFn = async () => {};

  const { mutate } = useMutation({
    mutationFn,
    onSuccess,
    onError,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full hidden max-lg:flex max-lg:gap-2"
    >
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex gap-2 pt-8">
          {plans.map((plan, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "w-full outline-3 outline-offset-1 rounded-md",
                selectedIndex === index
                  ? "outline-outline-500"
                  : "outline-transparent",
                isRecommended === index &&
                  "relative before:-z-10 before:bg-neutral-800 before:border before:border-neutral-700 before:absolute before:inset-0" +
                    " before:-top-8 before:rounded-[inherit] before:content-['Recomendado!'] before:text-xs md:before:text-base before:leading-7"
              )}
            >
              <ColorfulBox
                className={cn(
                  plan.className,
                  "border-neutral-700",
                  isRecommended === index &&
                    !(selectedIndex === index) &&
                    "rounded-t-none",
                  !(selectedIndex === index) && "bg-none bg-neutral-900"
                )}
              >
                {plan.plan}
              </ColorfulBox>
            </button>
          ))}
        </div>
        <div className="text-xl mt-4 flex gap-1">
          {plans[selectedIndex]?.plan}
        </div>
        <PriceBox
          price={plans[selectedIndex]?.price ?? ""}
          className="pt-8 pb-0"
        />
        <ul className="w-full">
          {plans[selectedIndex]?.features?.map((feature, i) => (
            <li key={i} className="my-6 border-b border-neutral-800 w-full">
              <p className="text-xs font-bold text-neutral-600 uppercase">
                {feature.feature}
              </p>
              <p>{feature.text}</p>
            </li>
          ))}
        </ul>
        <SubmitButton text="Próximo" className="max-w-1/2 w-full text-2xl" />
      </div>
    </form>
  );
};
