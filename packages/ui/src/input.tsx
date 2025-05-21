import { cn } from "@acme/utils/index";
import {
  fieldsetVariants,
  FieldsetVariantsProps,
  inputVariants,
  InputVariantsProps,
  labelVariants,
  LabelVariantsProps,
} from "./inputVariants";

type AllowedInputTypes = Extract<
  React.HTMLInputTypeAttribute,
  "email" | "text" | "password"
>;

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputVariantsProps {}

const Input = ({ className, variant, ...props }: InputProps) => (
  <input className={cn(inputVariants({ variant }), className)} {...props} />
);

interface LabelComponentProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    LabelVariantsProps {
  label: string;
}

const Label = ({
  label,
  className,
  variant,
  ...props
}: LabelComponentProps) => (
  <label className={cn(labelVariants({ variant }), className)} {...props}>
    {label}
  </label>
);

interface FieldsetComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    FieldsetVariantsProps {
  label: string;
  type?: AllowedInputTypes;
}

export const Fieldset = ({
  label,
  type,
  className,
  variant,
  ...props
}: FieldsetComponentProps) => (
  <div className={cn(fieldsetVariants({ variant }), className)} {...props}>
    <Input placeholder="" type={type ?? "text"} autoComplete="email" />
    <Label label={label} />
  </div>
);
