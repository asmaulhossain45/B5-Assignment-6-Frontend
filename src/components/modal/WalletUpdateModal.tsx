import { WalletStatus } from "@/constants/enums";
import { useUpdateWalletStatusMutation } from "@/redux/features/admin/admin.api";
import type { TErrorResponse } from "@/types/ErrorResponse";
import type { IWallet } from "@/types/IWallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  wallet: IWallet;
};

const formSchema = z.object({
  status: z.string().optional(),
});

const WalletUpdateModal = ({ wallet }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateWalletStatus, { isLoading }] = useUpdateWalletStatusMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: wallet.status,
    },
  });

  const handleUpdate = async (value: z.infer<typeof formSchema>) => {
    const toastId = "Status updating...";
    try {
      await updateWalletStatus({
        walletId: wallet._id,
        status: value.status,
      }).unwrap();
      toast.success(`Wallet ${value.status} successfully.`, {
        id: toastId,
      });
    } catch (err: unknown) {
      const error = err as { data: TErrorResponse };
      toast.error(error?.data?.message || "Status update Failed!", {
        id: toastId,
      });
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Edit size={20} className="text-warning" />
      </DialogTrigger>

      <DialogContent className="w-96 rounded-none" showCloseButton={false}>
        <DialogHeader className="items-center gap-6">
          <DialogTitle>
            <TriangleAlert size={56} className="text-warning" />
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to update wallet status? Because this action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="update-form" onSubmit={form.handleSubmit(handleUpdate)}>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Status</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize w-full rounded-none">
                        <SelectValue placeholder="s" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {Object.values(WalletStatus).map((value) => (
                        <SelectItem
                          value={value}
                          key={value}
                          className="capitalize"
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="mt-6 sm:justify-center">
          <DialogClose asChild>
            <Button variant={"outline"} className="rounded-none">
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant={"warning"}
            type="submit"
            form="update-form"
            className="rounded-none"
            disabled={!form.formState.isDirty || isLoading}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletUpdateModal;
