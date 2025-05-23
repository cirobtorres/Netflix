import { cn } from "@acme/utils/index";
import { SubmitButton } from "@repo/ui/button";
import { ClientFeature } from "./ClientFeature";

const recommendedIndex = 1;

interface FeatureProp {
  feature: string;
  text: string;
}

interface PlanProps {
  plan: React.ReactNode;
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
      <form className="w-full hidden lg:flex lg:gap-2">
        {plans.map((planObj, i) => (
          <PlanCard
            key={i}
            fields={planObj}
            isRecommended={i === recommendedIndex}
          />
        ))}
      </form>
      <form className="w-full hidden max-lg:flex max-lg:gap-2">
        <ClientFeature plans={plans} isRecommended={recommendedIndex} />
      </form>
    </>
  );
};

const PlanCard = ({
  fields,
  isRecommended,
}: {
  fields: PlanProps;
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
      <ConfirmationButton isRecommended={isRecommended} />
      <FeatureList fields={fields} />
    </div>
  </div>
);

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

const ConfirmationButton = ({ isRecommended }: { isRecommended: boolean }) => (
  <div className="px-4">
    <SubmitButton
      text="Próximo"
      className={cn(
        "text-xl",
        isRecommended
          ? "border border-red-400"
          : "border border-neutral-700 text-red-500 bg-neutral-800 hover:bg-neutral-900"
      )}
    />
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
