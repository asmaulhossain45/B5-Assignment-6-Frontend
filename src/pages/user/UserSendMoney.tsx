import FormHeader from "@/components/common/FormHeader";
import TransactionForm from "@/components/forms/TransactionForm";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useUserSendMoneyMutation } from "@/redux/features/transaction/transaction.api";
import { useGetLiveSearchUserQuery } from "@/redux/features/user/user.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { HandCoins } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const UserSendMoney = () => {
  const navigate = useNavigate();
  const [userWithdraw, { isLoading }] = useUserSendMoneyMutation();
  const { params, searchInput, setSearchInput } = useQueryParams();
  const {
    data,
    isLoading: isLoadingUser,
    isFetching: isFetchingUser,
  } = useGetLiveSearchUserQuery({ ...params, limit: 3 });

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
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          users={data?.data || []}
          userLoading={isLoadingUser}
          userFetching={isFetchingUser}
        />
      </div>
    </section>
  );
};

export default UserSendMoney;
