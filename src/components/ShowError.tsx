import { Response } from "@/types";

export const ShowError = ({ data }: { data?: Response }) => {
  if (!data?.message) {
    return;
  }

  return (
    <>
      <h3>
        Error: {data.error} {data.statusCode}
      </h3>
      {data.message && typeof data.message === "string" ? (
        <p>{data.message}</p>
      ) : (
        (data.message as string[]).map((m, i) => <p key={i}>{m}</p>)
      )}
    </>
  );
};
