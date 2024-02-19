import { useEffect, useState } from "react";
import { Question } from "../cards";
import { AddSomething } from "../ui";
import { Form, QuestionType } from "@/types";
import { useSelector } from "react-redux";
import { IRootState } from "@/pages/_app";

export const MyQuestionsWidget = ({
  handleSelection,
  form,
}: {
  handleSelection: Function;
  form: Form;
}) => {
  const user = useSelector((state: IRootState) => state.user);

  const handleAddQuestion = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/question/create/${form._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
        Authorization: `Bearer ${user.accessToken}`,
        "x-refresh-token": `Bearer ${user.refreshToken}`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="flex flex-col gap-6 items-start">
      <h2 className="font-playfair text-xl">My questions</h2>
      {form.questions &&
        form.questions.map((q, i) => (
          <div
            className="cursor-pointer"
            onClick={() => handleSelection(q)}
            key={i}
          >
            <Question {...q} />
          </div>
        ))}
      <AddSomething
        text={"Add new questions ..."}
        handleClick={() => handleAddQuestion()}
      />
    </div>
  );
};
