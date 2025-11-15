import { TransactionType } from "@/constants/enums";
import {
  useCreateCommissionMutation,
  useUpdateCommissionMutation,
} from "@/redux/features/commission/commission.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import type { ICommission } from "@/types/ICommission";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";

type Props = {
  children: React.ReactNode;
  commission?: ICommission;
};

const formSchema = z.object({
  type: z.enum(Object.values(TransactionType)),
  charge: z.number().min(0, { message: "Charge cannot be negative." }),
  commission: z.number().min(0, { message: "Commission cannot be negative." }),
});

const CommissionModal = ({ children, commission }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [createCommission, { isLoading: isCreating }] =
    useCreateCommissionMutation();
  const [updateCommission, { isLoading: isUpdating }] =
    useUpdateCommissionMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: commission?.type ?? TransactionType.DEPOSIT,
      charge: commission?.charge ?? 0,
      commission: commission?.commission ?? 0,
    },
  });

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (commission) {
        await updateCommission({ type: commission.type, data }).unwrap();
      } else {
        await createCommission(data).unwrap();
      }
      toast.success(
        `Commission ${commission ? "updated" : "created"} Successfully`
      );
      setIsOpen(false);
      form.reset();
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      console.log(error);
      toast.error(
        error?.data?.errorSources[0]?.message ||
          error?.data?.message ||
          `Commission ${commission ? "updated" : "created"} Failed`
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {commission ? "Update Commission" : "Create Commission"}
          </DialogTitle>
          <DialogDescription>
            Please enter the commission details.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="grid grid-cols-1 gap-4"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full capitalize">
                        <SelectValue
                          placeholder={field.value || "Select Type"}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Transaction Type</SelectLabel>
                          {Object.values(TransactionType).map((type) => (
                            <SelectItem
                              key={type}
                              value={type}
                              className="capitalize"
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is transaction type field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="charge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>System Charge</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Charge"
                      className="dark:bg-transparent py-2 text-sm"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is system charge field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="commission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Commission</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Commission"
                      className="dark:bg-transparent py-2 text-sm"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is agent commission field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>

          <Button
            size={"sm"}
            onClick={form.handleSubmit(onsubmit)}
            disabled={!form.formState.isDirty || isCreating || isUpdating}
          >
            {isCreating || isUpdating ? (
              <Spinner />
            ) : commission ? (
              "Update"
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommissionModal;
