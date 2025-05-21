"use client";

import { cn } from "@acme/utils/index";

interface ButtonProps {
  text: string;
  className?: string;
}

export const Button = ({ text, className }: ButtonProps) => {
  return (
    <button
      type="submit"
      className={cn(
        "w-full font-medium rounded cursor-pointer py-2",
        className
      )}
      onClick={() => console.log(text)}
    >
      {text}
    </button>
  );
};
