import { cn } from "@acme/utils/index";
import { MobilePlanSelect } from "./mobile";
import { DesktopPlanSelect } from "./desktop";

const recommendedIndex = 1;

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

const plans: PlanProps[] = [
  {
    plan: (
      <>
        <span>Premium</span>
        <span>4K + HDR</span>
      </>
    ),
    planType: "premium",
    price: "R$ 59,90",
    className: "from-red-500 to-pink-400 border-pink-300",
    features: [
      {
        feature: "Resolução",
        text: "4K (Ultra HD) + HDR",
      },
      {
        feature: "Omnis quasi nam",
        text: "Aspernatur necessitatibus",
      },
      {
        feature: "Fugit molestias error",
        text: "Dolorum quae",
      },
      {
        feature: "Iste doloremque",
        text: "Quibusdam tempora dolorum",
      },
      {
        feature: "Libero cupiditate neque unde",
        text: "Tenetur fugit molestias",
      },
      {
        feature: "Lorem ipsum dolor",
        text: "Consectetur adipisicing",
      },
      {
        feature: "Sit amet",
        text: "Neque facere sit repellat",
      },
    ],
  },
  {
    plan: (
      <>
        <span>Padrão</span>
        <span>1080p</span>
      </>
    ),
    price: "R$ 44,90",
    planType: "standard",
    className: "from-blue-500 to-purple-400 border-blue-300",
    features: [
      {
        feature: "Resolução",
        text: "1080p (Full HD)",
      },
      {
        feature: "Sit amet",
        text: "Neque facere sit repellat",
      },
      {
        feature: "Libero cupiditate neque unde",
        text: "Tenetur fugit molestias",
      },
      {
        feature: "Lorem ipsum dolor",
        text: "Consectetur adipisicing",
      },
      {
        feature: "Fugit molestias error",
        text: "Dolorum quae",
      },
      {
        feature: "Omnis quasi nam",
        text: "Aspernatur necessitatibus",
      },
      {
        feature: "Iste doloremque",
        text: "Quibusdam tempora dolorum",
      },
    ],
  },
  {
    plan: (
      <>
        <span>Padrão com anúncios</span>
        <span>1080p</span>
      </>
    ),
    price: "R$ 20,90",
    planType: "ads",
    className: "from-emerald-500 to-cyan-500 border-emerald-300",
    features: [
      {
        feature: "Resolução",
        text: "1080p (Full HD)",
      },
      {
        feature: "Libero cupiditate neque unde",
        text: "Tenetur fugit molestias",
      },
      {
        feature: "Lorem ipsum dolor",
        text: "Consectetur adipisicing",
      },
      {
        feature: "Sit amet",
        text: "Neque facere sit repellat",
      },
      {
        feature: "Iste doloremque",
        text: "Quibusdam tempora dolorum",
      },
      {
        feature: "Fugit molestias error",
        text: "Dolorum quae",
      },
      {
        feature: "Omnis quasi nam",
        text: "Aspernatur necessitatibus",
      },
    ],
  },
];

export const PlanSelectForm = () => {
  return (
    <>
      <DesktopPlanSelect plans={plans} recommendedIndex={recommendedIndex} />
      <MobilePlanSelect plans={plans} isRecommended={recommendedIndex} />
    </>
  );
};

// BELOW: utilities ----------------------------------------------------------------------------------------------------
export const ColorfulBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <div className="w-full h-full lg:p-4 pb-0">
    <label
      className={cn(
        "pointer-events-none w-full text-start lg:text-base text-sm h-[calc(1.25rem_*_4_+_1rem_*_2)] lg:h-[calc(1.5rem_*_4_+_1rem_*_2)] flex flex-col font-medium p-4 rounded-md bg-linear-to-br/hsl border",
        className
      )}
    >
      {children}
    </label>
  </div>
);

export const PriceBox = ({
  price,
  className,
}: {
  price: string;
  className?: string;
}) => (
  <div className={cn("p-4 text-center", className)}>
    <p className="text-3xl font-extrabold">{price}</p>
    <p className="text-neutral-500">Mensal</p>
  </div>
);
