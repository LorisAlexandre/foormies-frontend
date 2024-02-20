import { useRouter } from "next/router";
import Custom404 from "../404";
import { DashboardNavbar, SectionContent } from "@/components";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../_app";
import { Form, Response } from "@/types";
import { FoormiesContext, FoormiesContextType } from "@/providers";

// export default function SectionPage() {
//   const router = useRouter();
//   const user = useSelector((state: IRootState) => state.user);
//   const sections = ["content", "analytics", "link"];

//   const [forms, setForms] = useState<Form[]>([]);
//   const [selectedForm, setSelectedForm] = useState<Form>(forms[0]);
//   const abortControllerRef = useRef<AbortController | null>(null);

//   const [data, setData] = useState<(Response & Form) | null>(null);

//   useEffect(() => {
//     if (!user.accessToken || !user.refreshToken) {
//       router.push("/");
//       return;
//     }

//     abortControllerRef.current?.abort();
//     abortControllerRef.current = new AbortController();

//     fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/form/allByUser`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user.accessToken}`,
//         "x-refresh-token": `Bearer ${user.refreshToken}`,
//       },
//       signal: abortControllerRef.current.signal,
//     })
//       .then((res) => res.json())
//       .then((data: Response & Form[]) => {
//         if (data.length) {
//           setForms(data);
//         }
//         setData(data);
//       });
//   }, []);

//   if (!sections.includes(router.query.section as string)) {
//     return <Custom404 />;
//   }

//   const handleAddForm = () => {
//     fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/form/create`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user.accessToken}`,
//         "x-refresh-token": `Bearer ${user.refreshToken}`,
//       },
//       body: JSON.stringify({ projectName: "New project" }),
//     })
//       .then((res) => res.json())
//       .then((data: Response & Form) => {
//         if (data._id) {
//           setSelectedForm(data as Form);
//           setForms((forms) => [...forms, data]);
//         }
//         setData(data);
//       });
//   };

//   const handleSelectForm = (id: Form["_id"]) => {
//     const form = forms.find((f) => f._id === id);
//     if (form) {
//       setSelectedForm(form);
//     }
//   };

//   return (
//     <FoormiesContext.Provider value={contextValue}>
//       <DashboardNavbar
//         form={selectedForm}
//         allForms={forms}
//         handleAddForm={handleAddForm}
//         handleSelection={handleSelectForm}
//       />
// {selectedForm && (
//   <SectionContent
//     form={selectedForm}
//     section={router.query.section as string}
//   />
// )}
// {data?.statusCode && (
//   <div>
//     <h3>
//       Error: {data.error} {data.statusCode}
//     </h3>
//     {data.message && typeof data.message === "string" ? (
//       <p>{data.message}</p>
//     ) : (
//       (data.message as string[]).map((m, i) => <p key={i}>{m}</p>)
//     )}
//   </div>
// )}
//     </FoormiesContext.Provider>
//   );
// }

export default function SectionPage() {
  const router = useRouter();
  const user = useSelector((state: IRootState) => state.user);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [data, setData] = useState<(Response & Form) | null>(null);

  const [forms, setForms] = useState<Form[]>([]);
  const [selectedForm, setSelectedForm] = useState<Form>(forms[0]);

  const contextValue: FoormiesContextType = {
    foormies: forms,
    setFoormies: setForms,
    foormie: selectedForm,
    setFoormie: setSelectedForm,
  };

  useEffect(() => {
    if (!user.accessToken || !user.refreshToken) {
      router.push("/");
      return;
    }

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    fetch(`${process.env.NEXT_PUBLIC_SERV_URL}/form/allByUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
        "x-refresh-token": `Bearer ${user.refreshToken}`,
      },
      signal: abortControllerRef.current.signal,
    })
      .then((res) => res.json())
      .then((data: Response & Form[]) => {
        if (data.length) {
          setForms(data);
          setSelectedForm(data[0]);
        }
        setData(data);
      });
  }, []);

  return (
    <FoormiesContext.Provider value={contextValue}>
      <DashboardNavbar />
      {selectedForm && <SectionContent />}
      {data?.statusCode && (
        <div>
          <h3>
            Error: {data.error} {data.statusCode}
          </h3>
          {data.message && typeof data.message === "string" ? (
            <p>{data.message}</p>
          ) : (
            (data.message as string[]).map((m, i) => <p key={i}>{m}</p>)
          )}
        </div>
      )}
    </FoormiesContext.Provider>
  );
}
