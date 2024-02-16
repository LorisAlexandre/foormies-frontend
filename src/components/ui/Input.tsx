import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from "react";

export const Input = ({
  handleUpdate,
  property,
  value,
}: {
  handleUpdate: Function;
  property: string;
  value: any;
}) => {
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    handleUpdate(property, e.target.value);
  };

  return (
    <input
      // {...props}
      onChange={(e) => changeValue(e)}
      value={value}
      className={` border`}
    />
  );
};
