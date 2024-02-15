import { useState } from "react";
import { AddSomething, Chevron, Logo } from ".";

export const DropdownProject = ({ projectName }: { projectName?: string }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const createNewProject = () => {};

  return (
    <div className="flex gap-3 items-center">
      <Logo />
      <p className="text-2xl leading-none font-thin font-playfair">/</p>
      <h2 className="text-2xl leading-none font-playfair">
        {projectName ? projectName : "Formulaire 1"}
      </h2>
      <div
        onClick={() => setOpenDropdown(!openDropdown)}
        className="flex flex-col gap-4 relative cursor-pointer"
      >
        <Chevron orientation="up" />
        <Chevron orientation="down" />
        {openDropdown && (
          <div className="absolute top-[120%] flex flex-col w-max p-2 border border-primary-400 rounded-sm bg-white">
            <h2 className="font-semibold">My forms</h2>
            <ul>
              <li className="cursor-pointer">Formulaire 1</li>
              <li className="cursor-pointer">Formulaire 2</li>
            </ul>
            <AddSomething
              handleClick={createNewProject}
              text="Create a new form ..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
