import { DropdownProject, User } from "./ui";

export const DashboardNavbar = ({ form }: { form?: Object }) => {
  const renderComponent = () => {
    if (!form) {
      return (
        <div className="flex justify-between p-10">
          <DropdownProject />
          <User />
        </div>
      );
    }

    return (
      <div>
        <p>Unauthorized Access</p>
      </div>
    );
  };

  return <div>{renderComponent()}</div>;
};
