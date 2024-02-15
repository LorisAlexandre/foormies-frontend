import Image from "next/image";

export const Logo = ({ small }: { small?: boolean }) => {
  return (
    <div
      className={
        small
          ? "flex bg-primary-400 w-[50px] h-[50px] rounded-full items-center justify-center"
          : "flex items-end"
      }
    >
      {small ? null : <h1 className="text-2xl leading-none">Foormies .</h1>}
      <Image
        className={small ? "" : "mb-2 ml-2"}
        src={"/foormies.svg"}
        alt={"ant logo"}
        width={36}
        height={17}
      />
    </div>
  );
};
