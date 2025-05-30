import { cva, VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  "w-full pt-6 px-4 pb-2 outline-hidden border-none placeholder:text-transparent placeholder:text-sm placeholder:font-medium focus:placeholder:text-neutral-600 peer",
  {
    variants: {
      variant: {
        default: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const labelVariants = cva(
  `absolute origin-left select-none pointer-events-none font-medium text-neutral-400` +
    ` top-4.5 left-5 -translate-y-3 -translate-x-[5px] transform transition-top duration-100` +
    ` peer-focus:-translate-y-3 peer-focus:-translate-x-[5px]` +
    ` peer-placeholder-shown:left-5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:scale-100` +
    ` scale-75 peer-focus:scale-75`,
  {
    variants: {
      variant: {
        default: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const fieldsetVariants = cva(
  "relative w-full rounded border border-neutral-600 transition-outline duration-100 focus-within:outline-2 focus-within:outline-offset-2",
  {
    variants: {
      variant: {
        default: "mb-4",
        compressed: "mb-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type InputVariantsProps = VariantProps<typeof inputVariants>;
export type LabelVariantsProps = VariantProps<typeof labelVariants>;
export type FieldsetVariantsProps = VariantProps<typeof fieldsetVariants>;
