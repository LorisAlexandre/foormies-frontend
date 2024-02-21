import { useRouter } from "next/router";
import { DashboardNavbar, SectionContent, ShowError } from "@/components";
import { DashboardContext, DashboardContextType } from "@/providers";
import { useEffect, useRef, useState } from "react";
import { Form, QuestionType } from "@/types";
import { useSelector } from "react-redux";
import { IRootState } from "../_app";

export default function SectionPage() {
  const router = useRouter();
  const accessToken = useSelector(
    (state: IRootState) => state.user.accessToken
  );
  const refreshToken = useSelector(
    (state: IRootState) => state.user.refreshToken
  );
  const abortControllerRef = useRef<AbortController | null>(null);

  const [foormies, setFoormies] = useState<Form[]>([]);
  const [foormie, setFoormie] = useState<Form>(foormies[0]);

  const [questions, setQuestions] = useState<QuestionType[]>(
    foormie?.questions || []
  );
  const [question, setQuestion] = useState<QuestionType | undefined>(
    questions[0]
  );

  const [data, setData] = useState<Response | undefined>();

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      router.push("/");
      return;
    }

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/form/allByUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-refresh-token": `Bearer ${refreshToken}`,
      },
      signal: abortControllerRef.current.signal,
    })
      .then((res) => res.json())
      .then((data: Response & Form[]) => {
        if (data.length) {
          setFoormies(data);
          setFoormie(data[0]);
          setQuestions(data[0].questions as QuestionType[]);
          setQuestion((data[0].questions as QuestionType[])[0]);
        }
        setData(data);
      });

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const contextValue: DashboardContextType = {
    foormies,
    setFoormies,
    foormie,
    setFoormie,
    questions,
    setQuestions,
    question,
    setQuestion,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <DashboardNavbar />
      <SectionContent />
    </DashboardContext.Provider>
  );
}
