import { QuestionType } from "@/types";
import { Button } from "../ui";
import { useDashboardContext } from "@/providers";

export const Question = ({ id }: { id: QuestionType["_id"] }) => {
  const { foormie, handleDeleteQuestion } = useDashboardContext();

  if (!foormie?.questions) {
    return;
  }

  const question = foormie?.questions.find((q) => q._id === id);

  if (!question) {
    return;
  }

  return (
    <div className="flex w-[640px] border border-primary-950 px-5 py-2 items-center justify-between">
      <p className="max-w-[300px]">{question.title}</p>
      <p>{question.questionType}</p>
      {question.requiredAnswer && <p>Required</p>}
      <Button className="bg-transparent hover:bg-transparent cursor-grab">
        <svg
          width="11"
          height="18"
          viewBox="0 0 11 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 10C2.80228 10 3.25 9.55228 3.25 9C3.25 8.44772 2.80228 8 2.25 8C1.69772 8 1.25 8.44772 1.25 9C1.25 9.55228 1.69772 10 2.25 10Z"
            stroke="#161f14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.25 3C2.80228 3 3.25 2.55228 3.25 2C3.25 1.44772 2.80228 1 2.25 1C1.69772 1 1.25 1.44772 1.25 2C1.25 2.55228 1.69772 3 2.25 3Z"
            stroke="#161f14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.25 17C2.80228 17 3.25 16.5523 3.25 16C3.25 15.4477 2.80228 15 2.25 15C1.69772 15 1.25 15.4477 1.25 16C1.25 16.5523 1.69772 17 2.25 17Z"
            stroke="#161f14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.25 10C8.80228 10 9.25 9.55228 9.25 9C9.25 8.44772 8.80228 8 8.25 8C7.69772 8 7.25 8.44772 7.25 9C7.25 9.55228 7.69772 10 8.25 10Z"
            stroke="#161f14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.25 3C8.80228 3 9.25 2.55228 9.25 2C9.25 1.44772 8.80228 1 8.25 1C7.69772 1 7.25 1.44772 7.25 2C7.25 2.55228 7.69772 3 8.25 3Z"
            stroke="#161f14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.25 17C8.80228 17 9.25 16.5523 9.25 16C9.25 15.4477 8.80228 15 8.25 15C7.69772 15 7.25 15.4477 7.25 16C7.25 16.5523 7.69772 17 8.25 17Z"
            stroke="#161f14"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      <Button
        onClick={() =>
          question._id === id && handleDeleteQuestion(question._id)
        }
        className="bg-transparent hover:bg-transparent"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 1L1 13M1 1L13 13"
            stroke="#161f14"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  );
};
