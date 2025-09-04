import z from "zod";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router";
import FormHeader from "@/components/common/FormHeader";
import type { TErrorResponse } from "@/types/ErrorResponse";
import TransactionForm from "@/components/forms/TransactionForm";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { useAgentAddMoneyMutation } from "@/redux/features/transaction/transaction.api";

const AgentAddMoney = () => {
  const navigate = useNavigate();
  const [agentAddMoney, { isLoading }] = useAgentAddMoneyMutation();

  const handleAddMoney = async (data: z.infer<typeof TransactionSchema>) => {
    const toastId = toast.loading("Adding money...");

    try {
      await agentAddMoney(data).unwrap();
      toast.success("Money added successfully!", { id: toastId });
      navigate("/dashboard/agent/transactions");
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Add money failed!", { id: toastId });
    }
  };

  return (
    <section className="flex items-center justify-center h-full">
      <div className="max-w-96 w-full bg-section p-6 rounded-xl space-y-7 border shadow-md">
        <FormHeader
          Icon={PlusCircle}
          title="Add Money"
          description="Enter the amount and user's email or phone to add money to their account."
        />

        <TransactionForm
          onSubmit={handleAddMoney}
          isLoading={isLoading}
          submitLabel="Add Money"
        />
      </div>
    </section>
  );
};

export default AgentAddMoney;
