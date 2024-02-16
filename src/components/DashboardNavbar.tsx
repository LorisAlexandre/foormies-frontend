import Image from "next/image";
import { Button, Chevron, DropdownProject, User } from "./ui";

export const DashboardNavbar = ({ form }: { form?: Object }) => {
  const renderComponent = () => {
    if (!form) {
      return (
        <div className="flex justify-between p-10">
          <DropdownProject projectsName={[]} />
          <User />
        </div>
      );
    }

    return (
      <div className="flex flex-col h-screen">
        <div className="flex justify-between p-10">
          <div className="relative flex">
            <DropdownProject />
            <Image
              className="absolute left-[102%] bottom-3 -scale-x-100"
              src={"/foormies.svg"}
              alt={"ant logo"}
              width={36}
              height={17}
            />
          </div>
          <User />
        </div>
        <div className="p-10 flex-1 flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center gap-10 relative">
            <h1 className="text-xl">Choose your project with the dropdown </h1>
            <div className="flex flex-col gap-4">
              <Chevron orientation="up" />
              <Chevron orientation="down" />
              <svg
                className="absolute bottom-14 right-0"
                width="350"
                height="291"
                viewBox="0 0 519 504"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2C51.1371 2 100.737 14.2056 131.28 55.0382C142.637 70.2216 148.235 96.7267 148.235 115.194C148.235 135.805 150.952 154.585 154.681 174.743C158.836 197.21 174.272 223.435 194.683 234.812C218.68 248.188 245.748 255.907 271.421 265.281C288.4 271.48 310.242 275.555 322.197 289.847C328.913 297.876 334.806 305.777 337.386 316.062C339.319 323.768 338.469 332.893 341.36 340.281C344.865 349.241 347.807 363.609 354.164 370.75C362.081 379.644 376.182 377.157 387.367 379.257C410.271 383.558 430.036 387.601 449.358 400.264C456.239 404.773 462.75 407.15 466.136 413.806C469.801 421.011 475.97 427.446 480.795 433.944C483.512 437.605 490.686 445.278 491.48 449.569C492.55 455.354 497.471 466.465 502.341 470.056C504.762 471.841 504.294 474.287 505.52 477C506.55 479.277 510.053 482.397 510.554 484.118C512.333 490.24 517 495.674 517 502"
                  stroke="#495f41"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-dasharray="8 8"
                />
              </svg>
            </div>
          </div>
          <Button>Create one !</Button>
        </div>
      </div>
    );
  };

  return <div>{renderComponent()}</div>;
};
