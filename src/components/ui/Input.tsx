import {
  ChangeEvent,
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useState,
} from "react";
import { Button } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export interface InputProps {
  handleUpdate?: Function;
  property?: string;
  label?: string;
}

export const Input = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    InputProps
) => {
  const [showPassword, setShowPassword] = useState(false);

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.handleUpdate !== undefined) {
      props.handleUpdate(props.property, e.target.value);
    }
  };

  return (
    <div className="relative flex items-center gap-4">
      <span className="absolute -top-[35%] left-3 bg-white px-1">
        {props.label}
      </span>
      <input
        {...props}
        onChange={(e) => {
          props.onChange ? props.onChange(e) : changeValue(e);
        }}
        value={props.value}
        className={`border border-primary-950 min-w-72 rounded-sm py-2 px-4 placeholder:font-thin placeholder:text-primary-400 ${props.className}`}
        type={
          props.name === "password"
            ? showPassword
              ? "text"
              : "password"
            : props.type
        }
      />
      {props.name === "password" && (
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={showPassword ? faEyeSlash : faEye}
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );
};
