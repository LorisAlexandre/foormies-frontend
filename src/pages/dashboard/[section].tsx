import { useRouter } from "next/router";
import Custom404 from "../404";
import {
  DashboardNavbar,
  SectionContent,
  SectionDashboardNavbar,
} from "@/components";

export default function SectionPage() {
  const router = useRouter();
  const sections = ["content", "analytics", "link"];

  if (!sections.includes(router.query.section as string)) {
    return <Custom404 />;
  }

  return (
    <>
      <DashboardNavbar form={undefined} />
      <SectionContent section={router.query.section as string} />
    </>
  );
}
