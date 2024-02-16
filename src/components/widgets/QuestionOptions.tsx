import { useState } from "react";
import { QuestionType } from "../cards";
import { ToggleButton, Input } from "../ui";

export const QuestionOptions = ({
  question,
  handleUpdateQuestion,
}: {
  question: QuestionType;
  handleUpdateQuestion: Function;
}) => {
  const [options, setOptions] = useState<QuestionType>(question);

  const handleUpdateOptions = <T extends keyof QuestionType>(
    fieldName: T,
    value: QuestionType[T]
  ) => {
    setOptions((opt) => updateNestedObject(opt, fieldName, value));
  };

  // Corriger erreur de typage !!
  // Fonction récursive qui update jusqu'à ce qu'il n'y est plus de nested prop
  const updateNestedObject = <T extends object>(
    obj: T,
    path: string | string[],
    value: any
  ): T => {
    const updatedObject = { ...obj };

    if (typeof path === "string") {
      path = path.split(".");
    }

    const currentPath = path.shift();

    // si aucun path alors obj has been updated
    if (currentPath !== undefined) {
      // si un seul alors on update
      if (path.length === 0) {
        updatedObject[currentPath] = value;
      } //sinon récursivité {
      else
        updatedObject[currentPath] = updateNestedObject(
          updatedObject[currentPath],
          path,
          value
        );
    }

    return updatedObject;
  };

  /*
  
  export interface QuestionType {
  title: string;
  statement?: string;
  confidential?: boolean;
  instructions?: string;
  hint?: string;
  file?: {
    url?: string;
  };
  section?: number;
  inputProps: {
    questionType?: string;
    label?: string;
    placeholder?: string;
    options?: string | string[];
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
    pattern?: string;
    multiple?: boolean;
    rank?: number;
    requiredQuestion?: boolean;
  };
}

  */

  return (
    <div className="flex flex-col gap-6 items-start">
      <h2 className="font-playfair text-xl">Options</h2>
      <div className="flex flex-col gap-2">
        <ToggleButton
          handleUpdate={handleUpdateOptions}
          state={options?.confidential}
          property={"confidential"}
        >
          Confidential
        </ToggleButton>
        <ToggleButton
          handleUpdate={handleUpdateOptions}
          state={options.inputProps.requiredQuestion}
          property={"inputProps.requiredQuestion"}
        >
          Required
        </ToggleButton>
        <Input
          handleUpdate={handleUpdateOptions}
          property={"inputProps.questionType"}
          value={options.inputProps.questionType}
        />
      </div>
    </div>
  );
};
