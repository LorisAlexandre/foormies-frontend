import { MouseEvent, useEffect, useState } from "react";
import { Question, QuestionType } from "../cards";
import { AddSomething, Button } from "../ui";

export const MyQuestionsWidget = ({
  handleSelection,
}: {
  handleSelection: Function;
}) => {
  const questions: QuestionType[] = [
    {
      title: "Quel est votre plus grande préoccupation ?",
      confidential: true,
      inputProps: {
        questionType: "text",
        requiredQuestion: true,
      },
    },
    {
      title: "Quel est votre type de peau ?",
      confidential: false,
      inputProps: {
        questionType: "text",
        requiredQuestion: true,
      },
    },
  ];
  // const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col gap-6 items-start">
      <h2 className="font-playfair text-xl">My questions</h2>
      {questions.map((q, i) => (
        <div
          className="cursor-pointer"
          onClick={() => handleSelection(q)}
          key={i}
        >
          <Question {...q} />
        </div>
      ))}
      <AddSomething text={"Add new questions ..."} handleClick={() => {}} />
    </div>
  );
};
