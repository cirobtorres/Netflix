import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function getValidationClass(valid: boolean | null) {
  if (valid === true) return "border-green-600";
  else return "border-red-400";
}
