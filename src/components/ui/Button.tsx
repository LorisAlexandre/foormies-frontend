import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export const Button = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      className={`w-fit rounded-sm bg-primary-800 py-2 px-4 text-white hover:bg-primary-700 ${props.className}`}
    >
      {props.children}
    </button>
  );
};
