// import { updateNestedObject } from "@/functions";
// import { IRootState } from "@/pages/_app";
// import { Form } from "@/types";
// import { Dispatch, SetStateAction, createContext, useContext } from "react";
// import { useSelector } from "react-redux";

// /* Mon provider je veux pouvoir:
// - choisir entre mes forms
// - avoir tous mes forms
// - modifier le form selectioned

// */
// export interface FoormiesContextType {
//   foormies: Form[];
//   setFoormies: Dispatch<SetStateAction<Form[]>> | undefined;
//   foormie: Form | undefined;
//   setFoormie: Dispatch<SetStateAction<Form>> | undefined;
// }

// export const FoormiesContext = createContext<FoormiesContextType>({
//   foormies: [],
//   setFoormies: undefined,
//   foormie: undefined,
//   setFoormie: undefined,
// });

// export const useFoormiesContext = () => {
//   const { accessToken, refreshToken } = useSelector(
//     (state: IRootState) => state.user
//   );
//   const { foormies, setFoormies, foormie, setFoormie } =
//     useContext(FoormiesContext);

//   if (setFoormies === undefined) {
//     throw new Error("SetFoormies is Undefined");
//   }
//   if (setFoormie === undefined) {
//     throw new Error("SetFoormie is Undefined");
//   }

//   const handleCreateFoormie = () => {
//     fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/form/create`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//         "x-refresh-token": `Bearer ${refreshToken}`,
//       },
//       body: JSON.stringify({ projectName: "New project" }),
//     })
//       .then((res) => res.json())
//       .then((data: Response & Form) => {
//         if (data._id) {
//           setFoormie(data);
//           setFoormies((prevFoormies) => [...prevFoormies, data]);
//         }
//       });
//   };

//   const handleAddToFoormies = (f: Form) => {
//     setFoormies((foormies) => [...foormies, f]);
//   };

//   const handleUpdateFoormie = <T extends keyof Form>(
//     fieldName: T,
//     value: Form[T]
//   ) => {
//     setFoormie((f) => updateNestedObject<Form>(f, fieldName, value));
//   };

//   const handleSelectionFoormie = (id: Form["_id"]) => {
//     const form = foormies.find((f) => f._id === id);
//     if (form) {
//       setFoormie(form);
//     }
//   };

//   const handleSaveFoormie = (f: Form) => {
//     fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/form/update/${f._id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//         "x-refresh-token": `Bearer ${refreshToken}`,
//       },
//       body: JSON.stringify(f),
//     })
//       .then((res) => res.json())
//       .then((data: Response & Form) => {
//         if (data._id) {
//           setFoormie(data);
//           setFoormies(foormies.filter((f) => f._id !== data._id));
//           setFoormies((f) => [data, ...f]);
//         }
//       });
//   };

//   return {
//     foormies,
//     handleAddToFoormies,
//     handleCreateFoormie,
//     foormie,
//     handleUpdateFoormie,
//     handleSelectionFoormie,
//     handleSaveFoormie,
//   };
// };
