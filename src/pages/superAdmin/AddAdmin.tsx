import RegisterAdminForm from "@/components/forms/RegisterAdminForm";
import FormHeader from "@/components/public/common/FormHeader";
import { ShieldUser } from "lucide-react";

const AddAdmin = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <div className="max-w-96 w-full bg-section p-6 rounded-xl space-y-7 border shadow-md">
        <FormHeader
          Icon={ShieldUser}
          title="Create Admin Account"
          description="Enter the details to create a new admin account with email and password."
        />

        <RegisterAdminForm/>
      </div>
    </section>
  );
};

export default AddAdmin;
