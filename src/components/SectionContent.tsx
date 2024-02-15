import { useState } from "react";
import { MyQuestionsWidget, SectionDashboardNavbar } from ".";
import { QuestionType } from "./cards";
import {
  CustomHTMLRendering,
  QuestionHTMLRendering,
  QuestionOptions,
} from "./widgets";

export const SectionContent = ({ section }: { section: string }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(
    null
  );

  const handleQuestionSelection = (q: QuestionType) => {
    setSelectedQuestion(q);
  };
  const handleUpdateQuestion = () => {};

  return (
    <>
      <SectionDashboardNavbar section={section} />
      <div className="flex flex-wrap p-10 gap-10">
        <MyQuestionsWidget handleSelection={handleQuestionSelection} />
        {selectedQuestion && (
          <QuestionOptions
            question={selectedQuestion}
            handleUpdateQuestion={handleUpdateQuestion}
          />
        )}
        {selectedQuestion && (
          <QuestionHTMLRendering question={selectedQuestion} />
        )}
        {selectedQuestion && <CustomHTMLRendering />}
      </div>
    </>
  );
};
