import { DashboardNavbar } from "@/components";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [selectedForm, setSelectedForm] = useState<undefined>();
  const [forms, setForms] = useState<never[]>([]);

  useEffect(() => {}, []);

  return (
    <div>
      <DashboardNavbar form={selectedForm} />
    </div>
  );
}
