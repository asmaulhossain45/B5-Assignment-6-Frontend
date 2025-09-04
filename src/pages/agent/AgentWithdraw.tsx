import z from "zod";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";
import { useNavigate } from "react-router";
import FormHeader from "@/components/common/FormHeader";
import type { TErrorResponse } from "@/types/ErrorResponse";
import TransactionForm from "@/components/forms/TransactionForm";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { useAgentWithdrawMutation } from "@/redux/features/transaction/transaction.api";

const AgentWithdraw = () => {
  const navigate = useNavigate();
  const [agentWithdraw, { isLoading }] = useAgentWithdrawMutation();

  const handleWithdraw = async (data: z.infer<typeof TransactionSchema>) => {
    const toastId = toast.loading("Withdrawing...");

    try {
      await agentWithdraw(data).unwrap();
      toast.success("Withdraw successful!", { id: toastId });
      navigate("/dashboard/agent/transactions");
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Withdraw failed!", { id: toastId });
    }
  };

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
          isLoading={isLoading}
          submitLabel="Withdraw Money"
        />
      </div>
    </section>
  );
};

export default AgentWithdraw;
