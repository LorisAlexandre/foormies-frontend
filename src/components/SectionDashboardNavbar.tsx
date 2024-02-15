import { useRouter } from "next/router";
import { Button } from "./ui";

export const SectionDashboardNavbar = ({ section }: { section: string }) => {
  const router = useRouter();

  return (
    <div className="px-10 flex justify-between items-end border border-x-0 border-primary-950">
      <div>
        <ul className="flex gap-2">
          <li
            onClick={() => router.push("/dashboard/content")}
            className={`cursor-pointer px-2 ${
              section === "content" && "font-semibold relative"
            }`}
          >
            Content
            {section === "content" && (
              <span className="absolute bottom-0 left-0 bg-primary-800 h-1 w-full rounded-t-md rounded-b-sm"></span>
            )}
          </li>
          <li
            onClick={() => router.push("/dashboard/analytics")}
            className={`cursor-pointer px-2 ${
              section === "analytics" && "font-semibold relative"
            }`}
          >
            Analytics
            {section === "analytics" && (
              <span className="absolute bottom-0 left-0 bg-primary-800 h-1 w-full rounded-t-md rounded-b-sm"></span>
            )}
          </li>
          <li
            onClick={() => router.push("/dashboard/link")}
            className={`cursor-pointer px-2 ${
              section === "link" && "font-semibold relative"
            }`}
          >
            Link
            {section === "link" && (
              <span className="absolute bottom-0 left-0 bg-primary-800 h-1 w-full rounded-t-md rounded-b-sm"></span>
            )}
          </li>
        </ul>
      </div>
      <div className="flex gap-2 py-5">
        <Button>Modify</Button>
        <Button>Test it !</Button>
      </div>
    </div>
  );
};
