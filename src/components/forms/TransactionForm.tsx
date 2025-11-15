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
import Loading from "@/pages/public/Loading";
import type { IAccount } from "@/types/IAccount";
import { TransactionSchema } from "@/validation/TransactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

type Props = {
  onSubmit: (data: z.infer<typeof TransactionSchema>) => void;
  submitLabel: string;
  isLoading?: boolean;
  searchInput?: string;
  setSearchInput?: (value: string) => void;
  users?: IAccount[];
  userLoading?: boolean;
  userFetching?: boolean;
};

const TransactionForm = ({
  onSubmit,
  submitLabel,
  isLoading = false,
  searchInput,
  setSearchInput,
  users,
  userLoading,
  userFetching,
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
            <FormItem className="relative">
              <FormLabel className="sr-only">Email or Phone</FormLabel>

              <FormControl>
                <Input
                  placeholder="Email or Phone"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    if (setSearchInput) {
                      setSearchInput(e.target.value);
                    }
                  }}
                />
              </FormControl>

              <FormDescription className="sr-only">
                Enter email or phone number
              </FormDescription>
              <FormMessage />

              {searchInput && users && users.length > 0 && (
                <ul className="absolute bg-background border w-full top-full p-2 rounded-lg grid grid-cols-1">
                  {userLoading || userFetching ? (
                    <li className="flex items-center justify-center">
                      <Loading size={"sm"} type="inline" />
                    </li>
                  ) : (
                    users.map((user, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          form.setValue("emailOrPhone", user.email, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                          if (setSearchInput) {
                            setSearchInput("");
                          }
                        }}
                        className="flex flex-col hover:bg-sidebar rounded-sm p-1 px-2 cursor-pointer transition-colors duration-300"
                      >
                        <span className="text-xs">{user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              )}
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
