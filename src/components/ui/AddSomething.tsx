import { MouseEventHandler } from "react";

export const AddSomething = ({
  text,
  handleClick,
}: {
  text: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={handleClick}
      className="flex gap-2 items-center justify-center"
    >
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.07107 1.42893V15.5711M1 8.5H15.1421"
          stroke="black"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p>{text}</p>
    </button>
  );
};
