"use client";

import { useState } from "react";

export const TextButton = () => {
  const [click, setClick] = useState(false);
  function handleClick() {
    setClick((prev) => !prev);
  }
  return (
    <div className="h-36">
      <p className="text-sm text-neutral-500 mb-1">
        Esta página é protegida pelo Google reCAPTCHA para garantir que você não
        é um robô.
      </p>
      {click && (
        <p className="text-sm text-neutral-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos quidem
          incidunt aut eaque atque, autem libero sequi adipisci debitis ab
          pariatur porro cupiditate in ipsam cumque. Distinctio, aliquam facere?
          Nesciunt.
        </p>
      )}
      {!click && (
        <button
          type="button"
          onClick={handleClick}
          className="cursor-pointer text-sm text-blue-500 transition-colors duration-200 hover:text-blue-400 focus-visible:text-blue-400 underline rounded outline-2 outline-transparent focus-visible:outline-white focus-visible:outline-offset-2"
        >
          <p>Saiba mais</p>
        </button>
      )}
    </div>
  );
};
