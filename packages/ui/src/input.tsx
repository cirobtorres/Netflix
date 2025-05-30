"use client";

import { cn } from "@acme/utils/index";
import {
  fieldsetVariants,
  FieldsetVariantsProps,
  inputVariants,
  InputVariantsProps,
  labelVariants,
  LabelVariantsProps,
} from "./inputVariants";
import * as React from "react";
import { InputMask } from "@react-input/mask";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputVariantsProps {
  uppercase?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ uppercase, className, variant, ...props }, ref) => {
    const [text, setText] = React.useState("");
    return (
      <input
        ref={ref}
        value={text}
        placeholder=""
        onChange={(e) =>
          setText(uppercase ? e.target.value.toUpperCase() : e.target.value)
        }
        className={cn(inputVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface LabelComponentProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    LabelVariantsProps {
  label: string;
}

export const Label = ({
  label,
  className,
  variant,
  ...props
}: LabelComponentProps) => (
  <label className={cn(labelVariants({ variant }), className)} {...props}>
    {label}
  </label>
);

interface PasswordFieldsetComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    FieldsetVariantsProps {
  label: string;
  maxLength?: number;
}

export const PasswordFieldset = ({
  label,
  maxLength,
  className,
  variant,
  ...props
}: PasswordFieldsetComponentProps) => {
  const [dynType, setDynType] = React.useState("password");
  const [passHover, setPassHover] = React.useState(false);
  const [released, setReleased] = React.useState(true);
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div
      className={cn(fieldsetVariants({ variant }), className)}
      onFocus={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setPassHover(true);
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setPassHover(false);
        }
      }}
      {...props}
    >
      <Input
        ref={inputRef}
        type={dynType}
        maxLength={maxLength}
        autoComplete="email"
        className="pl-4 pr-14"
      />
      {passHover && (
        <button
          type="button"
          // Mouse interactions
          onPointerDown={() => setReleased(false)}
          onPointerUp={() => setReleased(true)}
          onPointerLeave={() => setReleased(true)}
          // Keyboard interactions
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              setReleased(false);
            }
          }}
          onKeyUp={(e) => {
            if (e.key === " " || e.key === "Enter") {
              setReleased(true);
            }
          }}
          onClick={() => {
            setDynType((prev) => (prev === "password" ? "text" : "password"));
            inputRef.current?.focus();
            setReleased(true);
          }}
          className={`cursor-pointer absolute top-1/2 -translate-y-1/2 size-8 right-2 flex items-center justify-center rounded-full outline-transparent border ${
            // Border animations
            released
              ? "transition-[border-color] duration-700 ease-in border-transparent bg-transparent hover:bg-neutral-900 focus-within:bg-neutral-900"
              : "border-neutral-800 bg-neutral-700"
          }`}
        >
          {dynType === "password" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye-off-icon lucide-eye-off"
            >
              <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
              <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
              <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
              <path d="m2 2 20 20" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-eye-icon lucide-eye"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      )}
      <Label label={label} />
    </div>
  );
};

interface FieldsetComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    FieldsetVariantsProps {
  children: React.ReactNode;
}

// ------------------------------------------------------------------------------------------
export const Fieldset = ({
  children,
  className,
  variant,
  ...props
}: FieldsetComponentProps) => {
  return (
    <div className={cn(fieldsetVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
};

// ------------------------------------------------------------------------------------------
export const CreditCardInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      // http://npmjs.com/package/@react-input/mask
      <InputMask
        ref={ref}
        type="text"
        autoComplete="on"
        placeholder=""
        mask="____ ____ ____ ____"
        replacement={{ _: /\d/ }}
        className={cn(inputVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
CreditCardInput.displayName = "CreditCardInput";

// ------------------------------------------------------------------------------------------
export const ExpirationDateInput = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, variant, ...props }, ref) => {
  return (
    // http://npmjs.com/package/@react-input/mask
    <InputMask
      ref={ref}
      type="text"
      autoComplete="off"
      placeholder=""
      mask="__/__"
      replacement={{ _: /\d/ }}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
});
ExpirationDateInput.displayName = "ExpirationDateInput";

// ------------------------------------------------------------------------------------------
export const SecurityCodeInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, className, variant, ...props }, ref) => {
    return (
      // http://npmjs.com/package/@react-input/mask
      <InputMask
        ref={ref}
        type="text"
        autoComplete="off"
        placeholder=""
        mask="___"
        replacement={{ _: /\d/ }}
        value={value}
        onChange={onChange}
        className={cn(inputVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
SecurityCodeInput.displayName = "SecurityCodeInput";
