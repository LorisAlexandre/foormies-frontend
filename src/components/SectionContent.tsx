import { MyQuestionsWidget, SectionDashboardNavbar } from ".";
import { QuestionType } from "@/types";
import {
  CustomHTMLRendering,
  QuestionHTMLRendering,
  QuestionOptions,
} from "./widgets";
import { Button, Input } from "./ui";
import { useRouter } from "next/router";
import { useDashboardContext } from "@/providers";

export const SectionContent = () => {
  const router = useRouter();
  const section = router.query.section as string;

  const { foormie, handleUpdateFoormie, handleSaveFoormie } =
    useDashboardContext();

  const renderComponent = () => {
    if (section === "content") {
      return (
        <>
          <MyQuestionsWidget />
          <QuestionOptions />
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
            value={foormie ? foormie?.projectName : "Project Name"}
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
    </>
  );
};
