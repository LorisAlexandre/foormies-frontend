// import { updateNestedObject } from "@/functions";
// import { IRootState } from "@/pages/_app";
// import { Form, QuestionType, Response } from "@/types";
// import { Dispatch, SetStateAction, createContext, useContext } from "react";
// import { useSelector } from "react-redux";

// /* Mon provider je veux pouvoir:
// - choisir entre mes forms
// - avoir tous mes forms
// - modifier le form selectioned
// */
// export interface QuestionsContextType {
//   questions: QuestionType[];
//   setQuestions: Dispatch<SetStateAction<QuestionType[]>> | undefined;
//   question: QuestionType | undefined;
//   setQuestion: Dispatch<SetStateAction<QuestionType | undefined>> | undefined;
// }

// export const QuestionsContext = createContext<QuestionsContextType>({
//   questions: [],
//   setQuestions: undefined,
//   question: undefined,
//   setQuestion: undefined,
// });

// export const useQuestionsContext = () => {
//   const { accessToken, refreshToken } = useSelector(
//     (state: IRootState) => state.user
//   );

//   const { question, questions, setQuestion, setQuestions } =
//     useContext(QuestionsContext);

//   if (setQuestion === undefined) {
//     throw new Error("SetQuestion is undefined");
//   }
//   if (setQuestions === undefined) {
//     throw new Error("SetQuestions is undefined");
//   }

//   const handleSelectionQuestion = (id: QuestionType["_id"]) => {
//     const question = questions.find((q) => q._id === id);

//     if (question) {
//       setQuestion(question);
//     }
//   };

//   const handleAddToQuestion = (q: QuestionType) => {
//     setQuestions((questions) => [...questions, q]);
//   };

//   const handleCreateQuestion = (formId: Form["_id"]) => {
//     fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/question/create/${formId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         mode: "no-cors",
//         Authorization: `Bearer ${accessToken}`,
//         "x-refresh-token": `Bearer ${refreshToken}`,
//       },
//       body: JSON.stringify({}),
//     })
//       .then((res) => res.json())
//       .then((data: Response & QuestionType) => {
//         if (data._id) {
//           setQuestion(data);
//           setQuestions((questions) => [...questions, data]);
//         }
//       });
//   };

//   const handleUpdateQuestion = <T extends keyof QuestionType>(
//     fieldName: T,
//     value: QuestionType[T]
//   ) => {
//     setQuestion((q) =>
//       updateNestedObject<QuestionType>(q as QuestionType, fieldName, value)
//     );
//   };

//   const handleSaveQuestion = (q: QuestionType) => {
//     fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/question/update/${q._id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//         "x-refresh-token": `Bearer ${refreshToken}`,
//       },
//       body: JSON.stringify(q),
//     })
//       .then((res) => res.json())
//       .then((data: Response & QuestionType) => {
//         if (data._id) {
//           setQuestion(data);
//           setQuestions(questions.filter((q) => q._id !== data._id));
//           setQuestions((questions) => [data, ...questions]);
//         }
//       });
//   };

//   const handleDeleteQuestion = (qId: QuestionType["_id"]) => {
//     fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/question/deleteOne/${qId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//         "x-refresh-token": `Bearer ${refreshToken}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data: Response) => {
//         if (data.deleted) {
//           setQuestions(questions.filter((q) => q._id !== qId));
//           setQuestion(undefined);
//         }
//       });
//   };

//   const handleDeleteQuestions = (formId: Form["_id"]) => {
//     fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/question/deleteAll/${formId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//         "x-refresh-token": `Bearer ${refreshToken}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data: Response) => {
//         if (data.deleted) {
//           setQuestions([]);
//           setQuestion(undefined);
//         }
//       });
//   };

//   return {
//     questions,
//     handleAddToQuestion,
//     handleCreateQuestion,
//     handleDeleteQuestions,
//     question,
//     handleSelectionQuestion,
//     handleUpdateQuestion,
//     handleSaveQuestion,
//     handleDeleteQuestion,
//   };
// };
