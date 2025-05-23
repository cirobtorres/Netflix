import { cn } from "@acme/utils/index";
import {
  submitButtonVariants,
  SubmitButtonVariantsProps,
} from "./buttonVariants";

interface SubmitButtonComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    SubmitButtonVariantsProps {
  text: string;
}

export const SubmitButton = ({
  text,
  className,
  variant,
  ...props
}: SubmitButtonComponentProps) => (
  <button
    type="submit"
    className={cn(submitButtonVariants({ variant }), className)}
    {...props}
  >
    {text}
  </button>
);
SubmitButton.displayName = "SubmitButton";
