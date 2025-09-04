import { TransactionType } from "@/constants/enums";
import { Button } from "@/components/ui/button";
import FilterDrawer from "@/components/common/FilterDrawer";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useGetAgentTransactionQuery } from "@/redux/features/agent/agent.api";
import UserTransactionTable from "@/components/table/UserTransactionTable";
import TablePagination from "@/components/table/TablePagination";

const FromSchema = z.object({
  type: z.enum(Object.values(TransactionType || "")).optional(),
});

const AgentTransaction = () => {
  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState({});

  const form = useForm<z.infer<typeof FromSchema>>({
    resolver: zodResolver(FromSchema),
    defaultValues: {
      type: "",
    },
    mode: "onChange",
  });

  const { data, isLoading, isFetching } = useGetAgentTransactionQuery({
    ...params,
    page,
    limit: 10,
  });

  const onSubmit = (data: z.infer<typeof FromSchema>) => {
    setParams({
      type: data.type ?? undefined,
    });
    setPage(1);
    form.reset();
  };

  const handleReset = () => {
    form.reset();
    setParams({});
    setPage(1);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-semibold">
          Transaction History
        </h2>

        <FilterDrawer<z.infer<typeof FromSchema>>
          onApply={onSubmit}
          onReset={handleReset}
          form={form}
          trigger={
            <Button variant={"outline"} className="bg-sidebar rounded-none">
              Filter
            </Button>
          }
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-2">Transaction Type</FormLabel>

                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {Object.values(TransactionType).map((type, index) => (
                      <FormItem key={index} className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value={type} />
                        </FormControl>

                        <FormLabel className="capitalize">{type}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>

                <FormDescription className="sr-only">
                  Select transaction type.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FilterDrawer>
      </div>

      <UserTransactionTable
        data={data?.data}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      <TablePagination
        meta={data?.meta}
        setPage={setPage}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </section>
  );
};

export default AgentTransaction;
