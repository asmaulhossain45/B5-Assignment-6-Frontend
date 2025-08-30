import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

type Props = {
  onSubmit: (data: z.infer<typeof TransactionSchema>) => void;
  submitLabel: string;
  isLoading?: boolean;
};

const TransactionForm = ({
  onSubmit,
  submitLabel,
  isLoading = false,
}: Props) => {
  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      amount: undefined,
      emailOrPhone: "",
      notes: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid grid-cols-1 gap-4"
      >
        <FormField
          control={form.control}
          name="emailOrPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email or Phone</FormLabel>

              <FormControl>
                <Input placeholder="Email or Phone" {...field} />
              </FormControl>

              <FormDescription className="sr-only">
                Enter email or phone number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Amount</FormLabel>

              <FormControl>
                <Input
                  placeholder="Deposit amount"
                  {...field}
                  type="number"
                  inputMode="numeric"
                  step={1}
                  min={1}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>

              <FormDescription className="sr-only">
                Enter the transaction amount.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Transaction Notes</FormLabel>

              <FormControl>
                <Input placeholder="Notes (optional)" {...field} />
              </FormControl>

              <FormDescription className="sr-only">
                Enter transaction notes
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-sm"
        >
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};

export default TransactionForm;
