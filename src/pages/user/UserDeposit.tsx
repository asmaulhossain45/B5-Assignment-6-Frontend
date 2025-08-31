import z from "zod";
import { PlusCircle } from "lucide-react";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { toast } from "sonner";
import TransactionForm from "@/components/forms/TransactionForm";
import FormHeader from "@/components/common/FormHeader";

const handleDeposit = (data: z.infer<typeof TransactionSchema>) => {
  console.log(data);
  toast.success("Deposit successful!");
};

const UserDeposit = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <div className="max-w-96 w-full bg-section p-6 rounded-xl space-y-7 border shadow-md">
        <FormHeader
          Icon={PlusCircle}
          title="Deposit Money"
          description="Enter the amount and agent's email or phone to deposit money into your account."
        />

        <TransactionForm onSubmit={handleDeposit} submitLabel="Deposit" />
      </div>
    </section>
  );
};

export default UserDeposit;
