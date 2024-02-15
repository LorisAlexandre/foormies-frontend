import { QuestionType } from "../cards";

export const QuestionHTMLRendering = ({
  question,
}: {
  question: QuestionType;
}) => {
  return (
    <div className="flex flex-col gap-6 items-start">
      <h2 className="font-playfair text-xl">{question.title}</h2>
      {/* <CustomButton /> */}
    </div>
  );
};
