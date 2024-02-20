import { MyQuestionsWidget, SectionDashboardNavbar } from ".";
import { QuestionType, Response } from "@/types";
import {
  CustomHTMLRendering,
  QuestionHTMLRendering,
  QuestionOptions,
} from "./widgets";
import { Button, Input } from "./ui";
import { useRouter } from "next/router";
import {
  QuestionsContext,
  QuestionsContextType,
  useFoormiesContext,
} from "@/providers";
import { useState } from "react";

export const SectionContent = () => {
  const router = useRouter();
  const section = router.query.section as string;

  const { foormie, handleUpdateFoormie, handleSaveFoormie } =
    useFoormiesContext();

  const [questions, setQuestions] = useState<QuestionType[]>(
    foormie?.questions || []
  );
  const [question, setQuestion] = useState<QuestionType | undefined>(
    foormie?.questions && foormie?.questions[0]
  );

  const contextValue: QuestionsContextType = {
    questions,
    setQuestions,
    question,
    setQuestion,
  };

  const renderComponent = () => {
    if (section === "content") {
      return (
        <>
          <MyQuestionsWidget />
          {question && <QuestionOptions />}
          {/* {selectedQuestion && (
              <QuestionHTMLRendering question={selectedQuestion} />
            )}
            {selectedQuestion && <CustomHTMLRendering />} */}
        </>
      );
    } else if (section === "analytics") {
      return <>Analytics</>;
    } else {
      return <>Link</>;
    }
  };

  return (
    <QuestionsContext.Provider value={contextValue}>
      <SectionDashboardNavbar section={section} />
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <Input
            className="text-2xl leading-none font-playfair border-none focus:outline-none"
            name="projectName"
            type="text"
            value={foormie?.projectName}
            onChange={(e) => handleUpdateFoormie("projectName", e.target.value)}
          />
          <Button
            className="h-fit"
            onClick={() => foormie && handleSaveFoormie(foormie)}
          >
            Save
          </Button>
        </div>
        <div className="flex flex-wrap px-10 gap-10">{renderComponent()}</div>
      </div>
    </QuestionsContext.Provider>
  );
};
