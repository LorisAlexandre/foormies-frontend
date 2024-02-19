import { useEffect, useState } from "react";
import { QuestionType } from "../cards";
import { ToggleButton, Input, Button } from "../ui";

export const QuestionOptions = ({
  question,
  handleUpdateQuestion,
}: {
  question: QuestionType;
  handleUpdateQuestion: Function;
}) => {
  const [options, setOptions] = useState<QuestionType>(question);

  useEffect(() => {
    setOptions(question);
  }, [question]);

  const handleUpdateOptions = <T extends keyof QuestionType>(
    fieldName: T,
    value: QuestionType[T]
  ) => {
    setOptions((opt) => updateNestedObject(opt, fieldName, value));
  };

  // Fonction récursive qui update jusqu'à ce qu'il n'y est plus de nested prop
  const updateNestedObject = <T extends { [key: string]: any }>(
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
        (updatedObject[currentPath] as T) = value;
      } //sinon récursivité {
      else
        (updatedObject[currentPath] as T) = updateNestedObject(
          updatedObject[currentPath],
          path,
          value
        );
    }

    return updatedObject;
  };

  return (
    <div className="flex flex-col gap-6 items-start">
      <Input
        className={`font-playfair text-xl px-0 py-0 max-w-full border-none focus:outline-none`}
        style={{ width: Math.round((question.title.length * 29) / 20) * 10 }}
        value={options.title}
        property={"title"}
        handleUpdate={handleUpdateOptions}
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ToggleButton
            handleUpdate={handleUpdateOptions}
            state={options.confidential}
            property="confidential"
          >
            Confidential
          </ToggleButton>
          <ToggleButton
            handleUpdate={handleUpdateOptions}
            state={options.requiredAnswer}
            property="requiredAnswer"
          >
            Required
          </ToggleButton>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            handleUpdate={handleUpdateOptions}
            property="instructions"
            placeholder="instructions"
            value={options.instructions}
          />
          <Input
            handleUpdate={handleUpdateOptions}
            property="hint"
            placeholder="hint"
            value={options.hint}
          />
        </div>
        <div className="flex flex-col gap-2">
          {options.questionType === "text" && (
            <>
              <Input
                handleUpdate={handleUpdateOptions}
                property={"minLength"}
                placeholder="minLength"
                value={options.minLength}
                type="number"
              />
              <Input
                handleUpdate={handleUpdateOptions}
                property={"maxLength"}
                placeholder="maxLength"
                value={options.maxLength}
                type="number"
              />
            </>
          )}
          {options.questionType === "number" && (
            <>
              <Input
                handleUpdate={handleUpdateOptions}
                property={"minValue"}
                placeholder="minValue"
                value={options.minValue}
                type="number"
              />
              <Input
                handleUpdate={handleUpdateOptions}
                property={"maxValue"}
                placeholder="maxValue"
                value={options.maxValue}
                type="number"
              />
            </>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Button onClick={() => handleUpdateQuestion(options)}>Save</Button>
        {/* {options !== question && (
          <p className="text-red-500 font-thin text-[13px]">
            * Don't forget to save !
          </p>
        )} */}
      </div>
    </div>
  );
};
