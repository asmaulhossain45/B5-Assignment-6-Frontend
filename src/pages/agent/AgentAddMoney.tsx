import z from "zod";
import {  PlusCircle } from "lucide-react";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { toast } from "sonner";
import TransactionForm from "@/components/forms/TransactionForm";
import FormHeader from "@/components/common/FormHeader";

const handleAddMoney = (data: z.infer<typeof TransactionSchema>) => {
  console.log(data);
  toast.success("Add Money successful!");
};

const AgentAddMoney = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <div className="max-w-96 w-full bg-section p-6 rounded-xl space-y-7 border shadow-md">
        <FormHeader
          Icon={PlusCircle}
          title="Add Money"
          description="Enter the amount and user's email or phone to add money to their account."
        />

        <TransactionForm onSubmit={handleAddMoney} submitLabel="Add Money" />
      </div>
    </section>
  );
};

export default AgentAddMoney;
