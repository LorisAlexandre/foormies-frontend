import { useState } from "react";
import { AddSomething, Chevron, Logo } from ".";
import { useDashboardContext } from "@/providers";

export const DropdownProject = () => {
  const { foormie, foormies, handleSelectionFoormie, handleCreateFoormie } =
    useDashboardContext();
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="flex gap-3 items-center">
      <Logo />
      <p className="text-2xl leading-none font-thin font-playfair">/</p>
      <h2 className="text-2xl leading-none font-playfair">
        {foormie?.projectName ? foormie?.projectName : "My first foormie"}
      </h2>
      <div
        onClick={() => setOpenDropdown(!openDropdown)}
        className="flex flex-col gap-4 relative cursor-pointer"
      >
        <Chevron orientation="up" />
        <Chevron orientation="down" />
        {openDropdown && (
          <div className="absolute top-[120%] flex flex-col w-max p-2 border border-primary-400 rounded-sm bg-white z-50">
            <h2 className="font-semibold">My forms</h2>
            <ul>
              {foormies.length
                ? foormies.map((f, i) => (
                    <li
                      key={i}
                      className="cursor-pointer"
                      onClick={() => handleSelectionFoormie(f._id)}
                    >
                      {f.projectName}
                    </li>
                  ))
                : "No Form yet !"}
            </ul>
            <AddSomething
              handleClick={handleCreateFoormie}
              text="Create a new form ..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
