import { useState } from "react";
import { AddSomething, Chevron, Input, Logo } from ".";
import { Form } from "@/types";

export const DropdownProject = ({
  allForms,
  selectedProjectName,
  handleSelection,
  handleAddForm,
}: {
  allForms: Form[];
  selectedProjectName: string;
  handleSelection: Function;
  handleAddForm: Function;
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="flex gap-3 items-center">
      <Logo />
      <p className="text-2xl leading-none font-thin font-playfair">/</p>
      <h2 className="text-2xl leading-none font-playfair">
        {selectedProjectName}
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
              {allForms.length
                ? allForms.map((f, i) => (
                    <li
                      key={i}
                      className="cursor-pointer"
                      onClick={() => handleSelection(f._id)}
                    >
                      {f.projectName}
                    </li>
                  ))
                : "No Form yet !"}
            </ul>
            <AddSomething
              handleClick={() => handleAddForm()}
              text="Create a new form ..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
