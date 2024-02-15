import Link from "next/link";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <div>
      <h1>Page not found</h1>
      <button onClick={router.back}>Go back</button>
      <Link href={"/"}>Go home</Link>
    </div>
  );
}
