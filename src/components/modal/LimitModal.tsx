import { Roles, TransactionType } from "@/constants/enums";
import {
  useCreateLimitMutation,
  useUpdateLimitMutation,
} from "@/redux/features/limit/limit.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import type { ILimit } from "@/types/ILimit";
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
  limit?: ILimit;
};

const formSchema = z.object({
  type: z.enum(Object.values(TransactionType)),
  role: z.enum(Object.values(Roles)),
  isActive: z.boolean(),

  minAmount: z
    .number()
    .nonnegative({ message: "Min amount cannot be negetive." }),
  maxAmount: z
    .number()
    .nonnegative({ message: "Max amount cannot be negetive." }),

  dailyLimit: z
    .number()
    .nonnegative({ message: "Daily limit cannot be negetive." })
    .optional(),
  weeklyLimit: z
    .number()
    .nonnegative({ message: "Weekly limit cannot be negetive." })
    .optional(),
  monthlyLimit: z
    .number()
    .nonnegative({ message: "Monthly limit cannot be negetive." })
    .optional(),
});

const LimitModal = ({ children, limit }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [createLimit, { isLoading: isCreating }] = useCreateLimitMutation();
  const [updateLimit, { isLoading: isUpdating }] = useUpdateLimitMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: limit?.type || TransactionType.DEPOSIT,
      role: limit?.role || Roles.USER,
      isActive: limit?.isActive || false,
      minAmount: limit?.minAmount || 0,
      maxAmount: limit?.maxAmount || 0,
      dailyLimit: limit?.dailyLimit || 0,
      weeklyLimit: limit?.weeklyLimit || 0,
      monthlyLimit: limit?.monthlyLimit || 0,
    },
  });

  const onsubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (limit) {
        await updateLimit({
          type: limit.type,
          role: limit.role,
          data,
        }).unwrap();
      } else {
        await createLimit(data).unwrap();
      }
      toast.success(`Limit ${limit ? "updated" : "created"} Successfully`);
      setIsOpen(false);
      form.reset();
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(
        error?.data?.errorSources[0]?.message ||
          error?.data?.message ||
          `Limit ${limit ? "updated" : "created"} Failed`
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{limit ? "Update Limit" : "Create Limit"}</DialogTitle>
          <DialogDescription>
            Enter the details for the limit.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="grid grid-cols-2 gap-4"
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full capitalize">
                        <SelectValue
                          placeholder={field.value || "Select Type"}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select User Role</SelectLabel>
                          {[Roles.USER, Roles.AGENT].map((role) => (
                            <SelectItem
                              key={role}
                              value={role}
                              className="capitalize"
                            >
                              {role}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is user role field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? "active" : "inactive"}
                      onValueChange={(value) =>
                        field.onChange(value === "active")
                      }
                    >
                      <SelectTrigger className="w-full capitalize">
                        <SelectValue
                          placeholder={field.value || "Select Type"}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select a Status</SelectLabel>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is status field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Min Amount"
                      className="dark:bg-transparent py-2 text-sm"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is min amount field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Max Amount"
                      className="dark:bg-transparent py-2 text-sm"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is max amount field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dailyLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Limit</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter Daily Limit"
                      className="dark:bg-transparent py-2 text-sm"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is daily limit field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weeklyLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekly Limit</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter Weekly Limit"
                      className="dark:bg-transparent py-2 text-sm"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is weekly limit field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Limit</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter Monthly Limit"
                      className="dark:bg-transparent py-2 text-sm"
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value)
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is monthly limit field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>

          <Button
            size={"sm"}
            onClick={form.handleSubmit(onsubmit)}
            disabled={!form.formState.isDirty || isCreating || isUpdating}
          >
            {isCreating || isUpdating ? <Spinner /> : limit ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LimitModal;
