import { ChangeEvent, useState } from "react";
import { Button, Input } from "./ui";
import { useRouter } from "next/router";

import { Response, Auth, JWTTokens } from "@/types";

import * as JWT from "jsonwebtoken";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/pages/_app";

import { login as loginMethod } from "@/reducers";

export interface Register {
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialForm: Register = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [register, setRegister] = useState<Register>(initialForm);
  const [data, setData] = useState<(Response & Auth) | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegister((reg) => ({ ...reg, [e.target.name]: e.target.value }));
  };

  const formInputs = [
    {
      type: "email",
      name: "email",
      required: true,
      placeholder: "johnDoe@gmail.com",
      label: "Email",
    },
    {
      type: "password",
      name: "password",
      required: true,
      placeholder: "Your password",
      label: "Password",
    },
    {
      type: "password",
      name: "confirmPassword",
      required: true,
      placeholder: "confirm your password",
      label: "Confirm password",
    },
  ];

  const handleRegister = () => {
    if (
      !register.email.trim() &&
      !register.password.trim() &&
      !register.confirmPassword.trim()
    ) {
      return;
    }

    if (register.password !== register.confirmPassword) {
      setData({
        statusCode: 400,
        error: "Bad request",
        message: "The passwords aren't the same",
      });
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify(register),
    })
      .then((res) => res.json())
      .then((data: Response & Auth): void => {
        if (data.accessToken && data.refreshToken) {
          const decoded = JWT.decode(data.accessToken) as JWTTokens;
          dispatch(
            loginMethod({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              email: decoded.email,
              _id: decoded.sub,
            })
          );
          router.push("/dashboard/content");
        }
        setData(data);
      });
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-6 py-6"
    >
      {formInputs.map((input, i) => (
        <Input onChange={(e) => handleChange(e)} {...input} key={i} />
      ))}
      {data?.statusCode && (
        <div>
          <h3>
            Error: {data.error} {data.statusCode}
          </h3>
          {data.message && typeof data.message === "string" ? (
            <p>{data.message}</p>
          ) : (
            (data.message as string[]).map((m, i) => <p key={i}>{m}</p>)
          )}
        </div>
      )}
      <Button onClick={handleRegister}>Sign up</Button>
    </form>
  );
};
