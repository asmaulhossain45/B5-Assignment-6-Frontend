import z from "zod";
import { HandCoins } from "lucide-react";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { toast } from "sonner";
import TransactionForm from "@/components/forms/TransactionForm";
import FormHeader from "@/components/common/FormHeader";

const handleSendMoney = (data: z.infer<typeof TransactionSchema>) => {
  console.log(data);
  toast.success("Send Money successful!");
};

const UserSendMoney = () => {
  return (
    <section className="flex items-center justify-center h-full">
      <div className="max-w-96 w-full bg-section p-6 rounded-xl space-y-7 border shadow-md">
        <FormHeader
          Icon={HandCoins}
          title="Send Money"
          description="Enter the details and amount to Send money to a friend or family member."
        />

        <TransactionForm onSubmit={handleSendMoney} submitLabel="Send Money" />
      </div>
    </section>
  );
};

export default UserSendMoney;
