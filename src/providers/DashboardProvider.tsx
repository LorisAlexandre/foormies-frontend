import { updateNestedObject } from "@/functions";
import { IRootState } from "@/pages/_app";
import { Form, QuestionType, Response } from "@/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { useSelector } from "react-redux";

export interface DashboardContextType {
  foormies: Form[];
  setFoormies: Dispatch<SetStateAction<Form[]>> | undefined;
  foormie: Form | undefined;
  setFoormie: Dispatch<SetStateAction<Form>> | undefined;
  questions: QuestionType[];
  setQuestions: Dispatch<SetStateAction<QuestionType[]>> | undefined;
  question: QuestionType | undefined;
  setQuestion: Dispatch<SetStateAction<QuestionType | undefined>> | undefined;
}

export const DashboardContext = createContext<DashboardContextType>({
  foormies: [],
  setFoormies: undefined,
  foormie: undefined,
  setFoormie: undefined,
  questions: [],
  setQuestions: undefined,
  question: undefined,
  setQuestion: undefined,
});

export const useDashboardContext = () => {
  const accessToken = useSelector(
    (state: IRootState) => state.user.accessToken
  );
  const refreshToken = useSelector(
    (state: IRootState) => state.user.refreshToken
  );
  const {
    foormie,
    foormies,
    question,
    questions,
    setFoormie,
    setFoormies,
    setQuestion,
    setQuestions,
  } = useContext(DashboardContext);

  const [data, setData] = useState<Response | null>(null);

  if (setFoormie === undefined) {
    throw new Error("setFoormie is undefined");
  }
  if (setFoormies === undefined) {
    throw new Error("setFoormies is undefined");
  }
  if (setQuestion === undefined) {
    throw new Error("setQuestion is undefined");
  }
  if (setQuestions === undefined) {
    throw new Error("setQuestions is undefined");
  }

  // Form CRUD handling
  const handleCreateFoormie = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/form/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-refresh-token": `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({ projectName: "New project" }),
    })
      .then((res) => res.json())
      .then((data: Response & Form) => {
        if (data._id) {
          setFoormie(data);
          setFoormies((prevFoormies) => [data, ...prevFoormies]);
        }
        setData(data);
      });
  };

  const handleSelectionFoormie = (id: Form["_id"]) => {
    const form = foormies.find((f) => f._id === id);
    if (form) {
      setFoormie(form);
    }
  };

  const handleUpdateFoormie = <T extends keyof Form>(
    fieldName: T,
    value: Form[T]
  ) => {
    setFoormie((f) => updateNestedObject<Form>(f, fieldName, value));
  };

  const handleSaveFoormie = (f: Form) => {
    fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/form/update/${f._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-refresh-token": `Bearer ${refreshToken}`,
      },
      body: JSON.stringify(f),
    })
      .then((res) => res.json())
      .then((data: Response & Form) => {
        if (data._id) {
          setFoormie(data);
          setFoormies(foormies.filter((f) => f._id !== data._id));
          setFoormies((f) => [data, ...f]);
        }
        setData(data);
      });
  };

  // Question CRUD handling
  const handleSelectionQuestion = (id: QuestionType["_id"]) => {
    const question = questions.find((q) => q._id === id);

    if (question) {
      setQuestion(question);
    }
  };

  const handleCreateQuestion = (foormie: Form) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERV_URL}/question/create/${foormie._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors",
          Authorization: `Bearer ${accessToken}`,
          "x-refresh-token": `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({}),
      }
    )
      .then((res) => res.json())
      .then((data: Response & QuestionType) => {
        if (data._id) {
          setQuestion(data);
          handleUpdateFoormie("questions", [...questions, data]);
          setQuestions((questions) => [...questions, data]);
          handleSaveFoormie({ ...foormie, questions: [...questions, data] });
        }
        setData(data);
      });
  };

  const handleUpdateQuestion = <T extends keyof QuestionType>(
    fieldName: T,
    value: QuestionType[T]
  ) => {
    setQuestion((q) =>
      updateNestedObject<QuestionType>(q as QuestionType, fieldName, value)
    );
    handleUpdateFoormie(`questions` as keyof Form, [
      ...questions.filter((q) => q._id !== question?._id),
      {
        ...question,
        [fieldName]: value,
      } as QuestionType,
    ]);
  };

  const handleSaveQuestion = (q: QuestionType) => {
    fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/question/update/${q._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-refresh-token": `Bearer ${refreshToken}`,
      },
      body: JSON.stringify(q),
    })
      .then((res) => res.json())
      .then((data: Response & QuestionType) => {
        if (data._id) {
          setQuestion(data);
          setQuestions(questions.filter((q) => q._id !== data._id));
          setQuestions((questions) => [data, ...questions]);
        }
      });
  };

  const handleDeleteQuestion = (qId: QuestionType["_id"]) => {
    fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/question/deleteOne/${qId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-refresh-token": `Bearer ${refreshToken}`,
      },
    })
      .then((res) => res.json())
      .then((data: Response) => {
        if (data.deleted) {
          setQuestions(questions.filter((q) => q._id !== qId));
          setQuestion(undefined);
          handleUpdateFoormie(
            "questions",
            questions.filter((q) => q._id !== qId)
          );
          handleSaveFoormie({
            ...foormie,
            questions: questions.filter((q) => q._id !== qId),
          });
        }
        setData(data);
      });
    setQuestions(questions.filter((q) => q._id !== qId));
    setQuestion(undefined);
    handleUpdateFoormie(
      "questions",
      questions.filter((q) => q._id !== qId)
    );
    handleSaveFoormie({
      ...foormie,
      questions: questions.filter((q) => q._id !== qId),
    });
  };

  const handleDeleteQuestions = (formId: Form["_id"]) => {
    fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/question/deleteAll/${formId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-refresh-token": `Bearer ${refreshToken}`,
      },
    })
      .then((res) => res.json())
      .then((data: Response) => {
        if (data.deleted) {
          setQuestions([]);
          setQuestion(undefined);
          handleUpdateFoormie("questions", []);
          handleSaveFoormie({ ...foormie, questions: [] });
        }
      });
  };

  return {
    foormie,
    handleCreateFoormie,
    handleSelectionFoormie,
    handleUpdateFoormie,
    handleSaveFoormie,
    foormies,
    question,
    handleCreateQuestion,
    handleSelectionQuestion,
    handleUpdateQuestion,
    handleSaveQuestion,
    handleDeleteQuestion,
    handleDeleteQuestions,
    questions,
    data,
  };
};
