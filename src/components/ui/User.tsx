import Link from "next/link";

export const User = ({ user }: { user?: { email: string } }) => {
  return (
    <Link
      href={``}
      className="flex items-center justify-center aspect-square w-[50px] bg-primary-400 rounded-full"
    >
      <p className="font-bold">L</p>
    </Link>
  );
};
