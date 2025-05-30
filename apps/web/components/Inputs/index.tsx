"use client";

import { useState } from "react";

export const PaymentMethodRadio = ({
  name,
  options,
}: {
  name: string;
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}) => {
  const [checkValue, setCheckValue] = useState(options[0]?.value);

  return options.map((option) => (
    <label
      key={option.id}
      htmlFor={option.id}
      className="relative flex-1 flex gap-2 items-center p-4 rounded border transition-all duration-100 border-neutral-700 focus-within:outline-2 focus-within:outline-offset-2"
    >
      <input
        id={option.id}
        type="radio"
        name={name}
        value={option.value}
        tabIndex={0}
        checked={checkValue === option.value}
        onChange={() => setCheckValue(option.value)}
        className="appearance-none peer"
      />
      <div
        aria-hidden="true"
        className="cursor-pointer size-3 rounded-full outline outline-offset-2 outline-neutral-700 bg-transparent peer-checked:bg-neutral-500"
      />
      {option.label}
    </label>
  ));
};
