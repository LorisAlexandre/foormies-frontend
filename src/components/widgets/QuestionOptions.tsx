import { useState } from "react";
import { QuestionType } from "../cards";

export const QuestionOptions = ({
  question,
  handleUpdateQuestion,
}: {
  question: QuestionType;
  handleUpdateQuestion: Function;
}) => {
  const [options, setOptions] = useState(null);

  return (
    <div className="flex flex-col gap-6 items-start">
      <h2 className="font-playfair text-xl">Options</h2>
    </div>
  );
};
