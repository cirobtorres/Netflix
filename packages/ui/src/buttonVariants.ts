import { cva, VariantProps } from "class-variance-authority";

export const submitButtonVariants = cva(
  "w-fit flex-1 px-6 shrink-0 flex-nowrap text-nowrap font-medium rounded cursor-pointer py-2 transition-colors duration-300 outline-2 outline-transparent focus-visible:outline-white focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        default: "bg-red-600 hover:bg-red-700 disabled:bg-neutral-700",
        ghost: "bg-white/20 hover:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type SubmitButtonVariantsProps = VariantProps<
  typeof submitButtonVariants
>;
