import { Login, Register } from "@/components";
import { Button, Logo } from "@/components/ui";
import { useState } from "react";

export default function Home() {
  const [login, setLogin] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-10 p-10">
      <Logo />
      <p>Welcome to Foormies</p>
      <div className="w-full flex justify-center">
        {login ? <Login /> : <Register />}
      </div>
      <Button onClick={() => setLogin(!login)}>
        {login ? "Create one !" : "Log in here !"}
      </Button>
    </div>
  );
}
