import { ChangeEvent, useEffect, useState } from "react";
import { MyQuestionsWidget, SectionDashboardNavbar } from ".";
import { QuestionType } from "@/types";
import {
  CustomHTMLRendering,
  QuestionHTMLRendering,
  QuestionOptions,
} from "./widgets";
import { Button, Input } from "./ui";
import { Form } from "@/types";

export const SectionContent = ({
  section,
  form,
}: {
  section: string;
  form: Form;
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(
    null
  );
  const [formTitle, setFormTitle] = useState<Form["projectName"]>(
    form.projectName
  );

  useEffect(() => {}, [selectedQuestion, form]);

  const handleQuestionSelection = (q: QuestionType) => {
    setSelectedQuestion(q);
  };

  const handleUpdateQuestion = async (q: QuestionType) => {
    // update question avec fetch
    fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/question/update/${q.form}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
        Authorization: `Bearer 1`,
        "x-refresh-token": `Bearer 1`,
      },
      body: JSON.stringify(q),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    // passer updatedQuestion à selectedQuestion
  };

  const handleUpdateForm = () => {};

  const renderComponent = () => {
    if (section === "content") {
      return (
        <>
          <MyQuestionsWidget
            handleSelection={handleQuestionSelection}
            form={form}
          />
          {selectedQuestion && (
            <QuestionOptions
              question={selectedQuestion}
              handleUpdateQuestion={handleUpdateQuestion}
            />
          )}
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
    <>
      <SectionDashboardNavbar section={section} />
      <div className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <Input
            className="text-2xl leading-none font-playfair border-none focus:outline-none"
            name="projectName"
            type="text"
            value={formTitle}
            onChange={(e) => {
              setFormTitle(e.target.value);
            }}
          />
          <Button className="h-fit" onClick={handleUpdateForm}>
            Save
          </Button>
        </div>
        <div className="flex flex-wrap px-10 gap-10">{renderComponent()}</div>
      </div>
    </>
  );
};
