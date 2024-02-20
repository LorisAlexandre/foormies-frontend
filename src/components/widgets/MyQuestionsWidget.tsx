import { useFoormiesContext, useQuestionsContext } from "@/providers";
import { Question } from "../cards";
import { AddSomething } from "../ui";

export const MyQuestionsWidget = () => {
  const { foormie } = useFoormiesContext();
  const { questions, handleSelectionQuestion, handleCreateQuestion } =
    useQuestionsContext();

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
            <Question {...q} />
          </div>
        ))}
      <AddSomething
        text={"Add new questions ..."}
        handleClick={() => handleCreateQuestion(foormie?._id)}
      />
    </div>
  );
};
