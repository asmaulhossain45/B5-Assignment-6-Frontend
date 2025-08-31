import z from "zod";
import { CreditCard } from "lucide-react";
import TransactionForm from "@/components/forms/TransactionForm";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { toast } from "sonner";
import FormHeader from "@/components/common/FormHeader";

const handleWithdraw = (data: z.infer<typeof TransactionSchema>) => {
  console.log(data);
  toast.success("Withdraw successful!");
};

const AgentWithdraw = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <div className="max-w-96 w-full bg-section p-6 rounded-xl space-y-7 border shadow-md">
        <FormHeader
          Icon={CreditCard}
          title="Withdraw Money"
          description="Enter the details and amount to withdraw money from their account."
        />

        <TransactionForm
          onSubmit={handleWithdraw}
          submitLabel="Withdraw Money"
        />
      </div>
    </section>
  );
};

export default AgentWithdraw;
