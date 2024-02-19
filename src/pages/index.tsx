import { Login, Register } from "@/components";
import { Button, Logo } from "@/components/ui";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "./_app";
import { useRouter } from "next/router";

export default function Home() {
  const user = useSelector((state: IRootState) => state.user);
  const router = useRouter();
  const [login, setLogin] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      router.push("/dashboard/content");
    }
  }, []);

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
