import z from "zod";
import { PlusCircle } from "lucide-react";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { toast } from "sonner";
import TransactionForm from "@/components/forms/TransactionForm";
import FormHeader from "@/components/common/FormHeader";
import { useUserDepositMutation } from "@/redux/features/transaction/transaction.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import { useNavigate } from "react-router";

const UserDeposit = () => {
  const navigate = useNavigate();
  const [userDeposit, { isLoading }] = useUserDepositMutation();

  const handleDeposit = async (data: z.infer<typeof TransactionSchema>) => {
    const toastId = toast.loading("Depositing...");

    try {
      await userDeposit(data).unwrap();
      toast.success("Deposit successful!", { id: toastId });
      navigate("/dashboard/user/transactions");
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Deposit failed!", { id: toastId });
    }
  };

  return (
    <section className="flex items-center justify-center h-full">
      <div className="max-w-96 w-full bg-section p-6 rounded-xl space-y-7 border shadow-md">
        <FormHeader
          Icon={PlusCircle}
          title="Deposit Money"
          description="Enter the amount and agent's email or phone to deposit money into your account."
        />

        <TransactionForm
          onSubmit={handleDeposit}
          isLoading={isLoading}
          submitLabel="Deposit"
        />
      </div>
    </section>
  );
};

export default UserDeposit;
