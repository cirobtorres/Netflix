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
import { forwardRef, useRef, useState } from "react";

type AllowedInputTypes = Extract<
  React.HTMLInputTypeAttribute,
  "email" | "text" | "password"
>;

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputVariantsProps {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
);
Input.displayName = "Input";

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
}: FieldsetComponentProps) => {
  const [dynType, setDynType] = useState(type ?? "text");
  const [passHover, setPassHover] = useState(false);
  const [released, setReleased] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
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
        placeholder=""
        type={dynType}
        autoComplete="email"
        className={type === "password" ? "pl-4 pr-14" : undefined}
      />
      {type === "password" && passHover && (
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
