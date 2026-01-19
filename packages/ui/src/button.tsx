import { cn } from "@acme/utils/index";
import {
  submitButtonVariants,
  SubmitButtonVariantsProps,
} from "./buttonVariants";

interface SubmitButtonComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    SubmitButtonVariantsProps {
  text: string;
  disabled?: boolean;
}

export const SubmitButton = ({
  text,
  className,
  disabled,
  variant,
  ...props
}: SubmitButtonComponentProps) => (
  <button
    type="submit"
    disabled={disabled}
    className={cn(submitButtonVariants({ variant }), className)}
    {...props}
  >
    {text}
  </button>
);
SubmitButton.displayName = "SubmitButton";
