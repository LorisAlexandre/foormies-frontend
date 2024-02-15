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
        className="flex flex-col gap-4 relative"
      >
        <Chevron orientation="up" />
        <Chevron orientation="down" />
        {openDropdown && (
          <div className="absolute top-[120%] flex flex-col w-max p-2 border border-primary-400 rounded-sm">
            <h2>My forms</h2>
            <ul>
              <li>Formulaire 1</li>
              <li>Formulaire 2</li>
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
