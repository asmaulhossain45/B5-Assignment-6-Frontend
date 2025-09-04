import z from "zod";
import { HandCoins } from "lucide-react";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { toast } from "sonner";
import TransactionForm from "@/components/forms/TransactionForm";
import FormHeader from "@/components/common/FormHeader";
import { useNavigate } from "react-router";
import { useUserSendMoneyMutation } from "@/redux/features/transaction/transaction.api";
import type { TErrorResponse } from "@/types/ErrorResponse";

const UserSendMoney = () => {
  const navigate = useNavigate();
  const [userWithdraw, { isLoading }] = useUserSendMoneyMutation();

  const handleSendMoney = async (data: z.infer<typeof TransactionSchema>) => {
    const toastId = toast.loading("Withdrawing...");

    try {
      await userWithdraw(data).unwrap();
      toast.success("Withdraw successful!", { id: toastId });
      navigate("/dashboard/user/transactions");
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Withdraw failed!", { id: toastId });
    }
  };

  return (
    <section className="flex items-center justify-center h-full">
      <div className="max-w-96 w-full bg-section p-6 rounded-xl space-y-7 border shadow-md">
        <FormHeader
          Icon={HandCoins}
          title="Send Money"
          description="Enter the details and amount to Send money to a friend or family member."
        />

        <TransactionForm
          onSubmit={handleSendMoney}
          isLoading={isLoading}
          submitLabel="Send Money"
        />
      </div>
    </section>
  );
};

export default UserSendMoney;
