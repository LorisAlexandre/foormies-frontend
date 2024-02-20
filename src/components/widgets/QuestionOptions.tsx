import { ToggleButton, Input, Button } from "../ui";
import { useQuestionsContext } from "@/providers";

export const QuestionOptions = () => {
  const { question, handleUpdateQuestion, handleSaveQuestion } =
    useQuestionsContext();

  if (!question) {
    return <div>No question yet !</div>;
  }

  return (
    <div className="flex flex-col gap-6 items-start">
      <Input
        className={`font-playfair text-xl px-0 py-0 max-w-full border-none focus:outline-none`}
        style={{ width: Math.round((question.title.length * 29) / 20) * 10 }}
        value={question.title}
        onChange={(e) => handleUpdateQuestion("title", e.target.value)}
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ToggleButton
            handleUpdate={() =>
              handleUpdateQuestion("confidential", !question.confidential)
            }
            state={question.confidential}
            property="confidential"
          >
            Confidential
          </ToggleButton>
          <ToggleButton
            handleUpdate={() =>
              handleUpdateQuestion("requiredAnswer", !question.requiredAnswer)
            }
            state={question.requiredAnswer}
            property="requiredAnswer"
          >
            Required
          </ToggleButton>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="instructions"
            value={question.instructions}
            onChange={(e) =>
              handleUpdateQuestion("instructions", e.target.value)
            }
          />
          <Input
            placeholder="hint"
            onChange={(e) => handleUpdateQuestion("hint", e.target.value)}
            value={question.hint}
          />
        </div>
        <div className="flex flex-col gap-2">
          {question.questionType === "text" && (
            <>
              <Input
                placeholder="minLength"
                value={question.minLength}
                onChange={(e) =>
                  handleUpdateQuestion("minLength", Number(e.target.value))
                }
                type="number"
              />
              <Input
                placeholder="maxLength"
                value={question.maxLength}
                onChange={(e) =>
                  handleUpdateQuestion("maxLength", Number(e.target.value))
                }
                type="number"
              />
            </>
          )}
          {question.questionType === "number" && (
            <>
              <Input
                placeholder="minValue"
                value={question.minValue}
                onChange={(e) =>
                  handleUpdateQuestion("minValue", Number(e.target.value))
                }
                type="number"
              />
              <Input
                placeholder="maxValue"
                value={question.maxValue}
                onChange={(e) =>
                  handleUpdateQuestion("maxValue", Number(e.target.value))
                }
                type="number"
              />
            </>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Button onClick={() => handleSaveQuestion(question)}>Save</Button>
        {/* {options !== question && (
          <p className="text-red-500 font-thin text-[13px]">
            * Don't forget to save !
          </p>
        )} */}
      </div>
    </div>
  );
};
