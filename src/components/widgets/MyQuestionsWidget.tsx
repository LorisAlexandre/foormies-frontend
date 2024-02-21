import { useDashboardContext } from "@/providers";
import { Question } from "../cards";
import { AddSomething } from "../ui";

export const MyQuestionsWidget = () => {
  const { foormie, questions, handleSelectionQuestion, handleCreateQuestion } =
    useDashboardContext();

  return (
    <div className="flex flex-col gap-6 items-start">
      <h2 className="font-playfair text-xl">My questions</h2>
      {questions &&
        questions.map((q, i) => (
          <div
            className="cursor-pointer"
            onClick={() => handleSelectionQuestion(q._id)}
            key={i}
          >
            <Question id={q._id} />
          </div>
        ))}
      <AddSomething
        text={"Add new questions ..."}
        handleClick={() => foormie && handleCreateQuestion(foormie)}
      />
    </div>
  );
};
