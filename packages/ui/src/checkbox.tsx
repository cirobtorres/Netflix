"use client";

import { useState } from "react";

interface FancyCheckboxProps {
  id: string;
  label: string;
  isChecked?: boolean;
}

export const Checkbox = ({
  id,
  label,
  isChecked = true,
}: FancyCheckboxProps) => {
  const [checked, setChecked] = useState(isChecked);

  return (
    <div className="w-fit relative my-5">
      <label
        htmlFor={id}
        className="flex items-center select-none rounded transition-all"
      >
        <input
          className="absolute opacity-0 peer"
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span className="cursor-pointer relative w-[18px] h-[18px] rounded-[4px] border border-gray-300 shadow-sm transition-all animate-none peer-focus-within:outline-2 peer-focus-within:outline-offset-1">
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            className="absolute top-[3px] left-[2px] fill-none stroke-white stroke-2 stroke-linecap-round stroke-linejoin-round transition-all delay-100"
            style={{
              strokeDasharray: "16px",
              strokeDashoffset: checked ? "0" : "16px",
            }}
          >
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        </span>
        <span className="pl-2 leading-[18px]">{label}</span>
      </label>
      <svg className="absolute w-0 h-0 pointer-events-none select-none">
        <symbol id="check-4" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </div>
  );
};
