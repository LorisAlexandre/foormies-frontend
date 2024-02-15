import { Logo } from "@/components/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Logo />
      <p>Welcome to Foormies</p>
      <Link href={"/dashboard"}>Go to dashboard</Link>
    </div>
  );
}
