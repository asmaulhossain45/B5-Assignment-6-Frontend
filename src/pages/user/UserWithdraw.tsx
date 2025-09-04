import z from "zod";
import { toast } from "sonner";
import { CreditCard } from "lucide-react";
import { useNavigate } from "react-router";
import FormHeader from "@/components/common/FormHeader";
import type { TErrorResponse } from "@/types/ErrorResponse";
import TransactionForm from "@/components/forms/TransactionForm";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { useUserWithdrawMutation } from "@/redux/features/transaction/transaction.api";

const UserWithdraw = () => {
  const navigate = useNavigate();
  const [userWithdraw, { isLoading }] = useUserWithdrawMutation();

  const handleWithdraw = async (data: z.infer<typeof TransactionSchema>) => {
    const toastId = toast.loading("Money sending...");

    try {
      await userWithdraw(data).unwrap();
      toast.success("Money sent successfully!", { id: toastId });
      navigate("/dashboard/user/transactions");
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Send money failed!", {
        id: toastId,
      });
    }
  };

  return (
    <section className="flex items-center justify-center h-full">
      <div className="max-w-96 w-full bg-section p-6 rounded-xl space-y-7 border shadow-md">
        <FormHeader
          Icon={CreditCard}
          title="Withdraw Money"
          description="Enter the amount and agent's email or phone to withdraw money from your account."
        />

        <TransactionForm
          onSubmit={handleWithdraw}
          isLoading={isLoading}
          submitLabel="Withdraw"
        />
      </div>
    </section>
  );
};

export default UserWithdraw;
