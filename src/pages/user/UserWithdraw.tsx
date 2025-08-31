import z from "zod";
import { CreditCard } from "lucide-react";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { toast } from "sonner";
import TransactionForm from "@/components/forms/TransactionForm";
import FormHeader from "@/components/common/FormHeader";

const handleWithdraw = (data: z.infer<typeof TransactionSchema>) => {
  console.log(data);
  toast.success("Withdraw successful!");
};

const UserWithdraw = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <div className="max-w-96 w-full bg-section p-6 rounded-xl space-y-7 border shadow-md">
        <FormHeader
          Icon={CreditCard}
          title="Withdraw Money"
          description="Enter the amount and agent's email or phone to withdraw money from your account."
        />

        <TransactionForm onSubmit={handleWithdraw} submitLabel="Withdraw" />
      </div>
    </section>
  );
};

export default UserWithdraw;
