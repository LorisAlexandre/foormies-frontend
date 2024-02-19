import { ChangeEvent, useState } from "react";
import { Button, Input } from "./ui";
import { useRouter } from "next/router";

import { Response, Auth, JWTTokens } from "@/types";

import * as JWT from "jsonwebtoken";

import { useDispatch } from "react-redux";

import { login as loginMethod } from "@/reducers";

export interface Login {
  email: string;
  password: string;
}

export const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialForm: Login = { email: "", password: "" };
  const [login, setLogin] = useState<Login>(initialForm);
  const [data, setData] = useState<(Response & Auth) | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin((log) => ({ ...log, [e.target.name]: e.target.value }));
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
  ];

  const handleLogin = () => {
    if (!login.email.trim() && !login.password.trim()) {
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
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
      <Button onClick={handleLogin}>Log in</Button>
    </form>
  );
};
